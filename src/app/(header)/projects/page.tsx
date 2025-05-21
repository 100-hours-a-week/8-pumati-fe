import { PROJECT_QUERY_KEY } from '@/constants/query-key';
import { ProjectsContainer } from '@/features/project/components';
import { getRankedProjects, getSnapshot } from '@/features/project/services';
import { getQueryClient } from '@/libs/tanstack-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '프로젝트 목록',
  description:
    '프로젝트 목록 페이지입니다. 품앗이에서 카테부 교육생들의 프로젝트를 확인할 수 있습니다.',
};

export default async function ProjectsPage() {
  const { id } = await getSnapshot();

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: PROJECT_QUERY_KEY.RANKED_PROJECTS,
    queryFn: () => getRankedProjects(id),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });
  return (
    <section className="flex justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectsContainer contextId={id} />
      </HydrationBoundary>
    </section>
  );
}
