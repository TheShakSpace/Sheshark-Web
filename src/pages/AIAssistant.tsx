import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { GlassCard, Button } from "@/components/UI";
import {
  Send,
  Bot,
  User,
  Briefcase,
  Heart,
  Mic,
  Search,
  Sparkles,
  Trash2,
  Play,
  Pause,
  Square,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import axios from "axios";
import { searchKnowledgeEntries, countKnowledgeEntries, findKnowledgeReply } from "@/lib/knowledgeSearch";
import { appendHealthFooter } from "@/lib/healthAiFooter";
import { pickVoiceForLang, whenVoicesReady } from "@/lib/speechVoices";

const CHIP_KEYS_B = ["b1", "b2", "b3", "b4"] as const;
const CHIP_KEYS_H = ["h1", "h2", "h3", "h4"] as const;

/** Plain assistant text (matches server `formatAiPlainText` enough for display + voice). */
function stripDisplayNoise(text: string): string {
  let s = text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`+/g, "")
    .trim();
  return s.replace(/\n{3,}/g, "\n\n");
}

function finalizeReply(mode: "business" | "health", body: string): string {
  return appendHealthFooter(mode, stripDisplayNoise(body));
}

type TtsLang = "hi-IN" | "en-IN";

/** Never show vendor/configuration apology text as a bot reply. */
function isNoiseApiPayload(text: string): boolean {
  return /\bnot\s+configured\b|api\s*key|open\s*router|trouble\s+connecting|try\s+again\s+later|\bi\s*['']?m\s+sorry\b|couldn['']?t\s+connect\b/i.test(
    text,
  );
}

function buildUtterance(text: string, lang: TtsLang, voice: SpeechSynthesisVoice | null): SpeechSynthesisUtterance {
  const clean = stripDisplayNoise(text).replace(/\n+/g, ". ");
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = lang;
  if (voice) u.voice = voice;
  u.rate = lang.startsWith("hi") ? 0.92 : 1;
  return u;
}

type TtsPhase = "idle" | "speaking" | "paused";

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

  const [tts, setTts] = useState<{ index: number | null; phase: TtsPhase }>({ index: null, phase: "idle" });
  const [sttOn, setSttOn] = useState(false);
  const recRef = useRef<SpeechRecognition | null>(null);

  const canStt =
    typeof window !== "undefined" &&
    Boolean(
      (window as Window & { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition })
        .SpeechRecognition ||
        (window as Window & { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition,
    );

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [list, loading]);

  useEffect(() => {
    whenVoicesReady(() => {
      window.speechSynthesis?.getVoices();
    });
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const pushLocalExchange = (userText: string, answerBody: string) => {
    addChatMessage(mode, { role: "user", parts: [{ text: userText }] });
    addChatMessage(mode, { role: "model", parts: [{ text: finalizeReply(mode, answerBody) }] });
  };

  const fallbackText = mode === "business" ? t("ai.fallbackBiz") : t("ai.fallbackHealth");

  const send = async (text?: string, options?: { fromChip?: boolean }) => {
    const raw = (text ?? input).trim();
    if (!raw || loading) return;

    const fromKb = findKnowledgeReply(raw, mode);
    if (fromKb) {
      setInput("");
      pushLocalExchange(raw, fromKb);
      return;
    }

    if (options?.fromChip) {
      setInput("");
      pushLocalExchange(raw, fallbackText);
      return;
    }

    addChatMessage(mode, { role: "user", parts: [{ text: raw }] });
    setInput("");
    setLoading(true);
    try {
      const { data, status } = await axios.post("/api/ai/chat", { message: raw, mode }, { validateStatus: () => true });
      let reply =
        status >= 200 &&
        status < 500 &&
        data &&
        typeof data.reply === "string" &&
        data.reply.trim()
          ? data.reply
          : fallbackText;
      if (isNoiseApiPayload(reply)) reply = fallbackText;
      addChatMessage(mode, { role: "model", parts: [{ text: finalizeReply(mode, reply) }] });
    } catch {
      addChatMessage(mode, { role: "model", parts: [{ text: finalizeReply(mode, fallbackText) }] });
    } finally {
      setLoading(false);
    }
  };

  const speakAt = (index: number, text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    whenVoicesReady(() => {
      if (!window.speechSynthesis) return;
      const voice = pickVoiceForLang(ttsLang);
      const u = buildUtterance(text, ttsLang, voice);
      u.onstart = () => setTts({ index, phase: "speaking" });
      u.onend = () => setTts({ index: null, phase: "idle" });
      u.onerror = () => setTts({ index: null, phase: "idle" });
      window.speechSynthesis.speak(u);
    });
  };

  const toggleTts = (index: number, text: string) => {
    if (!window.speechSynthesis) return;
    if (tts.index === index && tts.phase === "speaking") {
      try {
        window.speechSynthesis.pause();
        setTts({ index, phase: "paused" });
      } catch {
        setTts({ index: null, phase: "idle" });
      }
      return;
    }
    if (tts.index === index && tts.phase === "paused") {
      try {
        window.speechSynthesis.resume();
        setTts({ index, phase: "speaking" });
      } catch {
        speakAt(index, text);
      }
      return;
    }
    speakAt(index, text);
  };

  const stopTts = () => {
    window.speechSynthesis?.cancel();
    setTts({ index: null, phase: "idle" });
  };

  const startSpeechToText = () => {
    if (!canStt || loading) return;
    if (sttOn) {
      try {
        recRef.current?.stop();
      } catch {
        /* ignore */
      }
      recRef.current = null;
      setSttOn(false);
      return;
    }
    type SpeechRecCtor = new () => SpeechRecognition;
    const W = window as Window & { SpeechRecognition?: SpeechRecCtor; webkitSpeechRecognition?: SpeechRecCtor };
    const SR = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    recRef.current = rec;
    rec.lang = ttsLang;
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    rec.onresult = (ev: SpeechRecognitionEvent) => {
      const line = ev.results[0]?.[0]?.transcript?.trim();
      if (line) setInput((prev) => (prev ? `${prev} ${line}` : line));
    };
    rec.onend = () => {
      recRef.current = null;
      setSttOn(false);
    };
    rec.onerror = () => {
      recRef.current = null;
      setSttOn(false);
    };
    try {
      rec.start();
      setSttOn(true);
    } catch {
      recRef.current = null;
      setSttOn(false);
    }
  };

  const chipKeys = mode === "business" ? CHIP_KEYS_B : CHIP_KEYS_H;

  return (
    <GlassCard className="flex h-[min(72dvh,42rem)] max-h-[44rem] min-h-[20rem] w-full flex-col overflow-hidden border-white/40 p-0 lg:border-2">
      <div className={cn("flex shrink-0 items-center justify-between border-b border-slate-100/80 px-4 py-3", accentClass)}>
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <Icon size={20} />
          {title}
        </div>
        <button
          type="button"
          onClick={() => {
            stopTts();
            clearChatMessages(mode);
          }}
          className="p-2 rounded-xl hover:bg-white/60 text-slate-500"
          title={t("ai.clearChat")}
        >
          <Trash2 size={18} />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto scroll-smooth bg-white/30 p-4 overscroll-contain"
      >
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
                <div className="mt-2 flex flex-wrap gap-2 items-center">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                    onClick={() => toggleTts(i, msg.parts[0]?.text ?? "")}
                  >
                    {tts.index === i && tts.phase === "speaking" ? (
                      <>
                        <Pause size={14} /> {t("ai.speakPause")}
                      </>
                    ) : tts.index === i && tts.phase === "paused" ? (
                      <>
                        <Play size={14} /> {t("ai.speakResume")}
                      </>
                    ) : (
                      <>
                        <Play size={14} /> {t("ai.speakPlay")} ({ttsLang.startsWith("hi") ? t("ai.listenHi") : t("ai.listenEn")})
                      </>
                    )}
                  </button>
                  {tts.index === i && (tts.phase === "speaking" || tts.phase === "paused") && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs text-slate-600 font-medium hover:underline"
                      onClick={stopTts}
                    >
                      <Square size={12} /> {t("ai.speakStop")}
                    </button>
                  )}
                </div>
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
      <div className="shrink-0 space-y-2 border-t border-slate-100 bg-white/40 p-3">
        <div className="flex flex-wrap gap-2">
          {chipKeys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => send(t(`ai.chips.${k}`), { fromChip: true })}
              className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/15 hover:text-primary"
            >
              {t(`ai.chips.${k}`)}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          {canStt && (
            <button
              type="button"
              onClick={startSpeechToText}
              disabled={loading}
              title={sttOn ? t("ai.sttTapStop") : t("ai.sttTapStart")}
              className={cn(
                "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border transition-all",
                sttOn ? "bg-rose-500 text-white border-rose-500 animate-pulse" : "bg-white/90 border-slate-200 text-slate-600 hover:bg-primary/10",
              )}
            >
              <Mic size={20} aria-hidden />
            </button>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={mode === "business" ? t("ai.placeholderBiz") : t("ai.placeholderHealth")}
            className="flex-1 glass px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={loading}
          />
          <Button onClick={() => send()} loading={loading} className="h-12 w-12 rounded-xl p-0 flex items-center justify-center shrink-0">
            <Send size={20} />
          </Button>
        </div>
        {canStt && sttOn ? (
          <p className="text-[10px] text-slate-400 px-1" aria-live="polite">
            {t("ai.sttListening")}
          </p>
        ) : null}
      </div>
    </GlassCard>
  );
}

const AIAssistant = () => {
  const { t, i18n } = useTranslation();
  const [ttsLang, setTtsLang] = useState<TtsLang>(i18n.language === "hi" ? "hi-IN" : "en-IN");
  const [libQuery, setLibQuery] = useState("");
  const [assistantMode, setAssistantMode] = useState<"business" | "health">("business");

  useEffect(() => {
    setTtsLang(i18n.language === "hi" ? "hi-IN" : "en-IN");
  }, [i18n.language]);

  const bizCount = useMemo(() => countKnowledgeEntries("business"), []);
  const healthCount = useMemo(() => countKnowledgeEntries("health"), []);
  const matches = useMemo(() => searchKnowledgeEntries(libQuery, assistantMode, 25), [libQuery, assistantMode]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Sparkles className="text-primary" /> {t("ai.title")}
          </h1>
          <p className="mt-1 max-w-2xl text-slate-500">{t("ai.subtitle")}</p>
          <p className="mt-2 text-xs text-slate-400">{t("ai.libraryLine", { biz: bizCount, health: healthCount })}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div
            className="flex w-full rounded-2xl border border-slate-200/80 bg-white/70 p-1 shadow-sm sm:max-w-xl"
            role="tablist"
            aria-label={t("ai.assistantPickerAria")}
          >
            <button
              type="button"
              role="tab"
              aria-selected={assistantMode === "business"}
              onClick={() => setAssistantMode("business")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all",
                assistantMode === "business"
                  ? "bg-primary text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100/80",
              )}
            >
              <Briefcase size={18} aria-hidden />
              {t("ai.businessAi")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={assistantMode === "health"}
              onClick={() => setAssistantMode("health")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all",
                assistantMode === "health"
                  ? "bg-rose-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100/80",
              )}
            >
              <Heart size={18} aria-hidden />
              {t("ai.healthAi")}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-500">{t("ai.voiceLangLabel")}</span>
            <button
              type="button"
              onClick={() => setTtsLang("en-IN")}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-semibold transition-all",
                ttsLang === "en-IN" ? "border-primary bg-primary text-white" : "border-slate-200 bg-white/80 text-slate-600",
              )}
            >
              {t("lang.english")}
            </button>
            <button
              type="button"
              onClick={() => setTtsLang("hi-IN")}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-semibold transition-all",
                ttsLang === "hi-IN" ? "border-primary bg-primary text-white" : "border-slate-200 bg-white/80 text-slate-600",
              )}
            >
              {t("lang.hindi")}
            </button>
          </div>
        </div>
      </div>

      <ChatPanel
        key={assistantMode}
        mode={assistantMode}
        ttsLang={ttsLang}
        title={assistantMode === "business" ? t("ai.businessAi") : t("ai.healthAi")}
        icon={assistantMode === "business" ? Briefcase : Heart}
        accentClass={assistantMode === "business" ? "bg-primary/10" : "bg-rose-100/80"}
      />

      <GlassCard className="space-y-4 p-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Search className="text-primary" size={22} /> {t("ai.keywordLib")}
          </h2>
          <p className="text-sm text-slate-500">{t("ai.keywordSubSingle", { mode: t(assistantMode === "business" ? "ai.businessTab" : "ai.healthTab") })}</p>
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
                addChatMessage(assistantMode, { role: "model", parts: [{ text: finalizeReply(assistantMode, entry.answer) }] });
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
