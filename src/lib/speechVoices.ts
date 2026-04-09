/** Chrome loads voices asynchronously; call cb once voices are available or after timeout. */
export function whenVoicesReady(cb: () => void): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const syn = window.speechSynthesis;
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    cb();
  };
  if (syn.getVoices().length > 0) {
    finish();
    return;
  }
  syn.addEventListener("voiceschanged", finish, { once: true });
  window.setTimeout(finish, 800);
}

function scoreHindiVoice(v: SpeechSynthesisVoice): number {
  const lang = (v.lang || "").toLowerCase();
  const name = `${v.name} ${v.voiceURI}`.toLowerCase();
  let s = 0;
  if (lang.startsWith("hi")) s += 100;
  if (lang === "hi-in") s += 40;
  if (/\bhindi\b/.test(name)) s += 30;
  if (/india|bharat/.test(name) && lang.includes("hi")) s += 15;
  return s;
}

function scoreEnglishVoice(v: SpeechSynthesisVoice): number {
  const lang = (v.lang || "").toLowerCase();
  let s = 0;
  if (lang.startsWith("en-in")) s += 80;
  else if (lang.startsWith("en-gb")) s += 50;
  else if (lang.startsWith("en")) s += 40;
  if (/india|indian/.test(`${v.name}`.toLowerCase())) s += 15;
  return s;
}

/** Pick a system voice so Hindi mode uses a Hindi engine (setting lang alone is often ignored). */
export function pickVoiceForLang(lang: string): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  if (lang.toLowerCase().startsWith("hi")) {
    const sorted = [...voices].sort((a, b) => scoreHindiVoice(b) - scoreHindiVoice(a));
    const best = sorted.find((v) => scoreHindiVoice(v) > 0);
    if (best) return best;
    const anyHi = voices.find((v) => (v.lang || "").toLowerCase().startsWith("hi"));
    if (anyHi) return anyHi;
  }

  const sortedEn = [...voices].sort((a, b) => scoreEnglishVoice(b) - scoreEnglishVoice(a));
  const en = sortedEn.find((v) => scoreEnglishVoice(v) > 0);
  return en ?? voices[0] ?? null;
}
