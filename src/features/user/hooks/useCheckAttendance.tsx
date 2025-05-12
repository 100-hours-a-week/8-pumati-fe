'use client';

import { useMutation } from '@tanstack/react-query';
import { Attendance } from '../schemas/attendance';
import { checkAttendance } from '../services';

export function useCheckAttendance() {
  return useMutation<Attendance, Error, string>({
    mutationFn: checkAttendance,
  });
}
