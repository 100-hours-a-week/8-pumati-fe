'use client';

import { USER_QUERY_KEY } from '@/constants';
import { devLuckAtom } from '@/store/atoms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { checkAttendance } from '../services';

export function useCheckAttendance() {
  const queryClient = useQueryClient();

  const setDevLuck = useSetAtom(devLuckAtom);

  return useMutation({
    mutationFn: checkAttendance,
    onSuccess: (data) => {
      setDevLuck(data!.devLuck.overall);
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.ATTENDANCE_STATE,
      });
    },
  });
}
