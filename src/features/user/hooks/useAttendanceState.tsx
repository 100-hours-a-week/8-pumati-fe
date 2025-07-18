import { USER_QUERY_KEY } from '@/constants';
import { accessTokenAtom } from '@/store/atoms';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { getAttendanceState } from '../services';

export function useAttendanceState() {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: USER_QUERY_KEY.ATTENDANCE_STATE,
    queryFn: () => getAttendanceState(accessToken as string),
    enabled: !!accessToken,
  });
}
