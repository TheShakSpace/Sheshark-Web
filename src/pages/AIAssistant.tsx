import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { GlassCard, Button } from "@/components/UI";
import {
  Send,
  Bot,
  User,
  Briefcase,
  Heart,
  Volume2,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import axios from "axios";
import { searchKnowledgeEntries, countKnowledgeEntries } from "@/lib/knowledgeSearch";

const CHIP_KEYS_B = ["b1", "b2", "b3", "b4"] as const;
const CHIP_KEYS_H = ["h1", "h2", "h3", "h4"] as const;

function stripDisplayNoise(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .trim();
}

type TtsLang = "hi-IN" | "en-IN";

function speakText(text: string, lang: TtsLang) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const clean = stripDisplayNoise(text).replace(/\n+/g, ". ");
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = lang;
  u.rate = lang.startsWith("hi") ? 0.92 : 1;
  window.speechSynthesis.speak(u);
}

function ChatPanel({
  mode,
  ttsLang,
  title,
  icon: Icon,
  accentClass,
}: {
  mode: "business" | "health";
  ttsLang: TtsLang;
  title: string;
  icon: React.ElementType;
  accentClass: string;
}) {
  const { t } = useTranslation();
  const { chats, addChatMessage, clearChatMessages } = useStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const list = chats[mode] || [];

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [list, loading]);

  const fallbackText = mode === "business" ? t("ai.fallbackBiz") : t("ai.fallbackHealth");

  const send = async (text?: string) => {
    const raw = (text ?? input).trim();
    if (!raw || loading) return;
    addChatMessage(mode, { role: "user", parts: [{ text: raw }] });
    setInput("");
    setLoading(true);
    try {
      const { data } = await axios.post("/api/ai/chat", { message: raw, mode });
      const reply = typeof data.reply === "string" ? data.reply : typeof data.text === "string" ? data.text : "";
      const safe = stripDisplayNoise(reply || fallbackText);
      addChatMessage(mode, { role: "model", parts: [{ text: safe }] });
    } catch {
      addChatMessage(mode, { role: "model", parts: [{ text: stripDisplayNoise(fallbackText) }] });
    } finally {
      setLoading(false);
    }
  };

  const chipKeys = mode === "business" ? CHIP_KEYS_B : CHIP_KEYS_H;

  return (
    <GlassCard className="flex flex-col p-0 overflow-hidden min-h-[420px] lg:border-2 border-white/40">
      <div className={cn("px-4 py-3 flex items-center justify-between border-b border-slate-100/80", accentClass)}>
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <Icon size={20} />
          {title}
        </div>
        <button
          type="button"
          onClick={() => clearChatMessages(mode)}
          className="p-2 rounded-xl hover:bg-white/60 text-slate-500"
          title={t("ai.clearSide")}
        >
          <Trash2 size={18} />
        </button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[min(52vh,520px)] scroll-smooth bg-white/30">
        {list.length === 0 && !loading && (
          <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 bg-white/50">
            {mode === "business" ? t("ai.emptyBiz") : t("ai.emptyHealth")}
          </div>
        )}
        {list.map((msg, i) => (
          <div key={i} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "")}>
            <div
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                msg.role === "user" ? "bg-primary text-white" : "bg-white text-slate-600 shadow",
              )}
            >
              {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
            </div>
            <div
              className={cn(
                "max-w-[88%] p-3 rounded-2xl text-sm leading-relaxed",
                msg.role === "user" ? "bg-primary text-white" : "bg-white/90 text-slate-800 shadow-sm",
              )}
            >
              <div className="whitespace-pre-wrap font-normal">{stripDisplayNoise(msg.parts[0]?.text ?? "")}</div>
              {msg.role === "model" && (
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                  onClick={() => speakText(msg.parts[0]?.text ?? "", ttsLang)}
                >
                  <Volume2 size={14} /> {t("ai.listen")} {ttsLang.startsWith("hi") ? t("ai.listenHi") : t("ai.listenEn")}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-white shadow flex items-center justify-center text-slate-500">
              <Bot size={18} />
            </div>
            <div className="bg-white/90 rounded-2xl px-4 py-3 text-slate-500 text-sm">{t("ai.thinking")}</div>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-slate-100 space-y-2 bg-white/40">
        <div className="flex flex-wrap gap-2">
          {chipKeys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => send(t(`ai.chips.${k}`))}
              className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/15 hover:text-primary"
            >
              {t(`ai.chips.${k}`)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={mode === "business" ? t("ai.placeholderBiz") : t("ai.placeholderHealth")}
            className="flex-1 glass px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button onClick={() => send()} loading={loading} className="h-12 w-12 rounded-xl p-0 flex items-center justify-center shrink-0">
            <Send size={20} />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}

const AIAssistant = () => {
  const { t, i18n } = useTranslation();
  const [ttsLang, setTtsLang] = useState<TtsLang>(i18n.language === "hi" ? "hi-IN" : "en-IN");
  const [libQuery, setLibQuery] = useState("");
  const [libMode, setLibMode] = useState<"business" | "health">("business");

  useEffect(() => {
    setTtsLang(i18n.language === "hi" ? "hi-IN" : "en-IN");
  }, [i18n.language]);

  const bizCount = useMemo(() => countKnowledgeEntries("business"), []);
  const healthCount = useMemo(() => countKnowledgeEntries("health"), []);
  const matches = useMemo(() => searchKnowledgeEntries(libQuery, libMode, 25), [libQuery, libMode]);

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="text-primary" /> {t("ai.title")}
          </h1>
          <p className="text-slate-500 mt-1 max-w-2xl">{t("ai.subtitle")}</p>
          <p className="text-xs text-slate-400 mt-2">{t("ai.libraryLine", { biz: bizCount, health: healthCount })}</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-slate-500 mr-2">{t("ai.readAloud")}</span>
          <button
            type="button"
            onClick={() => setTtsLang("en-IN")}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold border transition-all",
              ttsLang === "en-IN" ? "bg-primary text-white border-primary" : "bg-white/80 border-slate-200 text-slate-600",
            )}
          >
            {t("lang.english")}
          </button>
          <button
            type="button"
            onClick={() => setTtsLang("hi-IN")}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold border transition-all",
              ttsLang === "hi-IN" ? "bg-primary text-white border-primary" : "bg-white/80 border-slate-200 text-slate-600",
            )}
          >
            {t("lang.hindi")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ChatPanel mode="business" ttsLang={ttsLang} title={t("ai.businessAi")} icon={Briefcase} accentClass="bg-primary/10" />
        <ChatPanel mode="health" ttsLang={ttsLang} title={t("ai.healthAi")} icon={Heart} accentClass="bg-rose-100/80" />
      </div>

      <GlassCard className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Search className="text-primary" size={22} /> {t("ai.keywordLib")}
            </h2>
            <p className="text-sm text-slate-500">{t("ai.keywordSub")}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLibMode("business")}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold",
                libMode === "business" ? "bg-primary text-white" : "bg-slate-100 text-slate-600",
              )}
            >
              {t("ai.businessTab")}
            </button>
            <button
              type="button"
              onClick={() => setLibMode("health")}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold",
                libMode === "health" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600",
              )}
            >
              {t("ai.healthTab")}
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={libQuery}
            onChange={(e) => setLibQuery(e.target.value)}
            placeholder={t("ai.kwPlaceholder")}
            className="w-full glass pl-12 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
          {!libQuery.trim() && <p className="text-sm text-slate-400">{t("ai.kwEmpty")}</p>}
          {libQuery.trim() && matches.length === 0 && <p className="text-sm text-slate-500">{t("ai.kwNoHit")}</p>}
          {matches.map((entry, idx) => (
            <button
              key={`${entry.question}-${idx}`}
              type="button"
              onClick={() => {
                const { addChatMessage } = useStore.getState();
                addChatMessage(libMode, { role: "model", parts: [{ text: stripDisplayNoise(entry.answer) }] });
              }}
              className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
            >
              <div className="text-xs font-bold text-primary mb-1 line-clamp-1">{entry.question}</div>
              <div className="text-xs text-slate-500 line-clamp-2">{entry.answer}</div>
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default AIAssistant;
