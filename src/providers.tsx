'use client';

import { getQueryClient } from '@/libs/tanstack-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiProvider } from 'jotai';
import atomStore from './store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <JotaiProvider store={atomStore}>{children}</JotaiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
