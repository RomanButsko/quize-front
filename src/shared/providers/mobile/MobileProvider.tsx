'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { MobileContextProvider } from './MobileContext';

export interface IMobileProviderProps {
  children: ReactNode;
  breakpointPx?: number;
}

const isUserAgentMobile = (ua: string): boolean => {
  const l = ua.toLowerCase();
  return /iphone|ipad|ipod|android|mobile/.test(l);
};

export const MobileProvider = ({ children, breakpointPx = 768 }: IMobileProviderProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const uaMobile = isUserAgentMobile(navigator.userAgent);
    const mq = window.matchMedia?.(`(max-width: ${breakpointPx}px)`);

    const compute = () => {
      const widthMobile = mq ? mq.matches : false;
      setIsMobile(Boolean(uaMobile || widthMobile));
    };

    compute();
    mq?.addEventListener?.('change', compute);
    window.addEventListener('resize', compute);
    return () => {
      mq?.removeEventListener?.('change', compute);
      window.removeEventListener('resize', compute);
    };
  }, [breakpointPx]);

  const value = useMemo(() => ({ isMobile }), [isMobile]);
  return <MobileContextProvider value={value}>{children}</MobileContextProvider>;
};
