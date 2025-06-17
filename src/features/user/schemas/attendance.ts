import { z } from 'zod';

export const attendanceSchema = z.object({
  id: z.number(),
  devLuck: z.object({
    overall: z.string(),
  }),
  checkedAt: z.string(),
});

export type Attendance = z.infer<typeof attendanceSchema>;

export const attendanceStateSchema = z.object({
  today: z.boolean(),
  weekly: z.object({
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
    sunday: z.boolean(),
  }),
  streak: z.number(),
  lastCheckedDate: z.string().datetime(),
});

export type AttendanceState = z.infer<typeof attendanceStateSchema>;
