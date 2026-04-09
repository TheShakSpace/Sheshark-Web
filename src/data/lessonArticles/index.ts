import { course1Articles } from "./course1";
import { course2Articles } from "./course2";
import { course3Articles } from "./course3";
import { course4Articles } from "./course4";
import { lessonArticlesHi } from "./hindi";

/** Full text tutorials (~1,000 words each) keyed by lesson id (e.g. l-1-1). */
export const lessonArticles: Record<string, string> = {
  ...course1Articles,
  ...course2Articles,
  ...course3Articles,
  ...course4Articles,
};

/** Resolved markdown for a lesson: Hindi when UI is Hindi and a translation exists. */
export function getLessonArticle(id: string, lang: string): string | undefined {
  if (lang.startsWith("hi")) {
    const hi = lessonArticlesHi[id];
    if (hi) return hi;
  }
  return lessonArticles[id];
}

export function wordCountApprox(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
