import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Button, GlassCard } from '@/components/UI';
import { 
  Download, 
  ArrowRight, 
  Shield, 
  Zap, 
  Heart, 
  Globe, 
  CheckCircle2, 
  MessageSquare, 
  ShoppingBag, 
  Coins, 
  Users, 
  Star,
  ChevronRight,
  PlayCircle,
  HelpCircle
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-8 border border-primary/20"
            >
              <Zap size={14} className="fill-current" /> {t('landing.hero.badge')}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hero-title text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] uppercase"
            >
              {t('landing.hero.titleLine1')} <br />
              <span className="gradient-text">{t('landing.hero.titleLine2')}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-muted max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              {t('landing.hero.subtitle')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button onClick={() => navigate('/login')} className="text-lg px-12 py-5 shadow-2xl shadow-primary/40">
                {t('landing.hero.getStarted')} <ArrowRight size={20} />
              </Button>
              <a href="/Sheshark.apk" download className="glass px-12 py-5 rounded-full font-bold text-primary hover:bg-primary/5 transition-all flex items-center gap-2">
                {t('landing.hero.downloadApp')} <Download size={20} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-[150px]"
          />
          
          {/* Floating Glass Cards for Hero */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute top-[20%] left-[5%] hidden xl:block"
          >
            <GlassCard className="w-64 rotate-[-6deg] border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Zap size={20} />
                </div>
                <div className="font-bold text-sm">{t('landing.hero.floatEnergy')}</div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: 1, duration: 2 }}
                  className="h-full bg-primary"
                />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-[20%] right-[5%] hidden xl:block"
          >
            <GlassCard className="w-64 rotate-[6deg] border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500">
                  <Heart size={20} />
                </div>
                <div className="font-bold text-sm">{t('landing.hero.floatHealth')}</div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-4 w-full rounded-sm ${i <= 4 ? 'bg-pink-400' : 'bg-pink-100'}`} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section id="features" className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('landing.features.title')}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">{t('landing.features.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: t('landing.features.cards.energyHub.title'), desc: t('landing.features.cards.energyHub.desc') },
              { icon: Shield, title: t('landing.features.cards.safety.title'), desc: t('landing.features.cards.safety.desc') },
              { icon: Heart, title: t('landing.features.cards.healthAi.title'), desc: t('landing.features.cards.healthAi.desc') },
              { icon: MessageSquare, title: t('landing.features.cards.aiAdvisor.title'), desc: t('landing.features.cards.aiAdvisor.desc') },
              { icon: ShoppingBag, title: t('landing.features.cards.marketplace.title'), desc: t('landing.features.cards.marketplace.desc') },
              { icon: Coins, title: t('landing.features.cards.funding.title'), desc: t('landing.features.cards.funding.desc') },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl hover:scale-105 transition-transform cursor-default"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <f.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* QR Code Download Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 glass p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-br from-primary/5 to-transparent border-primary/20"
          >
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4">{t('landing.appQr.title')}</h3>
              <p className="text-slate-600 text-lg mb-6">
                {t('landing.appQr.body')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="/Sheshark.apk" download className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
                  <Download size={18} />
                  <span className="text-sm font-medium">{t('landing.appQr.androidApk')}</span>
                </a>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-xl cursor-not-allowed">
                  <Download size={18} />
                  <span className="text-sm font-medium italic">{t('landing.appQr.iosComing')}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-primary/20 border-4 border-primary/10">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.origin + '/Sheshark.apk')}`} 
                alt={t('landing.alt.qr')}
                className="w-44 h-44"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center text-xs font-bold text-primary uppercase tracking-widest">
                {t('landing.appQr.scanDownload')}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: t('landing.stats.activeUsers'), value: "50K+" },
              { label: t('landing.stats.energySaved'), value: "1.2MW" },
              { label: t('landing.stats.businesses'), value: "5K+" },
              { label: t('landing.stats.safetySos'), value: "24/7" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{s.value}</div>
                <div className="text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About SheShark (Mission) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">{t('landing.mission.title')} <span className="text-primary">{t('landing.mission.highlight')}</span></h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('landing.mission.body')}
            </p>
            <div className="space-y-4">
              {[
                t('landing.mission.bullets.b1'),
                t('landing.mission.bullets.b2'),
                t('landing.mission.bullets.b3'),
                t('landing.mission.bullets.b4'),
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-white flex items-center justify-center p-8 border border-slate-100">
              <img 
                src="https://cdni.iconscout.com/illustration/premium/thumb/female-developer-working-on-laptop-illustration-svg-download-png-11313929.png" 
                alt={t('landing.alt.developer')} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl shadow-xl hidden md:block">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-slate-500 font-medium">{t('landing.mission.statLabel')}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">{t('landing.journey.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: t('landing.journey.steps.s1.step'), title: t('landing.journey.steps.s1.title'), desc: t('landing.journey.steps.s1.desc') },
              { step: t('landing.journey.steps.s2.step'), title: t('landing.journey.steps.s2.title'), desc: t('landing.journey.steps.s2.desc') },
              { step: t('landing.journey.steps.s3.step'), title: t('landing.journey.steps.s3.title'), desc: t('landing.journey.steps.s3.desc') },
              { step: t('landing.journey.steps.s4.step'), title: t('landing.journey.steps.s4.title'), desc: t('landing.journey.steps.s4.desc') },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{s.step}</div>
                <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-500">{s.desc}</p>
                {i < 3 && <ChevronRight className="absolute top-8 -right-4 text-primary/20 hidden md:block" size={32} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI Tools Showcase */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto glass rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/30">
                <MessageSquare size={32} />
              </div>
              <h2 className="text-4xl font-bold mb-6">{t('landing.aiShowcase.title')} <span className="text-primary">{t('landing.aiShowcase.titleHighlight')}</span></h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('landing.aiShowcase.body')}
              </p>
              <div className="flex gap-4">
                <Button onClick={() => navigate('/ai')}>{t('landing.aiShowcase.tryAdvisor')}</Button>
                <Button variant="secondary">{t('landing.aiShowcase.watchDemo')}</Button>
              </div>
            </div>
            <div className="space-y-6">
              <GlassCard className="translate-x-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                    <Star size={20} />
                  </div>
                  <div>
                    <div className="font-bold mb-1">{t('landing.aiShowcase.cardBizTitle')}</div>
                    <p className="text-sm text-slate-500">{t('landing.aiShowcase.cardBizQuote')}</p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="-translate-x-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white shrink-0">
                    <Heart size={20} />
                  </div>
                  <div>
                    <div className="font-bold mb-1">{t('landing.aiShowcase.cardHealthTitle')}</div>
                    <p className="text-sm text-slate-500">{t('landing.aiShowcase.cardHealthQuote')}</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Energy Hub Preview */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">{t('landing.energySection.title')} <span className="text-primary">{t('landing.energySection.titleHighlight')}</span> {t('landing.energySection.titleRest')}</h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              {t('landing.energySection.body')}
            </p>
            <ul className="space-y-4 mb-8">
              {[t('landing.energySection.bullets.b1'), t('landing.energySection.bullets.b2'), t('landing.energySection.bullets.b3')].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Zap className="text-primary" size={20} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Button onClick={() => navigate('/energy')} className="bg-white text-slate-900 hover:bg-slate-100">{t('landing.energySection.cta')}</Button>
          </motion.div>
          <div className="relative">
            <div className="glass-dark p-8 rounded-[2rem] border-white/10">
              <div className="h-64 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl flex items-end p-6">
                <div className="w-full flex justify-between items-end gap-2">
                  {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      className="w-full bg-primary rounded-t-lg"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-between text-white/40 text-xs font-bold uppercase tracking-widest">
                <span>{t('months.Mon')}</span><span>{t('months.Tue')}</span><span>{t('months.Wed')}</span><span>{t('months.Thu')}</span><span>{t('months.Fri')}</span><span>{t('months.Sat')}</span><span>{t('months.Sun')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* 8. Marketplace Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('landing.marketplacePreview.title')} <span className="text-primary">{t('landing.marketplacePreview.titleHighlight')}</span></h2>
          <p className="text-slate-500">{t('landing.marketplacePreview.subtitle')}</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { name: t('landing.marketplaceDemo.p1'), price: "₹11,800", img: "https://m.media-amazon.com/images/I/31MsUvPF-CS._AC_UY436_FMwebp_QL65_.jpg" },
            { name: t('landing.marketplaceDemo.p2'), price: "₹14,102", img: "https://m.media-amazon.com/images/I/51KXnETjtgL._SX679_.jpg" },
            { name: t('landing.marketplaceDemo.p3'), price: "₹29,999", img: "https://m.media-amazon.com/images/I/61+syISwrCL._SL1210_.jpg" },
            { name: t('landing.marketplaceDemo.p4'), price: "₹4,400", img: "https://m.media-amazon.com/images/I/71vlWKh6ayL._SX679_.jpg" },
          ].map((p, i) => (
            <GlassCard key={i} className="p-0 overflow-hidden group cursor-pointer flex flex-col">
              <div className="h-48 overflow-hidden bg-white p-4">
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 mt-auto">
                <h4 className="font-bold mb-1 truncate">{p.name}</h4>
                <div className="text-primary font-bold">{p.price}</div>
              </div>
            </GlassCard>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="secondary" onClick={() => navigate('/marketplace')}>{t('landing.marketplacePreview.visit')} <ArrowRight size={18} /></Button>
        </div>
      </section>

      {/* 9. Community Preview */}
      <section className="py-24 px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                <Users size={48} />
              </div>
              <div className="aspect-square rounded-3xl bg-pink-100 flex items-center justify-center text-pink-500">
                <Heart size={48} />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-3xl bg-violet-100 flex items-center justify-center text-violet-500">
                <Globe size={48} />
              </div>
              <div className="aspect-square rounded-3xl bg-primary/20 flex items-center justify-center text-primary">
                <Zap size={48} />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold mb-6">{t('landing.community.title')} <span className="text-primary">{t('landing.community.titleHighlight')}</span></h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('landing.community.body')}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <img key={i} src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} className="w-12 h-12 rounded-full border-4 border-white" alt="" />
                ))}
              </div>
              <div className="text-sm font-bold text-slate-500">{t('landing.community.members')}</div>
            </div>
            <Button onClick={() => navigate('/community')}>{t('landing.community.cta')}</Button>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('landing.testimonials.title')} <span className="text-primary">{t('landing.testimonials.titleHighlight')}</span></h2>
          <p className="text-slate-500">{t('landing.testimonials.subtitle')}</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: t('landing.testimonials.items.t1.name'), role: t('landing.testimonials.items.t1.role'), text: t('landing.testimonials.items.t1.text') },
            { name: t('landing.testimonials.items.t2.name'), role: t('landing.testimonials.items.t2.role'), text: t('landing.testimonials.items.t2.text') },
            { name: t('landing.testimonials.items.t3.name'), role: t('landing.testimonials.items.t3.role'), text: t('landing.testimonials.items.t3.text') },
          ].map((tm, i) => (
            <GlassCard key={i} className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(j => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 italic">&quot;{tm.text}&quot;</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {tm.name[0]}
                </div>
                <div>
                  <div className="font-bold">{tm.name}</div>
                  <div className="text-xs text-slate-400">{tm.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('landing.faq.title')}</h2>
            <p className="text-slate-500">{t('landing.faq.subtitle')}</p>
          </div>
          <div className="space-y-4">
            {[
              { q: t('landing.faq.q1.q'), a: t('landing.faq.q1.a') },
              { q: t('landing.faq.q2.q'), a: t('landing.faq.q2.a') },
              { q: t('landing.faq.q3.q'), a: t('landing.faq.q3.a') },
            ].map((f, i) => (
              <GlassCard key={i} className="p-6">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <HelpCircle className="text-primary" size={20} /> {f.q}
                </h4>
                <p className="text-slate-600 text-sm">{f.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663171441121/2KBq9fLXuEdZ49RpGeTHqX/sheshark-icon-Rrb6RfnX2Hdhp7NQQUGwTz.png" 
                alt={t('nav.brandAlt')} 
                className="w-10 h-10 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-2xl font-bold text-white">SheShark</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              {t('landing.footer.blurb')}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t('landing.footer.platform')}</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">{t('nav.dashboard')}</Link></li>
              <li><Link to="/ai" className="hover:text-primary transition-colors">{t('appShell.menu.aiAssistant')}</Link></li>
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">{t('nav.marketplace')}</Link></li>
              <li><Link to="/energy" className="hover:text-primary transition-colors">{t('appShell.menu.energyHub')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t('landing.footer.community')}</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><Link to="/community" className="hover:text-primary transition-colors">{t('landing.footer.feed')}</Link></li>
              <li><Link to="/funding" className="hover:text-primary transition-colors">{t('landing.footer.grants')}</Link></li>
              <li><Link to="/learning" className="hover:text-primary transition-colors">{t('appShell.menu.learning')}</Link></li>
              <li><Link to="/safety" className="hover:text-primary transition-colors">{t('appShell.menu.safety')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t('landing.footer.download')}</h4>
            <p className="text-white/40 text-sm mb-6">{t('landing.footer.downloadBlurb')}</p>
            <a href="/Sheshark.apk" download className="btn-primary flex items-center justify-center gap-2">
              <Download size={18} /> {t('landing.footer.downloadApk')}
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs font-medium">
          <div>{t('landing.footer.rights')}</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">{t('landing.footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('landing.footer.terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('landing.footer.cookies')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
