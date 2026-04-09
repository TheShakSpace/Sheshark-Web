import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard, Button } from '@/components/UI';
import {
  Car,
  MapPin,
  Navigation,
  Shield,
  Star,
  Crosshair,
  Smartphone,
  Download,
  Radio,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useIsPhoneDevice } from '@/hooks/useIsPhoneDevice';
import { TaxiLiveMap } from '@/components/taxi/TaxiLiveMap';
import { taxiMapShortLabel, useTaxiMapStore } from '@/store/taxiMapStore';

type RideStatus = 'idle' | 'searching' | 'assigned' | 'in-progress';
type GpsBannerKey = 'no-browser' | 'ok' | 'denied';

const APK_HREF = '/Sheshark.apk';

const Taxi = () => {
  const { t, i18n } = useTranslation();
  const mapCenter = useTaxiMapStore((s) => s.center);
  const mapLabel = useTaxiMapStore((s) => s.label);
  const pickupShort = taxiMapShortLabel(mapLabel);
  const deviceMode = useIsPhoneDevice();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<RideStatus>('idle');
  const [gpsPosition, setGpsPosition] = useState<[number, number] | null>(null);
  const [gpsBanner, setGpsBanner] = useState<GpsBannerKey | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openGps = () => {
    setGpsBanner(null);
    if (!navigator.geolocation) {
      setGpsBanner('no-browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsPosition([pos.coords.latitude, pos.coords.longitude]);
        setGpsBanner('ok');
      },
      () => setGpsBanner('denied'),
      { enableHighAccuracy: true, timeout: 14_000, maximumAge: 0 }
    );
  };

  const gpsBannerText =
    gpsBanner === 'no-browser'
      ? t('taxi.gpsNoBrowser')
      : gpsBanner === 'ok'
        ? t('taxi.gpsOk')
        : gpsBanner === 'denied'
          ? t('taxi.gpsDenied')
          : null;

  const handleBook = () => {
    setStatus('searching');
    setTimeout(() => setStatus('assigned'), 2800);
    setTimeout(() => setStatus('in-progress'), 5600);
  };

  if (!mounted || deviceMode === 'checking') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <GlassCard className="flex items-center gap-4 px-10 py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="font-semibold text-slate-600">{t('taxi.loading')}</span>
        </GlassCard>
      </div>
    );
  }

  if (deviceMode === 'desktop') {
    return (
      <div className="space-y-8 pb-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="space-y-8">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Radio size={14} className="shrink-0" /> {t('taxi.desktopBadge')}
              </p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                {t('taxi.desktopTitle')} <span className="gradient-text">{t('taxi.desktopTitleAccent')}</span>
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: t('taxi.desktopBody') }} />
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: Crosshair, labelKey: 'taxi.chipGps' as const },
                { icon: MapPin, labelKey: 'taxi.chipReal' as const },
                { icon: Shield, labelKey: 'taxi.chipWomen' as const },
              ].map(({ icon: Icon, labelKey }) => (
                <div
                  key={labelKey}
                  className="flex items-center gap-2 rounded-2xl border border-pink-100 bg-white/80 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm"
                >
                  <Icon size={18} className="text-primary" />
                  {t(labelKey)}
                </div>
              ))}
            </div>

            <GlassCard className="border-amber-200/80 bg-gradient-to-br from-amber-50/90 to-white">
              <div className="flex gap-4">
                <div className="hidden shrink-0 sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/25 text-amber-800">
                  <Smartphone size={28} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-amber-950">{t('taxi.mobileBestTitle')}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-amber-900/90" dangerouslySetInnerHTML={{ __html: t('taxi.mobileBestBody') }} />
                  <a href={APK_HREF} download className="btn-primary mt-5 inline-flex items-center gap-2 text-base">
                    <Download size={20} /> {t('taxi.dlApk')}
                  </a>
                  <p className="mt-3 text-xs text-amber-800/70">{t('taxi.dlNote')}</p>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-primary/30 to-primary/5 blur-xl" aria-hidden />
            <div className="relative rounded-[2rem] border-4 border-slate-900 bg-slate-900 p-3 shadow-2xl">
              <div className="mb-2 flex justify-center">
                <div className="h-6 w-24 rounded-full bg-slate-800" />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <TaxiLiveMap
                  heightClass="h-[420px]"
                  mapCenter={mapCenter}
                  pickupLabel={pickupShort}
                  userPosition={gpsPosition}
                  showDriver
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> {t('taxi.livePreview')}
                </span>
                <span>{t('taxi.mapAreaOsm', { area: pickupShort })}</span>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">{t('taxi.mapFootnote')}</p>
          </div>
        </div>

        {gpsBannerText && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm font-medium text-slate-600">
            {gpsBannerText}
          </motion.p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <Button type="button" variant="secondary" className="gap-2" onClick={openGps}>
            <Crosshair size={20} /> {t('taxi.tryBrowserGps')}
          </Button>
          <a href={APK_HREF} download className="btn-secondary inline-flex items-center gap-2">
            <Download size={20} /> {t('taxi.apkDownload')}
          </a>
        </div>
      </div>
    );
  }

  /* ——— Phone layout: full taxi experience ——— */
  const rideOptions = [
    { typeKey: 'taxi.mini' as const, price: '₹189', timeKey: 'taxi.eta3' as const, seatKey: 'taxi.seats4' as const },
    { typeKey: 'taxi.plus' as const, price: '₹279', timeKey: 'taxi.eta4' as const, seatKey: 'taxi.comfort' as const },
  ];

  return (
    <div className="relative flex flex-col gap-6 lg:flex-row lg:gap-8 -mx-2 sm:mx-0">
      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:min-h-[calc(100vh-10rem)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-emerald-600/30">
            <Crosshair size={14} /> {t('taxi.phoneOpenGps')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white/90 px-3 py-1.5 text-xs font-bold text-primary">
            <Sparkles size={14} /> {t('taxi.phoneReal')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">
            <Radio size={14} className="text-emerald-400" /> {t('taxi.phoneLive')}
          </span>
        </div>

        <div className="relative min-h-[320px] flex-1 lg:min-h-0">
          <TaxiLiveMap
            className="min-h-[min(52vh,560px)] lg:min-h-full lg:h-full"
            heightClass="h-[min(52vh,560px)] lg:h-[min(70vh,640px)]"
            mapCenter={mapCenter}
            pickupLabel={pickupShort}
            userPosition={gpsPosition}
            showDriver
          />
          <div className="absolute left-3 right-3 top-3 z-[500] flex justify-between gap-2 pointer-events-none">
            <span className="pointer-events-auto rounded-xl border border-white/40 bg-slate-900/75 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {t('taxi.etaBadge')}
            </span>
            <button
              type="button"
              onClick={openGps}
              className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/30 bg-primary px-3 py-2 text-xs font-bold text-white shadow-lg"
            >
              <Crosshair size={16} /> {t('taxi.openGps')}
            </button>
          </div>
        </div>

        {gpsBannerText && (
          <p className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700">{gpsBannerText}</p>
        )}
      </div>

      <GlassCard className="flex w-full flex-col gap-5 lg:w-[400px] lg:shrink-0">
        <div>
          <h1 className="text-2xl font-bold">{t('taxi.sheetTitle')}</h1>
          <p className="text-sm text-slate-500">{t('taxi.sheetSub')}</p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input
              key={`${mapLabel}-${i18n.language}`}
              type="text"
              readOnly
              value={mapLabel}
              className="w-full cursor-default glass pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none"
              aria-label={t('taxi.pickupLabel')}
            />
          </div>
          <div className="relative">
            <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('taxi.whereTo')}
              className="w-full glass pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('taxi.chooseRide')}</h4>
          {rideOptions.map((ride) => (
            <button
              key={ride.typeKey}
              type="button"
              className="flex w-full items-center justify-between rounded-2xl border-2 border-transparent p-4 text-left transition-all hover:border-primary/25 hover:bg-primary/[0.06]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/12 p-3 text-primary">
                  <Car size={20} />
                </div>
                <div>
                  <div className="font-bold">{t(ride.typeKey)}</div>
                  <div className="text-xs text-slate-400">
                    {t(ride.timeKey)} · {t(ride.seatKey)}
                  </div>
                </div>
              </div>
              <div className="font-bold text-primary">{ride.price}</div>
            </button>
          ))}
        </div>

        <div className="flex items-start gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
          <Lock size={16} className="mt-0.5 shrink-0 text-primary" />
          <span dangerouslySetInnerHTML={{ __html: t('taxi.tripShare') }} />
        </div>

        <Button onClick={handleBook} disabled={status !== 'idle'} className="w-full py-4 text-base">
          {status === 'idle' ? t('taxi.bookSafe') : status === 'searching' ? t('taxi.matching') : t('taxi.booking')}
        </Button>

        <a
          href={APK_HREF}
          download
          className="flex items-center justify-center gap-2 rounded-full border border-pink-200 py-3 text-sm font-bold text-primary hover:bg-accent transition-colors"
        >
          <Download size={18} /> {t('taxi.updateApk')}
        </a>
      </GlassCard>

      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-4 right-4 z-[600] lg:absolute lg:inset-x-auto lg:bottom-8 lg:left-8 lg:right-8 lg:w-[calc(100%-4rem)]"
          >
            <GlassCard className="flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                  <Car size={26} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {status === 'searching'
                      ? t('taxi.statusSearching')
                      : status === 'assigned'
                        ? t('taxi.statusAssigned')
                        : t('taxi.statusEnRoute')}
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {status === 'searching'
                      ? t('taxi.findingPartner')
                      : status === 'assigned'
                        ? t('taxi.driverAssigned')
                        : t('taxi.headingDrop')}
                  </div>
                </div>
              </div>
              {status !== 'searching' && (
                <div className="hidden items-center gap-1 rounded-xl bg-amber-100 px-3 py-1.5 text-amber-800 sm:flex">
                  <Star size={16} className="fill-amber-500 text-amber-500" /> 4.97
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Taxi;
