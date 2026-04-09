import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { GlassCard, Button } from '@/components/UI';
import { Plus, TrendingUp, Package, DollarSign, Settings, Users } from 'lucide-react';

const DEMO_ORDER_KEYS = ['o1', 'o2', 'o3'] as const;
type DemoOrderKey = (typeof DEMO_ORDER_KEYS)[number];

const statusTone: Record<DemoOrderKey, 'delivered' | 'processing' | 'shipped'> = {
  o1: 'delivered',
  o2: 'processing',
  o3: 'shipped',
};

const Business = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('business.title')}</h1>
          <p className="text-slate-500">{t('business.subtitle')}</p>
        </div>
        <Button icon={Plus}>{t('business.addProduct')}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <GlassCard className="lg:col-span-3">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">{t('business.recentOrders')}</h3>
            <Button variant="ghost">{t('business.viewAll')}</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-sm border-b border-slate-100">
                  <th className="pb-4 font-semibold">{t('business.thOrderId')}</th>
                  <th className="pb-4 font-semibold">{t('business.thCustomer')}</th>
                  <th className="pb-4 font-semibold">{t('business.thProduct')}</th>
                  <th className="pb-4 font-semibold">{t('business.thAmount')}</th>
                  <th className="pb-4 font-semibold">{t('business.thStatus')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DEMO_ORDER_KEYS.map((key) => {
                  const tone = statusTone[key];
                  const id = t(`business.demoOrders.${key}.id`);
                  const customer = t(`business.demoOrders.${key}.customer`);
                  const product = t(`business.demoOrders.${key}.product`);
                  const amount = t(`business.demoOrders.${key}.amount`);
                  const status = t(`business.demoOrders.${key}.status`);
                  return (
                    <tr key={key} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">{id}</td>
                      <td className="py-4 text-slate-600">{customer}</td>
                      <td className="py-4 text-slate-600">{product}</td>
                      <td className="py-4 font-bold text-primary">{amount}</td>
                      <td className="py-4">
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-bold',
                            tone === 'delivered'
                              ? 'bg-green-100 text-green-600'
                              : tone === 'processing'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-yellow-100 text-yellow-600',
                          )}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="bg-gradient-to-br from-primary to-primary-dark text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign size={24} />
              <TrendingUp size={20} />
            </div>
            <div className="text-sm font-medium opacity-80">{t('business.monthlyRevenue')}</div>
            <div className="text-3xl font-bold mt-1">$4,850.00</div>
            <div className="mt-4 text-xs font-bold bg-white/20 inline-block px-2 py-1 rounded">{t('business.growth')}</div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-bold mb-4">{t('business.quickStats')}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-600">{t('business.activeProducts')}</span>
                </div>
                <span className="font-bold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-600">{t('business.totalCustomers')}</span>
                </div>
                <span className="font-bold">1,420</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-600">{t('business.storeStatus')}</span>
                </div>
                <span className="text-xs font-bold text-green-500">{t('business.online')}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Business;
