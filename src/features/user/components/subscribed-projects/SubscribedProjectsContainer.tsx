'use client';

import { ErrorHandlingWrapper } from '@/components';
import {
  SubscribedProjectsErrorFallback,
  SubscribedProjectsFallback,
} from '@/features/subscribe/components';
import { authAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { SubscribedProjects } from './SubscribedProjects';

export function SubscribedProjectsContainer() {
  const authData = useAtomValue(authAtom);

  if (!authData) return null;

  return (
    <div className="mb-12 w-full">
      <ErrorHandlingWrapper
        ErrorFallback={<SubscribedProjectsErrorFallback />}
        SuspenseFallback={<SubscribedProjectsFallback itemCount={3} />}
      >
        <SubscribedProjects />
      </ErrorHandlingWrapper>
    </div>
  );
}
