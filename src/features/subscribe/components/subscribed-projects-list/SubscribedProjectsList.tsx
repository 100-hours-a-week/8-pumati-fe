'use client';

import pumatiImg from '@/assets/images/pumati.png';
import { SpinnerIcon } from '@/components/icons';
import { PROJECT_PATH } from '@/constants';
import { useIntersectionObserve } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
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
      {projects.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 mt-10">
          <Image
            src={pumatiImg}
            alt="pumati"
            width={180}
            height={180}
            className="object-contain"
            priority
          />
          <div className="text-center">
            <p className="font-semibold">아직 구독 중인 프로젝트가 없습니다.</p>
            <p className="text-sm text-dark-grey">
              관심 있는 프로젝트를 구독하면 여기서 한눈에 모아볼 수 있어요!
            </p>
          </div>
          <Link
            href={PROJECT_PATH.ROOT}
            className="text-blue hover:underline text-sm"
          >
            프로젝트 둘러보기
          </Link>
        </div>
      ) : (
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
      )}
    </>
  );
}
