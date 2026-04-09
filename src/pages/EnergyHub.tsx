import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { GlassCard, Button } from '@/components/UI';
import { Zap, Calculator, BookOpen, BarChart3, Sun, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ENERGY_MONTH_KEYS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const;

const ENERGY_SERIES: { monthKey: (typeof ENERGY_MONTH_KEYS)[number]; savings: number; production: number }[] = [
  { monthKey: 'Jan', savings: 120, production: 450 },
  { monthKey: 'Feb', savings: 150, production: 520 },
  { monthKey: 'Mar', savings: 180, production: 610 },
  { monthKey: 'Apr', savings: 220, production: 750 },
  { monthKey: 'May', savings: 280, production: 890 },
  { monthKey: 'Jun', savings: 350, production: 1100 },
];

const CARD_KEYS = ['maintenance', 'grid', 'battery'] as const;

const CARD_ICONS = {
  maintenance: Sun,
  grid: Zap,
  battery: BarChart3,
} as const;

const CARD_COLORS = {
  maintenance: 'bg-orange-100 text-orange-600',
  grid: 'bg-blue-100 text-blue-600',
  battery: 'bg-green-100 text-green-600',
} as const;

const EnergyHub = () => {
  const { t } = useTranslation();
  const [bill, setBill] = useState(100);
  const [roofSize, setRoofSize] = useState(500);

  const estimatedSavings = (bill * 0.85).toFixed(2);
  const paybackPeriod = (roofSize / 50).toFixed(1);

  const energyData = useMemo(
    () =>
      ENERGY_SERIES.map((row) => ({
        ...row,
        month: t(`months.${row.monthKey}`),
      })),
    [t],
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('energy.title')}</h1>
          <p className="text-slate-500">{t('energy.subtitle')}</p>
        </div>
        <Button variant="secondary" icon={BookOpen}>
          {t('energy.learnBasics')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <Calculator size={24} />
            <h3 className="text-xl font-bold">{t('energy.savingsCalc')}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">{t('energy.monthlyBill')}</label>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs font-bold text-slate-400 mt-1">
                <span>$50</span>
                <span className="text-primary">${bill}</span>
                <span>$1000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">{t('energy.roofArea')}</label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={roofSize}
                onChange={(e) => setRoofSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs font-bold text-slate-400 mt-1">
                <span>100</span>
                <span className="text-primary">
                  {roofSize} {t('energy.sqFt')}
                </span>
                <span>5000</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
            <div className="text-sm text-slate-500 font-medium">{t('energy.estMonthly')}</div>
            <div className="text-4xl font-bold text-primary mt-1">${estimatedSavings}</div>
            <div className="text-xs text-slate-400 mt-2">{t('energy.payback', { years: paybackPeriod })}</div>
          </div>

          <Button className="w-full">
            {t('energy.getQuote')} <ArrowRight size={18} />
          </Button>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 text-yellow-500">
              <BarChart3 size={24} />
              <h3 className="text-xl font-bold">{t('energy.analytics')}</h3>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-primary" /> {t('energy.savings')}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-yellow-400" /> {t('energy.production')}
              </span>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#ff4d94"
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#ff4d94', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="production"
                  stroke="#fbbf24"
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#fbbf24', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CARD_KEYS.map((key) => {
          const Icon = CARD_ICONS[key];
          return (
            <GlassCard key={key} className="flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
              <div className={cn('p-4 rounded-2xl', CARD_COLORS[key])}>
                <Icon size={24} />
              </div>
              <div>
                <h4 className="font-bold">{t(`energy.cards.${key}.title`)}</h4>
                <p className="text-xs text-slate-500">{t(`energy.cards.${key}.read`)}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default EnergyHub;
