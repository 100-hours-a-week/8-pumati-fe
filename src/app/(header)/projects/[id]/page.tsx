import { COMMENT_QUERY_KEY } from '@/constants/query-key';
import { ProjectDetailContainer } from '@/features/project/components';
import { getComments, getProject } from '@/features/project/services';
import { getQueryClient } from '@/libs/tanstack-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProject(Number(id));

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: COMMENT_QUERY_KEY.COMMENTS(Number(id)),
    queryFn: ({ pageParam }) =>
      getComments(Number(id), pageParam.nextCursorTime, pageParam.nextCursorId),
    staleTime: 1000 * 60,
    initialPageParam: {
      nextCursorId: 0,
      nextCursorTime: undefined,
    },
  });

  if (!project) {
    notFound();
  }
  return (
    <section className="pb-25">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectDetailContainer project={project} />
      </HydrationBoundary>
    </section>
  );
}
