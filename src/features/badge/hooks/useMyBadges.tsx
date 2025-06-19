import { USER_QUERY_KEY } from '@/constants';
import { accessTokenAtom } from '@/store/atoms';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { getMyBadges } from '../services';

export function useMyBadges() {
  const accessToken = useAtomValue(accessTokenAtom);

  return useInfiniteQuery({
    queryKey: USER_QUERY_KEY.BADGES,
    queryFn: ({ pageParam }) =>
      getMyBadges(
        accessToken as string,
        pageParam.nextCursorId,
        pageParam.nextCursorCount,
      ),
    initialPageParam: {
      nextCursorId: null as number | null,
      nextCursorCount: null as number | null,
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasNext) return null;

      return {
        nextCursorId: lastPage.meta.nextCursorId,
        nextCursorCount: lastPage.meta.nextCount,
      };
    },
    enabled: !!accessToken,
  });
}
