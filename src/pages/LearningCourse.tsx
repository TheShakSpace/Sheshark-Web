import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { GlassCard, Button } from "@/components/UI";
import { ArrowLeft, BookOpen, CheckCircle, Circle, Clock, FileText } from "lucide-react";
import { courses, quizzes } from "@/data/appContent";
import { getLessonArticle, wordCountApprox } from "@/data/lessonArticles";
import { localizedCourse, localizedQuiz } from "@/lib/localizedData";

const mdComponents = {
  h2: ({ ...props }: React.ComponentProps<"h2">) => (
    <h2 className="mt-8 mb-3 text-xl font-bold text-slate-900 first:mt-0" {...props} />
  ),
  h3: ({ ...props }: React.ComponentProps<"h3">) => (
    <h3 className="mt-6 mb-2 text-lg font-bold text-slate-800" {...props} />
  ),
  p: ({ ...props }: React.ComponentProps<"p">) => <p className="mb-4 text-slate-700 leading-relaxed" {...props} />,
  ul: ({ ...props }: React.ComponentProps<"ul">) => <ul className="mb-4 list-disc space-y-2 pl-5 text-slate-700" {...props} />,
  ol: ({ ...props }: React.ComponentProps<"ol">) => <ol className="mb-4 list-decimal space-y-2 pl-5 text-slate-700" {...props} />,
  li: ({ ...props }: React.ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
  strong: ({ ...props }: React.ComponentProps<"strong">) => <strong className="font-semibold text-slate-900" {...props} />,
  a: ({ ...props }: React.ComponentProps<"a">) => (
    <a className="font-medium text-primary underline underline-offset-2 hover:text-primary-dark" {...props} />
  ),
};

/** Accepts youtu.be, watch?v=, /embed/, nocookie embed, or raw 11-char id. */
function youtubeVideoId(url: string): string | null {
  const u = url.trim();
  if (/^[\w-]{11}$/.test(u)) return u;
  const m =
    u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/) ||
    u.match(/youtube\.com\/embed\/([\w-]{11})/) ||
    u.match(/youtube-nocookie\.com\/embed\/([\w-]{11})/);
  return m ? m[1] : null;
}

function embedYouTube(url: string): string {
  const id = youtubeVideoId(url);
  if (!id) return url;
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
}

const LearningCourse = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const baseCourse = courses.find((c) => c.id === id);
  const course = useMemo(
    () => (baseCourse ? localizedCourse(t, baseCourse) : undefined),
    [baseCourse, t, i18n.language],
  );
  const qsBase = id ? quizzes[id] : undefined;
  const qs = useMemo(
    () => (!id || !qsBase ? undefined : localizedQuiz(t, id, qsBase)),
    [id, qsBase, t, i18n.language],
  );
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const score = useMemo(() => {
    if (!qs) return null;
    let correct = 0;
    qs.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct += 1;
    });
    return { correct, total: qs.length };
  }, [qs, answers]);

  if (!course) {
    return (
      <div className="space-y-4">
        <Link to="/learning" className="text-primary font-medium inline-flex items-center gap-2">
          <ArrowLeft size={18} /> {t("common.back")}
        </Link>
        <GlassCard>{t("notFound.course")}</GlassCard>
      </div>
    );
  }

  const passed = score && score.total > 0 && score.correct / score.total >= 0.8;

  return (
    <div className="space-y-8 max-w-4xl">
      <Link to="/learning" className="text-primary font-medium inline-flex items-center gap-2">
        <ArrowLeft size={18} /> {t("learningCourse.allCourses")}
      </Link>

      <GlassCard className="p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-56 md:h-full object-cover min-h-[220px]"
            loading="eager"
            decoding="async"
          />
          <div className="p-4 sm:p-6 md:p-8">
            <div className="text-xs font-bold text-primary uppercase tracking-wide">{course.category}</div>
            <h1 className="text-3xl font-bold mt-2 leading-tight">{course.title}</h1>
            <p className="text-slate-600 mt-4 leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Clock size={16} /> {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen size={16} /> {course.lessons} {t("learning.lessons")}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {course.videoIntroUrl && (
        <GlassCard className="p-4">
          <h2 className="text-lg font-bold mb-2">{t("learningCourse.introVideoTitle")}</h2>
          <p
            className="text-sm text-slate-600 mb-4"
            dangerouslySetInnerHTML={{ __html: t("learningCourse.introVideoBody") }}
          />
          <p className="text-sm text-slate-500 mb-4">{course.videoAttribution ?? ""}</p>
          <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
            <iframe
              title={`${course.title} — introduction video`}
              src={embedYouTube(course.videoIntroUrl)}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </GlassCard>
      )}

      <GlassCard className="space-y-4">
        <div className="flex items-start gap-3">
          <FileText className="text-primary shrink-0 mt-1" size={24} />
          <div>
            <h2 className="text-xl font-bold">{t("learningCourse.tutorialsTitle")}</h2>
            <p
              className="text-sm text-slate-600 mt-1 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("learningCourse.tutorialsBody") }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {course.lessonsDetail.map((l, idx) => {
            const article = getLessonArticle(l.id, i18n.language);
            const wc = article ? wordCountApprox(article) : 0;
            return (
              <details
                key={l.id}
                open={idx === 0}
                className="group rounded-2xl border border-slate-200/90 bg-white/90 overflow-hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 hover:bg-slate-50/90 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3 min-w-0">
                    {idx === 0 ? (
                      <CheckCircle className="text-primary shrink-0" size={22} aria-hidden />
                    ) : (
                      <Circle className="text-slate-300 shrink-0" size={22} aria-hidden />
                    )}
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 leading-snug">
                        {t("learningCourse.lessonN", { n: idx + 1 })} {l.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} /> {l.duration}
                        </span>
                        {article ? (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary tabular-nums">
                            {t("learningCourse.wordsApprox", { count: wc })}
                          </span>
                        ) : (
                          <span className="text-amber-700 font-medium">{t("learningCourse.comingSoon")}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide shrink-0 group-open:text-primary">
                    {article ? t("common.read") : "—"}
                  </span>
                </summary>
                {article ? (
                  <div className="border-t border-slate-100 px-4 sm:px-6 py-6 max-h-[min(85vh,1200px)] overflow-y-auto text-[15px]">
                    <ReactMarkdown components={mdComponents}>{article}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
                    {t("learningCourse.articleSoon")}
                  </div>
                )}
              </details>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="text-xl font-bold mb-2">{t("learningCourse.resourcesTitle")}</h2>
        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
          {course.resources.map((r) => {
            const url = r.match(/https?:\/\/[^\s]+/)?.[0];
            return (
              <li key={r}>
                {url ? (
                  <>
                    {r.replace(url, "").trim().replace(/:\s*$/, "")}
                    {r.includes(url) && r.replace(url, "").trim() ? ": " : null}
                    <a href={url} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                      {url.replace(/^https?:\/\//, "")}
                    </a>
                  </>
                ) : (
                  r
                )}
              </li>
            );
          })}
        </ul>
      </GlassCard>

      {qs && qs.length > 0 && (
        <GlassCard>
          <h2 className="text-xl font-bold mb-4">{t("learningCourse.quizTitle")}</h2>
          <div className="space-y-6">
            {qs.map((q, qi) => (
              <div key={q.id} className="border-b border-slate-100 pb-4 last:border-0">
                <div className="font-semibold text-slate-800 mb-3">
                  {qi + 1}. {q.question}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        className="accent-primary"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Button onClick={() => setShowResult(true)} className="rounded-2xl">
              {t("learningCourse.grade")}
            </Button>
            {showResult && score && (
              <span className="text-sm font-semibold text-slate-700">
                {t("learningCourse.score", { correct: score.correct, total: score.total })}
                {passed ? t("common.certificateUnlocked") : t("common.certificateAim")}
              </span>
            )}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default LearningCourse;
