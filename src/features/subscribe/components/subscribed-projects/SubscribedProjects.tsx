'use client';

import { ErrorHandlingWrapper } from '@/components';
import { accessTokenAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { SubscribedProjectsList } from '../subscribed-projects-list';
import { SubscribedProjectsErrorFallback } from './SubscribedProjectsErrorFallback';
import { SubscribedProjectsFallback } from './SubscribedProjectsFallback';
import { TermList } from './TermList';

export const TERM_OPTIONS = [2] as const;

export type Term = (typeof TERM_OPTIONS)[number];

export function SubscribedProjects() {
  const [selectedTerm, setSelectedTerm] = useState<Term>(2);

  const accessToken = useAtomValue(accessTokenAtom);

  const handleTermClick = (term: Term) => {
    setSelectedTerm(term);
  };
  return (
    <section className="w-full flex flex-col gap-8 pb-20">
      <TermList selectedTerm={selectedTerm} onTermClick={handleTermClick} />
      {accessToken && (
        <ErrorHandlingWrapper
          ErrorFallback={<SubscribedProjectsErrorFallback />}
          SuspenseFallback={<SubscribedProjectsFallback />}
        >
          <SubscribedProjectsList term={selectedTerm} />
        </ErrorHandlingWrapper>
      )}
    </section>
  );
}
