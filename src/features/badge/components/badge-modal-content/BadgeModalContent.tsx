'use client';

import { SpinnerIcon } from '@/components/icons';
import { useIntersectionObserve } from '@/hooks';
import { Badge } from '../../schemas';
import { BadgeList } from '../badge-list';

type BadgeModalContentProps = {
  badges: Badge[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export function BadgeModalContent({
  badges,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: BadgeModalContentProps) {
  const ref = useIntersectionObserve({
    onIntersect: (entry, observer) => {
      observer.unobserve(entry.target);

      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });
  return (
    <div className="my-4">
      <h2 className="text-lg text-center mb-4 font-semibold">내가 모은 뱃지</h2>
      <div className="overflow-auto max-h-[300px] bg-light-grey p-4 rounded-xl">
        <BadgeList badges={badges} />
        <div ref={ref}>
          {isFetchingNextPage && (
            <div className="flex justify-center items-center gap-2 h-12 text-blue">
              <SpinnerIcon
                width={20}
                height={20}
                className="animate-spin"
                fill="var(--color-blue)"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
