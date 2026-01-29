'use client';

import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ToastContainer } from 'react-toastify';
import { MobileProvider } from '@/shared/providers';
import { theme } from '@/shared/theme';
import { store } from '@/shared/store';
import { getQueryClient } from '@/shared/api';

export const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <AppRouterCacheProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <MobileProvider>
              {children}
              <ToastContainer />
            </MobileProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </AppRouterCacheProvider>
  );
};
