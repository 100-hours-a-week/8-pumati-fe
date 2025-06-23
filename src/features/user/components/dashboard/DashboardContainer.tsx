import { ErrorBoundary } from '@/components';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { DashboardErrorFallback } from './DashboardErrorFallback';
import { DashboardFallback } from './DashboardFallback';
import { DashboardFetcher } from './DashboardFetcher';

export function DashboardContainer() {
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
