import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/UI";
import {
  TrendingUp,
  Users,
  Zap,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Search,
  MessageSquare,
  Coins,
  Car,
  Package,
  IndianRupee,
  Activity,
  Leaf,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "motion/react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { dashboardMetrics, revenueSeries, funnelData, activityFeed, ordersPipeline } from "@/data/appContent";
import { localizedActivity, localizedOrderRow, localizeFunnelStage } from "@/lib/localizedData";

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}) => (
  <GlassCard className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className={cn("p-3 rounded-2xl", color)}>
        <Icon size={24} className="text-white" />
      </div>
      <div
        className={cn(
          "flex items-center gap-1 text-sm font-semibold",
          change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-slate-400",
        )}
      >
        {change > 0 ? <ArrowUpRight size={16} /> : change < 0 ? <ArrowDownRight size={16} /> : null}
        {change !== 0 ? `${Math.abs(change)}%` : "—"}
      </div>
    </div>
    <div>
      <div className="text-slate-500 text-sm font-medium">{title}</div>
      <div className="text-2xl md:text-3xl font-bold mt-1 tabular-nums">{value}</div>
    </div>
  </GlassCard>
);

const Dashboard = () => {
  const { user } = useStore();
  const { t, i18n } = useTranslation();
  const m = dashboardMetrics;

  const revenueChartData = useMemo(
    () =>
      revenueSeries.map((r) => ({
        ...r,
        name: t(`months.${r.name}` as "months.Mon"),
      })),
    [t, i18n.language],
  );

  const funnelChartData = useMemo(
    () => funnelData.map((row) => ({ ...row, stage: localizeFunnelStage(t, row.stage) })),
    [t, i18n.language],
  );

  const orders = useMemo(() => ordersPipeline.map((o) => localizedOrderRow(t, o)), [t, i18n.language]);
  const activities = useMemo(() => activityFeed.map((a) => localizedActivity(t, a)), [t, i18n.language]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl md:text-4xl font-bold">
            {user?.displayName
              ? t("dashboard.welcomeBack", { name: user.displayName.split(" ")[0] ?? "" })
              : t("dashboard.commandCenter")}
          </motion.h1>
          <p className="text-slate-500 mt-1">{t("dashboard.subtitle")}</p>
          <p className="text-xs text-slate-400 mt-2">{t("dashboard.snapshotNote")}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              placeholder={t("dashboard.searchPlaceholder")}
              className="glass w-full max-w-full rounded-2xl py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-64"
            />
          </div>
          <button type="button" className="glass p-3 rounded-2xl text-slate-600 hover:text-primary relative">
            <Bell size={22} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full border-2 border-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title={t("dashboard.bookedGmv")}
          value={`₹${m.totalEarningsInr.toLocaleString("en-IN")}`}
          change={m.momGrowthPct}
          icon={IndianRupee}
          color="bg-gradient-to-br from-violet-500 to-purple-600"
        />
        <StatCard
          title={t("dashboard.netAfter")}
          value={`₹${m.monthlyEarningsInr.toLocaleString("en-IN")}`}
          change={8.1}
          icon={TrendingUp}
          color="bg-blue-500"
        />
        <StatCard
          title={t("dashboard.activeSkus")}
          value={`${m.inventorySkus} live · ${m.lowStockSkus} low`}
          change={0}
          icon={Package}
          color="bg-amber-500"
        />
        <StatCard
          title={t("dashboard.energyOffset")}
          value={`${m.energySavedKwh} kWh`}
          change={24}
          icon={Zap}
          color="bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold">{t("dashboard.revenueChart")}</h3>
            <select className="bg-transparent text-slate-500 font-medium focus:outline-none text-sm border border-slate-200 rounded-xl px-3 py-1">
              <option>{t("dashboard.period7")}</option>
              <option>{t("dashboard.period30")}</option>
              <option>{t("dashboard.periodQ")}</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "revenue" ? `₹${value.toLocaleString("en-IN")}` : value,
                    name === "revenue" ? t("dashboard.tooltipRevenue") : t("dashboard.tooltipOrders"),
                  ]}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#revFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold mb-4">{t("dashboard.funnel")}</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelChartData} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" width={72} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-2">{t("dashboard.funnelFootnote")}</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">{t("dashboard.ordersMotion")}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-100">
                  <th className="pb-3 pr-4">{t("dashboard.thId")}</th>
                  <th className="pb-3 pr-4">{t("dashboard.thProduct")}</th>
                  <th className="pb-3 pr-4">{t("dashboard.thBuyer")}</th>
                  <th className="pb-3 pr-4">{t("dashboard.thCity")}</th>
                  <th className="pb-3 pr-4">{t("dashboard.thAmount")}</th>
                  <th className="pb-3">{t("dashboard.thStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-50">
                    <td className="py-3 pr-4 font-mono text-xs">{o.id}</td>
                    <td className="py-3 pr-4">{o.product}</td>
                    <td className="py-3 pr-4">{o.buyer}</td>
                    <td className="py-3 pr-4 text-slate-500">{o.city}</td>
                    <td className="py-3 pr-4 tabular-nums">
                      ₹{ordersPipeline.find((x) => x.id === o.id)?.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[11px] font-bold uppercase",
                          o.status === "delivered" && "bg-emerald-100 text-emerald-700",
                          o.status === "shipped" && "bg-blue-100 text-blue-700",
                          o.status === "confirmed" && "bg-amber-100 text-amber-800",
                          o.status === "pending" && "bg-slate-100 text-slate-600",
                        )}
                      >
                        {t(`orderStatus.${o.status}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-primary" /> {t("dashboard.activity")}
          </h3>
          <ul className="space-y-4">
            {activities.map((a) => (
              <li key={a.id} className="text-sm border-b border-slate-50 pb-3 last:border-0">
                <div className="font-semibold text-slate-800">{a.title}</div>
                <div className="text-slate-500 text-xs mt-0.5">{a.detail}</div>
                <div className="text-[10px] text-slate-400 mt-1">{a.time}</div>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <GlassCard className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Leaf className="text-emerald-500" size={18} /> {t("dashboard.impact")}
          </div>
          <div className="text-2xl font-bold tabular-nums">
            {m.co2SavedKg} {t("dashboard.co2Suffix")}
          </div>
          <p className="text-xs text-slate-500">{t("dashboard.impactSub", { trees: m.treesEquivalent })}</p>
        </GlassCard>
        <GlassCard className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Zap size={18} className="text-amber-500" /> {t("dashboard.gridSavings")}
          </div>
          <div className="text-2xl font-bold tabular-nums">₹{m.gridSavingsInr.toLocaleString("en-IN")}</div>
          <p className="text-xs text-slate-500">{t("dashboard.gridSub")}</p>
        </GlassCard>
        <GlassCard className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Users size={18} className="text-primary" /> {t("dashboard.communityReach")}
          </div>
          <div className="text-2xl font-bold tabular-nums">{m.communityReach.toLocaleString("en-IN")}</div>
          <p className="text-xs text-slate-500">{t("dashboard.communitySub")}</p>
        </GlassCard>
        <GlassCard className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Car size={18} className="text-slate-600" /> {t("dashboard.taxiModule")}
          </div>
          <div className="text-2xl font-bold tabular-nums">{t("dashboard.taxiBookings", { n: m.taxiBookingsMo })}</div>
          <p className="text-xs text-slate-500">{t("dashboard.taxiSub")}</p>
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-xl font-bold mb-6">{t("dashboard.quickActions")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: t("dashboard.qaAi"), icon: MessageSquare, color: "bg-pink-100 text-pink-600", to: "/ai" },
            { label: t("dashboard.qaMarketplace"), icon: ShoppingBag, color: "bg-blue-100 text-blue-600", to: "/marketplace" },
            { label: t("dashboard.qaFunding"), icon: Coins, color: "bg-yellow-100 text-yellow-700", to: "/funding" },
            { label: t("dashboard.qaTaxi"), icon: Car, color: "bg-green-100 text-green-700", to: "/taxi" },
          ].map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group border border-slate-100"
            >
              <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", action.color)}>
                <action.icon size={20} />
              </div>
              <span className="font-semibold text-slate-700">{action.label}</span>
              <ArrowUpRight size={18} className="ml-auto text-slate-400" />
            </Link>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
