import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { persistLanguage, LANG_CHOSEN_KEY } from '@/i18n/config';

type Props = {
  className?: string;
  variant?: 'navbar' | 'compact' | 'settings';
};

export const LanguageSwitcher: React.FC<Props> = ({ className, variant = 'compact' }) => {
  const { i18n, t } = useTranslation();
  const cur = i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const set = (lng: 'en' | 'hi') => {
    void i18n.changeLanguage(lng);
    persistLanguage(lng);
    localStorage.setItem(LANG_CHOSEN_KEY, '1');
  };

  if (variant === 'settings') {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        <button
          type="button"
          onClick={() => set('en')}
          className={cn(
            'rounded-xl px-4 py-2 text-sm font-semibold border transition-all',
            cur === 'en' ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200 text-slate-600 hover:border-primary/30',
          )}
        >
          {t('lang.english')}
        </button>
        <button
          type="button"
          onClick={() => set('hi')}
          className={cn(
            'rounded-xl px-4 py-2 text-sm font-semibold border transition-all',
            cur === 'hi' ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200 text-slate-600 hover:border-primary/30',
          )}
        >
          {t('lang.hindi')}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/70 p-1 backdrop-blur-sm',
        variant === 'navbar' && 'shadow-sm',
        className,
      )}
      role="group"
      aria-label={t('lang.switchAria')}
    >
      <Languages size={14} className="ml-1 text-slate-400 hidden sm:block shrink-0" />
      <button
        type="button"
        onClick={() => set('en')}
        className={cn(
          'rounded-full px-2.5 py-1.5 text-xs font-bold transition-all sm:px-3',
          cur === 'en' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100',
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => set('hi')}
        className={cn(
          'rounded-full px-2.5 py-1.5 text-xs font-bold transition-all sm:px-3',
          cur === 'hi' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100',
        )}
      >
        हि
      </button>
    </div>
  );
};

export default LanguageSwitcher;
