import { z } from 'zod';

export const attendanceSchema = z.object({
  id: z.number(),
  devLuckDTO: z.object({
    overall: z.string(),
  }),
  checkedAt: z.string(),
});

export type Attendance = z.infer<typeof attendanceSchema>;
