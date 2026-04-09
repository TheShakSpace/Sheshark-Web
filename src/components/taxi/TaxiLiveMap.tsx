import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';

// Re-export for any legacy imports
export { TAXI_MAP_DEFAULT_CENTER, TAXI_MAP_DEFAULT_LABEL } from '@/store/taxiMapStore';

function pinIcon(color: string, border = '#fff') {
  return L.divIcon({
    className: 'sheshark-leaflet-pin',
    html: `<div style="width:18px;height:18px;background:${color};border:3px solid ${border};border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,.4);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function MapFlyTo({ center, zoom = 16 }: { center: [number, number] | null; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (!center) return;
    map.flyTo(center, zoom, { duration: 1.15 });
  }, [center, zoom, map]);
  return null;
}

export interface TaxiLiveMapProps {
  className?: string;
  heightClass?: string;
  /** Map centre & pickup pin (from settings / default Greater Noida). */
  mapCenter: [number, number];
  pickupLabel: string;
  userPosition?: [number, number] | null;
  showDriver?: boolean;
}

function offsetDriver(from: [number, number]): [number, number] {
  return [from[0] + 0.0038, from[1] + 0.0055];
}

export const TaxiLiveMap: React.FC<TaxiLiveMapProps> = ({
  className,
  heightClass = 'h-[min(55vh,520px)]',
  mapCenter,
  pickupLabel,
  userPosition,
  showDriver = true,
}) => {
  const { t } = useTranslation();
  const pickupIcon = useMemo(() => pinIcon('#d9468c'), []);
  const driverIcon = useMemo(() => pinIcon('#0d9488'), []);
  const userGpsIcon = useMemo(() => pinIcon('#2563eb', '#fff'), []);

  const driverPos = useMemo(() => offsetDriver(mapCenter), [mapCenter]);
  const accuracyM = 42;
  const mapKey = `${mapCenter[0].toFixed(5)}-${mapCenter[1].toFixed(5)}`;

  return (
    <div className={cn('relative rounded-2xl overflow-hidden border border-pink-100/80 shadow-2xl', heightClass, className)}>
      <MapContainer
        key={mapKey}
        center={mapCenter}
        zoom={14}
        scrollWheelZoom
        className={cn('h-full w-full z-0 [&_.leaflet-control-attribution]:text-[10px] [&_.leaflet-control-attribution]:bg-white/90')}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFlyTo center={userPosition} zoom={16} />
        {userPosition && (
          <>
            <Circle
              center={userPosition}
              radius={accuracyM}
              pathOptions={{ color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.12, weight: 1 }}
            />
            <Marker position={userPosition} icon={userGpsIcon}>
              <Popup>{t('taxi.mapYou')}</Popup>
            </Marker>
          </>
        )}
        <Marker position={mapCenter} icon={pickupIcon}>
          <Popup>
            {t('taxi.mapPickupAt', { place: pickupLabel })}
          </Popup>
        </Marker>
        {showDriver && (
          <Marker position={driverPos} icon={driverIcon}>
            <Popup>{t('taxi.mapDriver')}</Popup>
          </Marker>
        )}
      </MapContainer>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent z-[400]" />
    </div>
  );
};
