import { BADGE_TAG_MAX_LENGTH } from '@/constants';
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
    .min(BADGE_TAG_MAX_LENGTH, `태그를 ${BADGE_TAG_MAX_LENGTH}개 입력해주세요.`)
    .max(
      BADGE_TAG_MAX_LENGTH,
      `태그는 ${BADGE_TAG_MAX_LENGTH}개만 입력할 수 있습니다.`,
    ),
});

export type EditBadge = z.infer<typeof editBadgeSchema>;
