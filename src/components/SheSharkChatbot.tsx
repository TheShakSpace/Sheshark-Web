import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  link?: { to: string; label: string };
};

type QuickOption = {
  id: string;
  label: string;
  reply: string;
  link?: { to: string; label: string };
};

const WELCOME_ID = "welcome";

function botBubble(text: string, link?: { to: string; label: string }): ChatMessage {
  return { id: Math.random().toString(36).slice(2), role: "bot", text, link };
}

function userBubble(text: string): ChatMessage {
  return { id: Math.random().toString(36).slice(2), role: "user", text };
}

export const SheSharkChatbot: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const QUICK_OPTIONS: QuickOption[] = useMemo(
    () => [
      {
        id: "what",
        label: t("chatbot.optWhat.label"),
        reply: t("chatbot.optWhat.reply"),
        link: { to: "/dashboard", label: t("chatbot.optWhat.link") },
      },
      {
        id: "join",
        label: t("chatbot.optJoin.label"),
        reply: t("chatbot.optJoin.reply"),
        link: { to: "/login", label: t("chatbot.optJoin.link") },
      },
      {
        id: "learn",
        label: t("chatbot.optLearn.label"),
        reply: t("chatbot.optLearn.reply"),
        link: { to: "/learning", label: t("chatbot.optLearn.link") },
      },
      {
        id: "shop",
        label: t("chatbot.optShop.label"),
        reply: t("chatbot.optShop.reply"),
        link: { to: "/marketplace", label: t("chatbot.optShop.link") },
      },
      {
        id: "funding",
        label: t("chatbot.optFunding.label"),
        reply: t("chatbot.optFunding.reply"),
        link: { to: "/funding", label: t("chatbot.optFunding.link") },
      },
      {
        id: "taxi",
        label: t("chatbot.optTaxi.label"),
        reply: t("chatbot.optTaxi.reply"),
        link: { to: "/taxi", label: t("chatbot.optTaxi.link") },
      },
      {
        id: "ai",
        label: t("chatbot.optAi.label"),
        reply: t("chatbot.optAi.reply"),
        link: { to: "/ai", label: t("chatbot.optAi.link") },
      },
      {
        id: "apk",
        label: t("chatbot.optApk.label"),
        reply: t("chatbot.optApk.reply"),
        link: { to: "/", label: t("chatbot.optApk.link") },
      },
    ],
    [t],
  );

  useEffect(() => {
    if (!open || messages.length > 0) return;
    setMessages([{ id: WELCOME_ID, role: "bot", text: t("chatbot.welcome") }]);
  }, [open, messages.length, t]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const pickOption = (opt: QuickOption) => {
    setMessages((prev) => [...prev, userBubble(opt.label), botBubble(opt.reply, opt.link)]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className={cn(
              "fixed z-[100] flex flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white/95 shadow-2xl shadow-primary/15 backdrop-blur-xl",
              "bottom-20 right-4 sm:bottom-6 sm:right-6",
              "h-[min(520px,70vh)] w-[min(440px,calc(100vw-1.5rem))] sm:w-[420px]",
              "md:flex-row md:h-[min(480px,72vh)] md:w-[min(640px,calc(100vw-2rem))]",
            )}
            role="dialog"
            aria-label={t("chatbot.ariaDialog")}
          >
            <div className="flex min-h-0 min-w-0 flex-1 flex-col border-pink-50 md:border-r">
              <div className="flex items-center gap-3 bg-gradient-to-r from-primary/90 to-primary-light/90 px-4 py-3 text-white">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/25 text-2xl shadow-inner">
                  🦈
                  <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-amber-200" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold leading-tight">{t("chatbot.sharky")}</div>
                  <div className="truncate text-xs text-white/85">{t("chatbot.subtitle")}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setMessages([]);
                  }}
                  className="rounded-xl p-2 hover:bg-white/20 transition-colors"
                  aria-label={t("chatbot.ariaClose")}
                >
                  <X size={20} />
                </button>
              </div>

              <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: m.role === "user" ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[92%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed shadow-sm",
                        m.role === "user"
                          ? "rounded-br-md bg-primary text-white"
                          : "rounded-bl-md border border-pink-100/80 bg-gradient-to-br from-white to-pink-50/50 text-slate-700",
                      )}
                    >
                      <span className="whitespace-pre-wrap">{renderInlineBold(m.text)}</span>
                      {m.link && m.role === "bot" && (
                        <Link
                          to={m.link.to}
                          className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary hover:bg-primary/20"
                          onClick={() => setOpen(false)}
                        >
                          {m.link.label} →
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-pink-100/80 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {t("chatbot.footerNote")}
              </div>
            </div>

            <div className="flex max-h-44 shrink-0 flex-col gap-1.5 border-t border-pink-100/80 bg-pink-50/30 p-2 md:max-h-none md:w-48 md:border-t-0 md:border-l md:p-3">
              <div className="hidden px-1 pb-1 text-[10px] font-bold uppercase tracking-wide text-primary/70 md:block">
                {t("chatbot.pickTopic")}
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 md:flex-col md:overflow-y-auto md:overflow-x-visible md:pb-0">
                {QUICK_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => pickOption(opt)}
                    className="shrink-0 rounded-xl border border-pink-100 bg-white px-2.5 py-2 text-left text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-[0.98] md:shrink md:px-3"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          type="button"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className="fixed bottom-6 right-6 z-[101] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-xl shadow-primary/40"
          aria-expanded={false}
          aria-label={t("chatbot.ariaOpen")}
          onClick={() => setOpen(true)}
        >
          <MessageCircle size={26} strokeWidth={2.25} />
          <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-amber-950 shadow">
            ?
          </span>
        </motion.button>
      )}
    </>
  );
};

function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
