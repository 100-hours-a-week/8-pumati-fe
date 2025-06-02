import { z } from 'zod';

export const badgeSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  teamId: z.number(),
  term: z.number(),
  teamNumber: z.number(),
  badgeImageUrl: z.string().url(),
  acquiredCount: z.number(),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
});

export type Badge = z.infer<typeof badgeSchema>;
