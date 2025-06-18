import { z } from 'zod';

export const chattingSchema = z.object({
  content: z.string(),
  isUser: z.boolean(),
});

export type Chatting = z.infer<typeof chattingSchema>;
