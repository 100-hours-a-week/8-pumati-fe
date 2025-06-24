'use client';

import { ErrorHandlingWrapper } from '@/components';
import { accessTokenAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { BadgeErrorFallback } from './BadgeErrorFallback';
import { BadgeFallback } from './BadgeFallback';
import { BadgesFetcher } from './BadgesFetcher';

export function BadgesContainer() {
  const accessToken = useAtomValue(accessTokenAtom);

  if (!accessToken) return null;

  return (
    <div className="mb-12 w-full">
      <ErrorHandlingWrapper
        ErrorFallback={<BadgeErrorFallback />}
        SuspenseFallback={<BadgeFallback />}
      >
        <BadgesFetcher />
      </ErrorHandlingWrapper>
    </div>
  );
}
