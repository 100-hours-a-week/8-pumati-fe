import { SpinnerIcon } from '@/components/icons';
import { cn } from '@/utils/style';
import { RefObject } from 'react';
import { ProjectItem } from '../../schemas';
import { CardItem } from '../card-item';

type CardListProps = {
  ref: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
  projects: ProjectItem[];
};

export function CardList({ ref, isFetchingNextPage, projects }: CardListProps) {
  return (
    <article className="w-full">
      <ul
        className={cn(
          'flex flex-col gap-5',
          isFetchingNextPage ? 'mb-8' : 'mb-20',
        )}
      >
        {projects.map((project) => (
          <CardItem key={project.id} project={project} />
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
    </article>
  );
}
