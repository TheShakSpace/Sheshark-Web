import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { LANG_CHOSEN_KEY, persistLanguage } from '@/i18n/config';
import { GlassCard } from '@/components/UI';

/**
 * Shown once until the user picks a language (stored in LANG_CHOSEN_KEY).
 * Navbar / Profile can change language anytime after that.
 */
export const InitialLanguageModal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(() => {
    if (typeof localStorage === 'undefined') return false;
    return !localStorage.getItem(LANG_CHOSEN_KEY);
  });

  if (!open) return null;

  const choose = (lng: 'en' | 'hi') => {
    void i18n.changeLanguage(lng);
    persistLanguage(lng);
    localStorage.setItem(LANG_CHOSEN_KEY, '1');
    setOpen(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-md px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-8 text-center space-y-6 border-2 border-primary/20 shadow-2xl shadow-primary/10">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">{t('lang.chooseTitle')}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{t('lang.chooseSubtitle')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => choose('en')}
                className="flex-1 rounded-2xl border-2 border-slate-200 py-4 font-bold text-slate-800 hover:border-primary hover:bg-primary/5 transition-all"
              >
                {t('lang.english')} <span className="block text-xs font-normal text-slate-500 mt-1">English</span>
              </button>
              <button
                type="button"
                onClick={() => choose('hi')}
                className="flex-1 rounded-2xl border-2 border-primary bg-primary/5 py-4 font-bold text-primary hover:bg-primary hover:text-white transition-all"
              >
                {t('lang.hindi')} <span className="block text-xs font-normal opacity-90 mt-1">Hindi</span>
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
