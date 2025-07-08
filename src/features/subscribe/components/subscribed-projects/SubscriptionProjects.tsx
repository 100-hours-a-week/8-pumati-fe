'use client';

import { accessTokenAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { SubscribedProjectsList } from '../subscribed-projects-list';
import { TermList } from './TermList';

export const TERM_OPTIONS = [2, 3, 100000, 100300, 10001, 2000, 400] as const;

export type Term = (typeof TERM_OPTIONS)[number];

export function SubscribedProjects() {
  const [selectedTerm, setSelectedTerm] = useState<Term>(2);

  const accessToken = useAtomValue(accessTokenAtom);

  const handleTermClick = (term: Term) => {
    setSelectedTerm(term);
  };
  return (
    <section className="w-full">
      <TermList selectedTerm={selectedTerm} onTermClick={handleTermClick} />
      {accessToken && <SubscribedProjectsList term={selectedTerm} />}
    </section>
  );
}
