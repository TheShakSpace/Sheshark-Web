import { useEffect, useState } from 'react';

type DeviceMode = 'checking' | 'phone' | 'desktop';

/**
 * “Phone” = small mobile browser where full GPS / taxi UX is intended.
 * Tablets & desktop get the APK / web-preview messaging.
 */
export function useIsPhoneDevice(): DeviceMode {
  const [mode, setMode] = useState<DeviceMode>('checking');

  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isPhone =
      /iPhone|iPod/i.test(ua) ||
      /Android.+Mobile/i.test(ua) ||
      /webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    setMode(isPhone ? 'phone' : 'desktop');
  }, []);

  return mode;
}
