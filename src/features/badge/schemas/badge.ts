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

export const editBadgeSchema = z.object({
  tags: z
    .array(z.string())
    .min(1, '태그는 최소 1개 이상 입력해주세요.')
    .max(5, '태그는 최대 5개까지 입력할 수 있습니다.'),
});

export type EditBadge = z.infer<typeof editBadgeSchema>;
