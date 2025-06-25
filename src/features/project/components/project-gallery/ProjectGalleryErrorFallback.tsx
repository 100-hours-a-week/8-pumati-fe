'use client';

import { revalidateLatestProjects } from '@/actions';
import { Button, SkeletonBox } from '@/components';

export function ProjectGalleryErrorFallback() {
  const handleReset = async () => {
    revalidateLatestProjects();
  };

  return (
    <section className="relative flex flex-col gap-4 mx-auto my-10 max-w-[25rem] w-full">
      <div className="text-center">
        <h2 className="text-lg font-semibold">작은 아이디어가 현실로!</h2>
        <p className="text-sm text-dark-grey">
          교육생들의 프로젝트를 구경해보세요.
        </p>
      </div>
      <div className="mb-4 mt-6 blur-xs">
        <div className="flex flex-col rounded-lg h-fit bg-light-grey overflow-hidden">
          <SkeletonBox className="aspect-[16/9]" />
          <div className="px-4 pt-2 pb-4">
            <SkeletonBox className="h-7" />
            <SkeletonBox className="mt-1 h-6" />
            <ul className="flex gap-2 mt-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index}>
                  <SkeletonBox className="w-16 h-8 rounded-full" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl font-bold">잠시후 다시 시도해주세요</p>
          <p className="text-center text-sm text-dark-grey font-semibold">
            요청사항을 처리하는데
            <br />
            실패했습니다.
          </p>
        </div>
        <Button type="button" size="md" onClick={handleReset}>
          다시 시도
        </Button>
      </div>
    </section>
  );
}
