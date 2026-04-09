import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlassCard, Button } from '@/components/UI';
import { User, Mail, Shield, Bell, CreditCard, LogOut, Camera, Edit2, MapPin, Search } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { auth } from '@/lib/firebase';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { taxiMapShortLabel, useTaxiMapStore } from '@/store/taxiMapStore';

const Profile = () => {
  const { user } = useStore();
  const { t } = useTranslation();
  const mapCenter = useTaxiMapStore((s) => s.center);
  const mapLabel = useTaxiMapStore((s) => s.label);
  const setFromSearch = useTaxiMapStore((s) => s.setFromSearch);
  const resetToGreaterNoida = useTaxiMapStore((s) => s.resetToGreaterNoida);

  const [placeQuery, setPlaceQuery] = useState('');
  const [latStr, setLatStr] = useState('');
  const [lngStr, setLngStr] = useState('');
  const [coordName, setCoordName] = useState('');
  const [preview, setPreview] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoErr, setGeoErr] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  const runGeocode = async () => {
    setGeoErr(null);
    setPreview(null);
    const q = placeQuery.trim();
    if (q.length < 2) return;
    setGeoLoading(true);
    try {
      const r = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      const data = (await r.json()) as { lat?: number; lng?: number; label?: string; error?: string };
      if (!r.ok) {
        setGeoErr(r.status === 404 ? t('profile.taxiMapNoResults') : t('profile.taxiMapGeocodeErr'));
        return;
      }
      if (typeof data.lat !== 'number' || typeof data.lng !== 'number' || !data.label) {
        setGeoErr(t('profile.taxiMapGeocodeErr'));
        return;
      }
      setPreview({ lat: data.lat, lng: data.lng, label: data.label });
    } catch {
      setGeoErr(t('profile.taxiMapGeocodeErr'));
    } finally {
      setGeoLoading(false);
    }
  };

  const savePreview = () => {
    if (!preview) return;
    setFromSearch(preview.lat, preview.lng, preview.label);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2200);
  };

  const applyManualCoords = () => {
    setGeoErr(null);
    const lat = Number.parseFloat(latStr);
    const lng = Number.parseFloat(lngStr);
    if (
      Number.isNaN(lat) ||
      Number.isNaN(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      setGeoErr(t('profile.taxiMapInvalidCoords'));
      return;
    }
    const label = coordName.trim() || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    setFromSearch(lat, lng, label);
    setPreview({ lat, lng, label });
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold">{t('profile.title')}</h1>
        <Button variant="secondary" icon={Edit2}>
          {t('profile.edit')}
        </Button>
      </div>

      <GlassCard className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
            <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} alt="" className="w-full h-full object-cover" />
          </div>
          <button type="button" className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
            <Camera size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold">{user?.displayName}</h2>
          <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
            <Mail size={16} /> {user?.email}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            {user?.role === 'business' && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">{t('profile.businessBadge')}</span>
            )}
            {user?.role === 'customer' && (
              <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full">{t('profile.customerBadge')}</span>
            )}
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{t('profile.solarEntrepreneur')}</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">{t('profile.verifiedMember')}</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-xs font-bold rounded-full">{t('profile.topContributor')}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <div className="glass p-4 text-center">
            <div className="text-2xl font-bold text-primary">1,250</div>
            <div className="text-xs text-slate-400 font-bold uppercase">{t('profile.sharkPoints')}</div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="space-y-4">
        <h3 className="text-xl font-bold">{t('profile.settingsLanguage')}</h3>
        <p className="text-sm text-slate-600">{t('profile.settingsLanguageSub')}</p>
        <LanguageSwitcher variant="settings" />
      </GlassCard>

      <GlassCard className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MapPin size={22} className="text-primary shrink-0" /> {t('profile.taxiMapTitle')}
        </h3>
        <p className="text-sm text-slate-600">{t('profile.taxiMapSub')}</p>
        <p className="text-xs text-slate-500">
          {t('profile.taxiMapCurrent')}: <strong>{taxiMapShortLabel(mapLabel)}</strong> ({mapCenter[0].toFixed(4)}°,{" "}
          {mapCenter[1].toFixed(4)}°) ·{" "}
          <Link to="/taxi" className="font-semibold text-primary hover:underline">
            Taxi
          </Link>
        </p>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">{t('profile.taxiMapSearchBtn')}</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={placeQuery}
              onChange={(e) => setPlaceQuery(e.target.value)}
              placeholder={t('profile.taxiMapSearchPh')}
              className="flex-1 glass rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
            />
            <Button
              type="button"
              variant="secondary"
              icon={Search}
              className="rounded-2xl shrink-0"
              loading={geoLoading}
              disabled={placeQuery.trim().length < 2}
              onClick={runGeocode}
            >
              {t('profile.taxiMapSearchBtn')}
            </Button>
          </div>
        </div>

        {preview && (
          <div className="rounded-2xl border border-pink-100 bg-pink-50/40 px-4 py-3 text-sm space-y-2">
            <div className="font-medium text-slate-800">{preview.label}</div>
            <div className="text-xs text-slate-500 tabular-nums">
              {preview.lat.toFixed(5)}, {preview.lng.toFixed(5)}
            </div>
            <Button type="button" className="rounded-2xl text-sm py-2" onClick={savePreview}>
              {t('profile.taxiMapSaveSearch')}
            </Button>
          </div>
        )}

        <div className="border-t border-slate-100 pt-4 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {t('profile.taxiMapLatPh')} / {t('profile.taxiMapLngPh')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={latStr}
              onChange={(e) => setLatStr(e.target.value)}
              placeholder={t('profile.taxiMapLatPh')}
              className="glass rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
            />
            <input
              type="text"
              inputMode="decimal"
              value={lngStr}
              onChange={(e) => setLngStr(e.target.value)}
              placeholder={t('profile.taxiMapLngPh')}
              className="glass rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
            />
          </div>
          <input
            type="text"
            value={coordName}
            onChange={(e) => setCoordName(e.target.value)}
            placeholder={t('profile.taxiMapLabelOptional')}
            className="w-full glass rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
          <Button type="button" variant="secondary" className="rounded-2xl" onClick={applyManualCoords}>
            {t('profile.taxiMapApplyCoords')}
          </Button>
        </div>

        {geoErr && <p className="text-sm text-red-600 font-medium">{geoErr}</p>}
        {savedFlash && <p className="text-sm font-semibold text-emerald-600">{t('profile.taxiMapSaved')}</p>}

        <button
          type="button"
          onClick={() => {
            resetToGreaterNoida();
            setPreview(null);
            setPlaceQuery('');
            setLatStr('');
            setLngStr('');
            setCoordName('');
            setGeoErr(null);
            setSavedFlash(true);
            window.setTimeout(() => setSavedFlash(false), 2200);
          }}
          className="text-sm font-bold text-slate-500 hover:text-primary underline underline-offset-2"
        >
          {t('profile.taxiMapReset')}
        </button>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Shield size={20} className="text-primary" /> {t('profile.security')}
          </h3>
          <div className="space-y-4">
            {[
              { label: t('profile.twoFactor'), status: t('profile.enabled') },
              { label: t('profile.dataSharing'), status: t('profile.restricted') },
              { label: t('profile.profileVisibility'), status: t('profile.public') },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="text-xs font-bold text-primary">{item.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Bell size={20} className="text-primary" /> {t('profile.notifications')}
          </h3>
          <div className="space-y-4">
            {[
              { label: t('profile.emailNotif'), status: t('profile.on') },
              { label: t('profile.pushNotif'), status: t('profile.on') },
              { label: t('profile.marketing'), status: t('profile.off') },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="text-xs font-bold text-primary">{item.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="md:col-span-2 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 rounded-xl text-slate-600">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="font-bold">{t('profile.paymentMethods')}</h4>
              <p className="text-sm text-slate-500">{t('profile.paymentSub')}</p>
            </div>
          </div>
          <Button variant="secondary">{t('profile.manage')}</Button>
        </GlassCard>
      </div>

      <div className="flex justify-center pt-8">
        <button
          type="button"
          onClick={() => auth.signOut()}
          className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-8 py-4 rounded-2xl transition-all"
        >
          <LogOut size={20} /> {t('profile.signOutDevices')}
        </button>
      </div>
    </div>
  );
};

export default Profile;
