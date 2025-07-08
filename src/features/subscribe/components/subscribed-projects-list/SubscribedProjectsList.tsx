'use client';

import { useSubscribedProjects } from '../../hooks/useSubscribedProjects';
import { Term } from '../subscribed-projects/SubscriptionProjects';

type SubscribedProjectsListProps = {
  term: Term;
};

export function SubscribedProjectsList({ term }: SubscribedProjectsListProps) {
  const { data: projects } = useSubscribedProjects(term);

  console.log(projects);
  return <div>SubscribedProjectsList</div>;
}
