import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { appendHealthFooter } from "../src/lib/healthAiFooter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type KnowledgeMode = "business" | "health";

export type KnowledgeEntry = {
  mode: string;
  keywords: string[];
  question: string;
  answer: string;
};

let cachedData: KnowledgeEntry[] | null = null;

function loadKnowledge(): KnowledgeEntry[] {
  if (cachedData) return cachedData;
  const repoRoot = path.join(__dirname, "..");
  const kbPath = path.join(repoRoot, "src", "data", "ai-knowledge-data.json");
  try {
    const raw = fs.readFileSync(kbPath, "utf-8");
    cachedData = JSON.parse(raw) as KnowledgeEntry[];
  } catch (err) {
    console.error("[aiChat] knowledge file missing or invalid:", kbPath, err);
    cachedData = [];
  }
  return cachedData;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

function findKnowledgeAnswer(message: string, mode: KnowledgeMode): string | null {
  const data = loadKnowledge();
  const text = normalize(message);
  const textWords = new Set(text.split(/\s+/).filter((w) => w.length > 0));

  let best: { score: number; answer: string } | null = null;

  for (const entry of data) {
    if (entry.mode !== mode) continue;

    let score = 0;
    for (const kw of entry.keywords) {
      const k = kw.toLowerCase();
      if (!k) continue;
      if (k.length <= 3) {
        if (new RegExp(`\\b${escapeRe(k)}\\b`, "i").test(text)) score += 3;
      } else if (text.includes(k)) {
        score += 3;
      }
    }

    for (const w of normalize(entry.question).split(/\s+/)) {
      if (w.length > 2 && textWords.has(w)) score += 1;
    }

    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: entry.answer };
    }
  }

  if (!best) return null;
  if (best.score < 2) return null;
  return best.answer;
}

export function getKnowledgeFallback(mode: KnowledgeMode): string {
  if (mode === "business") {
    return (
      "Here is a quick SheShark tip: start with one product you can demo easily, collect two customer testimonials, " +
      "and explore funding via Mudra or Stand-Up India with a simple one-page plan. " +
      "Ask a specific question about solar, pricing, or marketing for a tailored answer."
    );
  }
  return (
    "Here is general wellness support: hydrate, keep a regular sleep schedule, and move a little each day. " +
    "For persistent pain, fever, or worrying symptoms, please see a qualified doctor soon."
  );
}

function buildSystemPrompt(mode: KnowledgeMode): string {
  if (mode === "business") {
    return (
      "You are SheShark Business AI, a friendly mentor for women building clean energy and solar businesses. " +
      "Use simple, encouraging language. India context (prices, schemes) when relevant. " +
      "Use short paragraphs and numbered lists. Never use asterisks, hashtags, markdown bold, or bullet punctuation characters."
    );
  }
  return (
    "You are SheShark Health AI for wellness (stress, sleep, nutrition, periods). You are not a doctor. " +
    "Encourage professional care for medical concerns. Calm, supportive tone. " +
    "Short paragraphs and numbered lists only. Never use asterisks, hashtags, markdown bold, or bullet punctuation characters."
  );
}

const MAX_AI_MESSAGE_CHARS = 12000;

export function normalizePromptForAiApi(text: string, mode: KnowledgeMode): string {
  let s = text
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length > MAX_AI_MESSAGE_CHARS) s = s.slice(0, MAX_AI_MESSAGE_CHARS);
  if (!s) return s;
  const wordCount = s.split(/\s+/).filter(Boolean).length;
  if (wordCount <= 3 && s.length < 50) {
    const hint =
      mode === "business"
        ? "You are SheShark Business AI. The user message is very short; infer intent and give a brief practical answer."
        : "You are SheShark Health AI. The user message is very short; answer gently and remind them you are not a doctor for diagnosis.";
    return `${hint}\n\nUser: ${s}`;
  }
  return s;
}

/** Plain text for UI: no fake bold, no markdown noise. */
export function formatAiPlainText(text: string): string {
  let s = text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`+/g, "")
    .trim();
  s = s.replace(/\n{3,}/g, "\n\n");
  return s;
}

async function runOpenRouterChat(message: string, mode: KnowledgeMode): Promise<string | null> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) return null;

  const model = process.env.OPENROUTER_MODEL?.trim() || "openai/gpt-4o-mini";
  const referer = process.env.OPENROUTER_HTTP_REFERER?.trim();
  const title = process.env.OPENROUTER_APP_TITLE?.trim();

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(referer ? { "HTTP-Referer": referer } : {}),
        ...(title ? { "X-Title": title } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: buildSystemPrompt(mode) },
          { role: "user", content: message.trim() },
        ],
        temperature: 0.6,
        max_tokens: 1200,
      }),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string | Array<{ text?: string }> } }>;
    };
    const raw = data.choices?.[0]?.message?.content;
    let textOut = "";
    if (typeof raw === "string") textOut = raw;
    else if (Array.isArray(raw)) {
      textOut = raw
        .map((item) => (typeof item === "object" && item && "text" in item ? String((item as { text?: string }).text ?? "") : ""))
        .join(" ")
        .trim();
    }
    if (!textOut.trim()) return null;
    return formatAiPlainText(textOut);
  } catch {
    return null;
  }
}

export type AiChatResult = { reply: string; source: "openrouter" | "local" };

/**
 * 1) Keyword / library match when strong enough
 * 2) OpenRouter when configured
 * 3) Soft library + scripted fallback — always returns a non-empty reply
 */
export async function runAiChat(message: string, mode: KnowledgeMode): Promise<AiChatResult> {
  const userText = message.trim();
  if (!userText) {
    const fb = formatAiPlainText(getKnowledgeFallback(mode));
    return { reply: appendHealthFooter(mode, fb), source: "local" };
  }

  const normalizedApi = normalizePromptForAiApi(userText, mode);
  if (!normalizedApi.trim()) {
    const fb = formatAiPlainText(getKnowledgeFallback(mode));
    return { reply: appendHealthFooter(mode, fb), source: "local" };
  }

  const fromKb = findKnowledgeAnswer(userText, mode);
  if (fromKb) {
    const plain = formatAiPlainText(fromKb);
    return { reply: appendHealthFooter(mode, plain), source: "local" };
  }

  const fromLlm = await runOpenRouterChat(normalizedApi, mode);
  if (fromLlm) {
    return { reply: appendHealthFooter(mode, fromLlm), source: "openrouter" };
  }

  const fallback = formatAiPlainText(getKnowledgeFallback(mode));
  return { reply: appendHealthFooter(mode, fallback), source: "local" };
}
