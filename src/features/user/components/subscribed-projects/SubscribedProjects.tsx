'use client';

import { PROJECT_PATH } from '@/constants';
import { SubscribedProjectItem, Term } from '@/features/subscribe/components';
import { useSubscribedProjects } from '@/features/subscribe/hooks';
import { authAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import BrowseSubscribedProjectsButton from './BrowseSubscribedProjectsButton';

export function SubscribedProjects() {
  const authData = useAtomValue(authAtom);

  const { data } = useSubscribedProjects(authData!.term as Term, 3);
  const projects = data.pages.flatMap((page) => page.data).slice(0, 3);

  const hasSubscribedProjects = projects.length > 0;
  return (
    <>
      <div className="flex justify-between items-end w-full mb-4">
        <h2 className="text-lg font-semibold">구독 프로젝트</h2>
        {hasSubscribedProjects && <BrowseSubscribedProjectsButton />}
      </div>
      {!hasSubscribedProjects ? (
        <div className="flex flex-col items-center justify-center gap-2 py-4 text-sm text-dark-grey">
          <p className="font-semibold">아직 구독 중인 프로젝트가 없어요!</p>
          <Link
            href={PROJECT_PATH.ROOT}
            className="text-blue hover:underline cursor-pointer"
          >
            프로젝트 둘러보기
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-5">
          {projects.map((project) => (
            <SubscribedProjectItem key={project.id} project={project} />
          ))}
        </ul>
      )}
    </>
  );
}
