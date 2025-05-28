import { z } from 'zod';

export const myDataSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  term: z.number(),
  teamNumber: z.number(),
  email: z.string().email(),
  name: z.string(),
  nickname: z.string(),
  course: z.enum(['FULL_STACK', 'AI', 'CLOUD']).nullable(),
  profileImageUrl: z.string().url(),
  role: z.enum(['USER', 'ADMIN', 'TRAINEE']),
  state: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
  isSocial: z.boolean(),
  emailOptInAt: z.string().datetime().nullable(),
  emailOptOutAt: z.string().datetime().nullable(),
});

export type MyData = z.infer<typeof myDataSchema>;
