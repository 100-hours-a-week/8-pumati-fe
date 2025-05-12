import { PROJECT_QUERY_KEY } from '@/constants/query-key';
import { ProjectsContainer } from '@/features/project/components';
import { getRankedProjects, getSnapshot } from '@/features/project/services';
import { getQueryClient } from '@/libs/tanstack-query';

export const dynamic = 'force-dynamic';

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
      <ProjectsContainer contextId={id} />
    </section>
  );
}
