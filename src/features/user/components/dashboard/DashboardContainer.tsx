'use client';

import { ErrorHandlingWrapper } from '@/components';
import { authAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { DashboardErrorFallback } from './DashboardErrorFallback';
import { DashboardFallback } from './DashboardFallback';
import { DashboardFetcher } from './DashboardFetcher';

export function DashboardContainer() {
  const authData = useAtomValue(authAtom);

  if (!authData) return null;

  return (
    <div className="mb-12 w-full">
      <ErrorHandlingWrapper
        ErrorFallback={<DashboardErrorFallback />}
        SuspenseFallback={<DashboardFallback />}
      >
        <DashboardFetcher />
      </ErrorHandlingWrapper>
    </div>
  );
}
