import { METADATA } from '@/constants';
import {
  ProjectsFallback,
  ProjectsFetcher,
} from '@/features/project/components';
import { getSnapshot } from '@/features/project/services';
import { ApiError } from '@/utils/error';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = METADATA.PROJECTS;

export default async function ProjectsPage() {
  const snapshot = await getSnapshot();

  if (!snapshot) {
    throw new ApiError(404, 'Snapshot not found');
  }
  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-[25rem]">
        <h1 className="text-xl font-semibold my-9">프로젝트 둘러보기</h1>
        <Suspense fallback={<ProjectsFallback />}>
          <ProjectsFetcher contextId={snapshot.id} />
        </Suspense>
      </div>
    </section>
  );
}
