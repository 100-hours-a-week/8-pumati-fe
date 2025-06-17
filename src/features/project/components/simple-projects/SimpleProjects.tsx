'use client';

import { Button } from '@/components';
import { PROJECT_PATH } from '@/constants';
import { useRouter } from 'next/navigation';
import { ProjectItem } from '../../schemas';
import { SimpleCardList } from '../simple-card-list/SimpleCardList';

type SimpleCardListProps = {
  projects: ProjectItem[];
};

export function SimpleProjects({ projects }: SimpleCardListProps) {
  const router = useRouter();

  const handleBrowseProjectsClick = () => {
    router.push(PROJECT_PATH.ROOT);
  };
  return (
    <article className="w-full max-w-[25rem] mx-auto my-10">
      <div className="flex flex-col gap-2 mb-4 text-center">
        <h2 className="text-2xl font-bold">
          품앗이 상위 <span className="text-blue">TOP3</span> 프로젝트
        </h2>
        <p className="font-medium text-dark-grey mb-4">
          <span className="text-blue font-semibold">품앗이</span>를 많이 할수록{' '}
          <br />
          우리 팀의 프로젝트가 상단에 노출돼요!
        </p>
      </div>
      <SimpleCardList projects={projects} />
      <Button
        className="mt-6"
        type="button"
        onClick={handleBrowseProjectsClick}
      >
        프로젝트 둘러보기
      </Button>
    </article>
  );
}
