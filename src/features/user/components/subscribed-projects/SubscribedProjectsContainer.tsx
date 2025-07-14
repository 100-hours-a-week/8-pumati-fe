'use client';

import { ErrorHandlingWrapper } from '@/components';
import {
  SubscribedProjectsErrorFallback,
  SubscribedProjectsFallback,
} from '@/features/subscribe/components';
import { authAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import BrowseSubscribedProjectsButton from './BrowseSubscribedProjectsButton';
import { SubscribedProjects } from './SubscribedProjects';

export function SubscribedProjectsContainer() {
  const authData = useAtomValue(authAtom);

  if (!authData) return null;

  return (
    <div className="mb-12 w-full">
      <div className="flex justify-between items-end w-full mb-4">
        <h2 className="text-lg font-semibold">구독 프로젝트</h2>
        <BrowseSubscribedProjectsButton />
      </div>
      <ErrorHandlingWrapper
        ErrorFallback={<SubscribedProjectsErrorFallback />}
        SuspenseFallback={<SubscribedProjectsFallback itemCount={3} />}
      >
        <SubscribedProjects />
      </ErrorHandlingWrapper>
    </div>
  );
}
