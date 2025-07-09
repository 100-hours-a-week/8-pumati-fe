'use client';

import { SpinnerIcon } from '@/components/icons';
import { useIntersectionObserve } from '@/hooks';
import { useSubscribedProjects } from '../../hooks/useSubscribedProjects';
import { SubscribedProjectItem } from '../subscribed-project-item';
import { Term } from '../subscribed-projects/SubscribedProjects';

type SubscribedProjectsListProps = {
  term: Term;
};

export function SubscribedProjectsList({ term }: SubscribedProjectsListProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSubscribedProjects(term);
  const projects = data.pages.flatMap((page) => page.data);

  const ref = useIntersectionObserve({
    onIntersect: (entry, observer) => {
      observer.unobserve(entry.target);

      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });
  return (
    <>
      <ul className="flex flex-col gap-5">
        {projects.map((project) => (
          <SubscribedProjectItem key={project.id} project={project} />
        ))}
      </ul>
      <div ref={ref}>
        {isFetchingNextPage && (
          <div className="flex justify-center items-center gap-2 h-12 bg-blue-white text-blue">
            <SpinnerIcon
              width={20}
              height={20}
              className="animate-spin"
              fill="var(--color-blue)"
            />
            <p>잠시만 기다려주세요...</p>
          </div>
        )}
      </div>
    </>
  );
}
