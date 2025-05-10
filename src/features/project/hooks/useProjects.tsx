import { PROJECT_QUERY_KEY } from '@/constants/query-key';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ProjectInfiniteScrollResponse } from '../schemas';
import { getProjects } from '../services';

export function useProjects(contextId: number) {
  return useSuspenseInfiniteQuery<ProjectInfiniteScrollResponse>({
    queryKey: PROJECT_QUERY_KEY.PROJECTS,
    queryFn: ({ pageParam }) =>
      getProjects('rank', contextId, pageParam as number),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.meta.nextCursorId,
  });
}
