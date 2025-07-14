import { z } from 'zod';

export const subscribeResponseSchema = z.object({
  id: z.number(),
  subscribedAt: z.string().datetime(),
});

export type SubscribeResponse = z.infer<typeof subscribeResponseSchema>;
