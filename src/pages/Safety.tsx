import React from "react";
import { useTranslation } from "react-i18next";
import { GlassCard, Button } from "@/components/UI";
import { ShieldAlert, Phone, Info } from "lucide-react";

const EMERGENCY_IDS = ["e181", "e100", "e108", "e782", "e14416", "e080"] as const;

const EMERGENCY_NUMBERS: Record<(typeof EMERGENCY_IDS)[number], string> = {
  e181: "181",
  e100: "100",
  e108: "108",
  e782: "7827170171",
  e14416: "14416",
  e080: "08046110007",
};

const Safety = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-red-500/15">
          <ShieldAlert size={48} />
        </div>
        <h1 className="text-4xl font-bold">{t("safety.title")}</h1>
        <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">{t("safety.intro")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="border-red-100 bg-red-50/30 flex flex-col items-center text-center p-10">
          <h3 className="text-2xl font-bold text-red-600 mb-3">{t("safety.sosTitle")}</h3>
          <p className="text-red-600/80 text-sm mb-8 leading-relaxed">{t("safety.sosBody")}</p>
          <button
            type="button"
            className="w-36 h-36 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-500/35 hover:scale-105 active:scale-95 transition-all font-bold text-xl"
          >
            {t("safety.sosBtn")}
          </button>
          <p className="text-xs text-red-500/70 mt-4">{t("safety.sosFoot")}</p>
        </GlassCard>

        <GlassCard className="space-y-4">
          <h3 className="text-xl font-bold">{t("safety.saveTitle")}</h3>
          <p className="text-xs text-slate-500">{t("safety.saveTemplate")}</p>
          <div className="space-y-3">
            {EMERGENCY_IDS.map((id) => {
              const number = EMERGENCY_NUMBERS[id];
              return (
                <div
                  key={id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-white rounded-2xl border border-slate-100"
                >
                  <div>
                    <div className="font-bold text-slate-800">{t(`safety.emergency.${id}.name`)}</div>
                    <div className="text-xs text-slate-500 mt-1">{t(`safety.emergency.${id}.note`)}</div>
                  </div>
                  <a href={`tel:${number.replace(/\s/g, "")}`} className="flex items-center gap-2 text-primary font-bold text-lg shrink-0">
                    <Phone size={18} />
                    {number}
                  </a>
                </div>
              );
            })}
          </div>
          <Button variant="secondary" className="w-full rounded-2xl">
            {t("safety.syncContacts")}
          </Button>
        </GlassCard>
      </div>

      <GlassCard className="bg-slate-900 text-white/80 text-xs p-6 flex gap-4 items-start">
        <Info size={20} className="text-primary shrink-0" />
        <p className="leading-relaxed">{t("safety.disclaimer")}</p>
      </GlassCard>
    </div>
  );
};

export default Safety;
