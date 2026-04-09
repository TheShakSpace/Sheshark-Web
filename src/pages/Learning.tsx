import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/UI";
import { GraduationCap, Play, Clock, Star, BookOpen, Award } from "lucide-react";
import { courses } from "@/data/appContent";
import { localizedCourse } from "@/lib/localizedData";

const Learning = () => {
  const { t, i18n } = useTranslation();
  const courseList = useMemo(
    () => courses.map((c) => localizedCourse(t, c)),
    [t, i18n.language],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">{t("learning.title")}</h1>
          <p
            className="text-slate-500 max-w-2xl"
            dangerouslySetInnerHTML={{ __html: t("learning.intro") }}
          />
        </div>
        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3 shrink-0">
          <Award className="text-primary" size={22} />
          <div>
            <div className="font-bold">{t("learning.certificates")}</div>
            <div className="text-xs text-slate-500">{t("learning.certSub")}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
        {courseList.map((course) => (
          <GlassCard key={course.id} className="p-0 overflow-hidden group flex flex-col">
            <div className="relative h-52">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                <span className="text-white text-xs font-bold px-2 py-1 rounded-lg bg-white/20 backdrop-blur-md">
                  {course.category}
                </span>
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-primary shadow-lg opacity-90">
                  <Play fill="currentColor" size={18} />
                </div>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2">
                <BookOpen size={14} />
                {course.duration} · {course.lessons} {t("learning.lessons")}
              </div>
              <h3 className="text-xl font-bold mb-2 leading-snug">{course.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">{course.description}</p>
              <div className="text-xs text-slate-500 mb-4">
                {t("learning.instructor")} {course.instructor} · {course.students.toLocaleString("en-IN")}{" "}
                {t("learning.learners")} · {t("learning.ratingLabel")} {course.rating}
              </div>
              <ul className="text-xs text-slate-500 space-y-1 mb-4 flex-1 border-t border-slate-100 pt-3">
                {course.syllabus.slice(0, 3).map((s) => (
                  <li key={s}>• {s}</li>
                ))}
                {course.syllabus.length > 3 && (
                  <li className="text-primary font-semibold">{t("learning.moreThemes", { count: course.syllabus.length - 3 })}</li>
                )}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star size={16} fill="currentColor" /> {course.rating}
                </div>
                <Link
                  to={`/learning/${course.id}`}
                  className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  {t("learning.openCourse")} <Play size={14} />
                </Link>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
              <GraduationCap size={20} /> {t("learning.academy")}
            </div>
            <h3 className="text-2xl font-bold">{t("learning.bannerTitle")}</h3>
            <p className="text-white/85 text-sm max-w-xl">{t("learning.bannerBody")}</p>
          </div>
          <Link
            to="/learning/course-1"
            className="px-8 py-3 rounded-2xl bg-white text-primary font-bold shadow-lg hover:scale-[1.02] transition-transform text-center"
          >
            {t("learning.continue")}
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Learning;
