'use client';

import { ErrorBoundary } from '@/components';
import { authAtom } from '@/store/atoms';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { DashboardErrorFallback } from './DashboardErrorFallback';
import { DashboardFallback } from './DashboardFallback';
import { DashboardFetcher } from './DashboardFetcher';

export function DashboardContainer() {
  const authData = useAtomValue(authAtom);

  if (!authData) return null;

  return (
    <div className="mb-12 w-full">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={<DashboardErrorFallback />} onReset={reset}>
            <Suspense fallback={<DashboardFallback />}>
              <DashboardFetcher />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
