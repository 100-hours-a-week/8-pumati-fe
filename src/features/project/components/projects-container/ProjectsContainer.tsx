'use client';

import { CallToAction } from '@/components';
import { PROJECT_PATH } from '@/constants';
import { useRouter } from 'next/navigation';
import { useProjects } from '../../hooks';
import { CardList } from '../card-list';

type ProjectsContainerProps = {
  contextId: number;
};

export function ProjectsContainer({ contextId }: ProjectsContainerProps) {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage } = useProjects(contextId);
  const projects = data.pages.flatMap((page) => page.data);
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[25rem] mb-25">
      <h1 className="text-xl font-semibold my-9">프로젝트 둘러보기</h1>
      <CallToAction
        text="프로젝트를 생성해보세요!"
        buttonText="생성하기"
        action={() => router.push(PROJECT_PATH.NEW)}
      />
      <CardList projects={projects} />
    </div>
  );
}
