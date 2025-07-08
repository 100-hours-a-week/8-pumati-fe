'use client';

import { accessTokenAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { Suspense, useState } from 'react';
import { SubscribedProjectsList } from '../subscribed-projects-list';
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
        <Suspense fallback={<SubscribedProjectsFallback />}>
          <SubscribedProjectsList term={selectedTerm} />
        </Suspense>
      )}
    </section>
  );
}
