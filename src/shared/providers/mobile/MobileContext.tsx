'use client';

import { createContext, ReactNode, useContext } from 'react';

export type MobileContextValue = {
  isMobile: boolean;
};

const defaultValue: MobileContextValue = {
  isMobile: false,
};

export const MobileContext = createContext<MobileContextValue>(defaultValue);

export const useMobile = (): MobileContextValue => {
  return useContext(MobileContext);
};

export interface IMobileProviderProps {
  children: ReactNode;
  value: MobileContextValue;
}

export const MobileContextProvider = ({ children, value }: IMobileProviderProps) => {
  return <MobileContext.Provider value={value}>{children}</MobileContext.Provider>;
};
