import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** Default map focus: Greater Noida (not Delhi). */
export const TAXI_MAP_DEFAULT_CENTER: [number, number] = [28.4744, 77.504];
export const TAXI_MAP_DEFAULT_LABEL = 'Greater Noida, Uttar Pradesh, India';

type TaxiMapState = {
  center: [number, number];
  label: string;
  setFromSearch: (lat: number, lng: number, label: string) => void;
  resetToGreaterNoida: () => void;
};

export const useTaxiMapStore = create<TaxiMapState>()(
  persist(
    (set) => ({
      center: TAXI_MAP_DEFAULT_CENTER,
      label: TAXI_MAP_DEFAULT_LABEL,
      setFromSearch: (lat, lng, label) =>
        set({
          center: [lat, lng],
          label: label.trim() || TAXI_MAP_DEFAULT_LABEL,
        }),
      resetToGreaterNoida: () =>
        set({
          center: TAXI_MAP_DEFAULT_CENTER,
          label: TAXI_MAP_DEFAULT_LABEL,
        }),
    }),
    { name: 'sheshark-taxi-map-v1' }
  )
);

/** Short place line for compact UI (first comma segment). */
export function taxiMapShortLabel(full: string): string {
  const s = full.split(',')[0]?.trim();
  return s || full;
}
