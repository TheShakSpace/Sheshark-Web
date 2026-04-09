import type { KnowledgeEntry, KnowledgeMode } from "./knowledgeTypes";
import raw from "@/data/ai-knowledge-data.json";

const data = raw as KnowledgeEntry[];

/** Same scoring as server `findKnowledgeAnswer` — strong match returns curated answer, no API tokens. */
export function findKnowledgeReply(message: string, mode: KnowledgeMode): string | null {
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

  if (!best || best.score < 2) return null;
  return best.answer;
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

/** Browse 500+ library answers by keyword (client-side). */
export function searchKnowledgeEntries(query: string, mode: KnowledgeMode, limit = 30): KnowledgeEntry[] {
  const text = normalize(query).trim();
  if (!text) return [];

  const scored: { score: number; entry: KnowledgeEntry }[] = [];
  const textTokens = new Set(text.split(/\s+/).filter((w) => w.length > 1));

  for (const entry of data) {
    if (entry.mode !== mode) continue;

    let score = 0;
    const qNorm = normalize(entry.question);

    if (qNorm.includes(text)) score += 8;

    for (const kw of entry.keywords) {
      const k = kw.toLowerCase();
      if (!k) continue;
      if (k.length <= 3) {
        if (new RegExp(`\\b${escapeRe(k)}\\b`, "i").test(text)) score += 3;
      } else if (text.includes(k)) {
        score += 3;
      }
    }

    for (const w of qNorm.split(/\s+/)) {
      if (w.length > 2 && textTokens.has(w)) score += 1;
    }

    if (score > 0) scored.push({ score, entry });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.entry);
}

export function countKnowledgeEntries(mode: KnowledgeMode): number {
  return data.filter((e) => e.mode === mode).length;
}
