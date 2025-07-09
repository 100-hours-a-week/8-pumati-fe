'use client';

import { SubscribedProjectItem, Term } from '@/features/subscribe/components';
import { useSubscribedProjects } from '@/features/subscribe/hooks';
import { authAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';

export function SubscribedProjects() {
  const authData = useAtomValue(authAtom);

  const { data } = useSubscribedProjects(authData!.term as Term, 3);
  const projects = data.pages.flatMap((page) => page.data);
  return (
    <ul className="flex flex-col gap-5">
      {projects.map((project) => (
        <SubscribedProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
}
