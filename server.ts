import express from "express";
import http from "http";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { runAiChat, normalizePromptForAiApi, getKnowledgeFallback, formatAiPlainText } from "./server/aiChat";
import { appendHealthFooter } from "./src/lib/healthAiFooter";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "2mb" }));

  /** OpenStreetMap Nominatim (respect usage policy; low volume). */
  app.get("/api/geocode", async (req, res) => {
    const q = req.query.q;
    if (!q || typeof q !== "string" || q.trim().length < 2) {
      return res.status(400).json({ error: "Missing or short query" });
    }
    try {
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("q", q.trim());
      url.searchParams.set("format", "json");
      url.searchParams.set("limit", "1");
      const r = await fetch(url.toString(), {
        headers: {
          "User-Agent": "SheSharkWeb/1.0 (+https://github.com/TheShakSpace/Sheshark-Web)",
          Accept: "application/json",
        },
      });
      if (!r.ok) {
        return res.status(502).json({ error: "Geocoder unavailable" });
      }
      const data = (await r.json()) as { lat: string; lon: string; display_name: string }[];
      if (!data?.length) {
        return res.status(404).json({ error: "No results" });
      }
      const row = data[0];
      res.json({
        lat: parseFloat(row.lat),
        lng: parseFloat(row.lon),
        label: row.display_name,
      });
    } catch (e) {
      console.error("[api/geocode]", e);
      res.status(500).json({ error: "Geocode failed" });
    }
  });

  app.post("/api/ai/chat", async (req, res) => {
    try {
      const body = req.body as { message?: string; mode?: string; history?: unknown };
      const mode = body.mode === "health" ? "health" : "business";
      const raw = typeof body.message === "string" ? body.message : "";
      const normalized = normalizePromptForAiApi(raw, mode);

      if (!normalized.trim()) {
        const r = await runAiChat("hello", mode);
        return res.json({ reply: r.reply, source: r.source, text: r.reply });
      }

      const result = await runAiChat(normalized, mode);
      res.json({ reply: result.reply, source: result.source, text: result.reply });
    } catch (e) {
      console.error("[api/ai/chat]", e);
      const mode = (req.body as { mode?: string })?.mode === "health" ? "health" : "business";
      const fb = formatAiPlainText(getKnowledgeFallback(mode));
      const reply = appendHealthFooter(mode, fb);
      res.json({ reply, source: "local", text: reply });
    }
  });

  const server = http.createServer(app);

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`SheShark Web running on http://localhost:${PORT}`);
  });
}

startServer();
