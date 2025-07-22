'use client';

import { ErrorHandlingWrapper } from '@/components';
import { accessTokenAtom, authAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { BadgeErrorFallback } from './BadgeErrorFallback';
import { BadgeFallback } from './BadgeFallback';
import { BadgesFetcher } from './BadgesFetcher';

export function BadgesContainer() {
  const authData = useAtomValue(authAtom);
  const accessToken = useAtomValue(accessTokenAtom);

  if (!accessToken || !authData) return null;

  const isTrainee = authData && authData.course;

  return (
    isTrainee && (
      <div className="mb-12 w-full">
        <ErrorHandlingWrapper
          ErrorFallback={<BadgeErrorFallback />}
          SuspenseFallback={<BadgeFallback />}
        >
          <BadgesFetcher />
        </ErrorHandlingWrapper>
      </div>
    )
  );
}
