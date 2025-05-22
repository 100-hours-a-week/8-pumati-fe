import { COMMENT_QUERY_KEY } from '@/constants/query-key';
import { getComments } from '@/features/comment/services';
import { ProjectDetailContainer } from '@/features/project/components';
import { getProject } from '@/features/project/services';
import { getQueryClient } from '@/libs/tanstack-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

const getProjectData = cache(async (projectId: string) =>
  getProject(Number(projectId)),
);

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectData(id);

  return {
    title: project?.title,
    description: project?.introduction,
    openGraph: {
      title: project?.title,
      description: project?.introduction,
    },
    twitter: {
      card: 'summary_large_image',
      title: project?.title,
      description: project?.introduction,
      images: ['/opengraph-image.png'],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectData(id);

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: COMMENT_QUERY_KEY.COMMENTS(Number(id)),
    queryFn: ({ pageParam }) =>
      getComments(Number(id), pageParam.nextCursorTime, pageParam.nextCursorId),
    staleTime: 1000 * 60,
    initialPageParam: {
      nextCursorId: 0,
      nextCursorTime: null,
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
