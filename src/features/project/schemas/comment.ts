import { z } from 'zod';

const authorSchema = z.object({
  id: z.number().nullable(),
  name: z.string(),
  nickname: z.string(),
  term: z.number().nullable(),
  course: z.enum(['FULL_STACK', 'AI', 'CLOUD']).nullable(),
  profileImageUrl: z.string().url(),
});

export const commentItemSchema = z.object({
  id: z.union([z.number(), z.string()]),
  projectId: z.number(),
  fromAi: z.boolean(),
  content: z.string(),
  author: authorSchema,
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
});

export type CommentItem = z.infer<typeof commentItemSchema>;
