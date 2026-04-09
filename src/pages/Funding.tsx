import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GlassCard, Button } from "@/components/UI";
import { Coins, Bookmark, Calendar, Users, Award, Plus, X } from "lucide-react";
import { fundingRows } from "@/data/appContent";
import { localizedFundingRow } from "@/lib/localizedData";

const Funding = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    stage: "",
    amountNeeded: "",
    summary: "",
  });

  const rows = useMemo(() => fundingRows.map((r) => localizedFundingRow(t, r)), [t]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setOpen(false);
  };

  const formFieldKeys = ["fullName", "email", "phone", "businessName", "stage", "amountNeeded"] as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">{t("funding.title")}</h1>
          <p className="text-slate-500">{t("funding.subtitle")}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button variant="secondary" icon={Bookmark}>
            {t("funding.saved")}
          </Button>
          <Button icon={Plus} onClick={() => setOpen(true)}>
            {t("funding.talkDesk")}
          </Button>
        </div>
      </div>

      {submitted && (
        <GlassCard className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-5">{t("funding.thankYou")}</GlassCard>
      )}

      <div className="grid grid-cols-1 gap-6">
        {rows.map((grant) => (
          <GlassCard key={grant.id} className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shrink-0">
              <Coins size={32} />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase">
                  {t(`fundingTypes.${grant.type}`)}
                </span>
                {grant.isNew && (
                  <span className="px-3 py-1 bg-primary/15 text-primary text-xs font-bold rounded-full">{t("funding.newWindow")}</span>
                )}
                <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                  <Calendar size={14} /> {t("funding.deadline")} {grant.deadline}
                </span>
              </div>
              <h3 className="text-2xl font-bold">{grant.title}</h3>
              <p className="text-slate-600 max-w-3xl leading-relaxed">{grant.description}</p>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{t("funding.eligibility")}</span> {grant.eligibility}
              </p>
              <div className="flex items-center gap-6 pt-2 flex-wrap">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Award size={18} className="text-primary" /> {t("funding.nodal")} {grant.provider}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Users size={18} className="text-primary" /> {t("funding.bundle")}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-stretch lg:items-end gap-4 w-full lg:w-auto shrink-0">
              <div className="text-2xl font-bold text-primary text-center lg:text-right">{grant.amount}</div>
              <Button className="w-full lg:w-auto" onClick={() => setOpen(true)}>
                {t("funding.startHelp")}
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <GlassCard className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              type="button"
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 text-slate-500"
              onClick={() => setOpen(false)}
              aria-label={t("common.close")}
            >
              <X size={22} />
            </button>
            <h2 className="text-2xl font-bold pr-10">{t("funding.intakeTitle")}</h2>
            <p className="text-sm text-slate-500 mt-1 mb-6">{t("funding.intakeSubtitle")}</p>
            <form className="space-y-4" onSubmit={submit}>
              {formFieldKeys.map((key) => (
                <div key={key}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t(`funding.labels.${key}`)}</label>
                  <input
                    required={key === "fullName" || key === "phone"}
                    className="mt-1 w-full glass px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("funding.labels.summary")}</label>
                <textarea
                  required
                  rows={4}
                  className="mt-1 w-full glass px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={form.summary}
                  onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                />
              </div>
              <Button type="submit" className="w-full rounded-2xl py-3">
                {t("funding.submitCallback")}
              </Button>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default Funding;
