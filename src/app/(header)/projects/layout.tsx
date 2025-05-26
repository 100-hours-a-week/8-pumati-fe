import { ProjectsFallback } from '@/features/project/components';
import { Suspense } from 'react';

export default function ProjectsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-[25rem]">
        <h1 className="text-xl font-semibold my-9">프로젝트 둘러보기</h1>
        <Suspense fallback={<ProjectsFallback />}>{children}</Suspense>
      </div>
    </section>
  );
}
