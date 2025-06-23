'use client';

import { ErrorBoundary } from '@/components';
import { accessTokenAtom } from '@/store/atoms';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { BadgeErrorFallback } from './BadgeErrorFallback';
import { BadgeFallback } from './BadgeFallback';
import { BadgesFetcher } from './BadgesFetcher';

export function BadgesContainer() {
  const accessToken = useAtomValue(accessTokenAtom);

  if (!accessToken) return null;

  return (
    <div className="mb-12 w-full">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={<BadgeErrorFallback />} onReset={reset}>
            <Suspense fallback={<BadgeFallback />}>
              <BadgesFetcher />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
