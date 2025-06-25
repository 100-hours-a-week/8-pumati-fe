'use client';

import { revalidateRankedProjects, revalidateSnapshot } from '@/actions';
import { Button, SkeletonBox } from '@/components';

export function RankedProjectsErrorFallback() {
  const handleReset = async () => {
    await revalidateSnapshot();
    revalidateRankedProjects();
  };

  return (
    <div className="relative w-full max-w-[25rem] mx-auto my-10">
      <div className="flex flex-col gap-2 mb-4 text-center">
        <h2 className="text-2xl font-bold">
          품앗이 상위 <span className="text-blue">TOP3</span> 프로젝트
        </h2>
        <p className="font-medium text-dark-grey mb-4">
          지금 커뮤니티에서 <br />
          가장 활발한 프로젝트들을 소개할게요!
        </p>
      </div>
      <ul className="flex flex-col gap-5 blur-xs">
        {Array.from({ length: 3 }, (_, index) => (
          <li
            key={index}
            className="flex flex-col gap-2 px-4 py-3 rounded-lg bg-light-grey"
          >
            <div className="flex gap-4">
              <SkeletonBox className="aspect-square xs:aspect-[16/9] h-18 shrink-0 w-fit" />
              <div className="grow flex flex-col gap-1">
                <SkeletonBox className="h-7" />
                <SkeletonBox className="h-5" />
              </div>
            </div>
            <ul className="flex gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index}>
                  <SkeletonBox className="w-16 h-8 rounded-full" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
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
    </div>
  );
}
