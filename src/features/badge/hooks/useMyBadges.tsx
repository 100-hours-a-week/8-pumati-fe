import { USER_QUERY_KEY } from '@/constants/query-key';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyBadges } from '../services';

export function useMyBadges(token: string | null) {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEY.BADGES,
    queryFn: ({ pageParam }) =>
      getMyBadges(
        token as string,
        pageParam.nextCursorId,
        pageParam.nextCursorCount,
      ),
    staleTime: 1000 * 60 * 5,
    initialPageParam: {
      nextCursorId: null,
      nextCursorCount: null,
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasNext) return null;

      return {
        nextCursorId: lastPage.meta.nextCursorId,
        nextCursorCount: lastPage.meta.nextCount,
      };
    },
    enabled: !!token,
  });
}
