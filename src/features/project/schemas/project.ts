import { z } from 'zod';

export const projectItemSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  term: z.number(),
  teamNumber: z.number(),
  badgeImageUrl: z.string(),
  representativeImageUrl: z.string(),
  title: z.string(),
  introduction: z.string(),
  tags: z.array(z.string()),
  givedPumatiCount: z.number(),
  receivedPumatiCount: z.number(),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
});

export type ProjectItem = z.infer<typeof projectItemSchema>;
