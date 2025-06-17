'use client';

import { USER_QUERY_KEY } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkAttendance } from '../services';

export function useCheckAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.ATTENDANCE_STATE,
      });
    },
  });
}
