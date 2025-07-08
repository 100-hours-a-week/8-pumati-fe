'use client';

import { useSubscribedProjects } from '../../hooks/useSubscribedProjects';
import { SubscribedProjectItem } from '../subscribed-project-item';
import { Term } from '../subscribed-projects/SubscriptionProjects';

type SubscribedProjectsListProps = {
  term: Term;
};

export function SubscribedProjectsList({ term }: SubscribedProjectsListProps) {
  const { data } = useSubscribedProjects(term);
  const projects = data.pages.flatMap((page) => page.data);

  return (
    <ul className="flex flex-col gap-5 pb-20">
      {projects.map((project) => (
        <SubscribedProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
}
