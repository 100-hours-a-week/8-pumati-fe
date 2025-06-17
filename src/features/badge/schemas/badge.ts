import { BADGE_TAG_MAX_LENGTH } from '@/constants';
import { z } from 'zod';

export type PaginationMeta = {
  nextCursorId: number | null;
  nextCount: number | null;
  hasNext: boolean;
};

export const badgeSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  giverTeamId: z.number(),
  giverTeamTerm: z.number(),
  giverTeamNumber: z.number(),
  badgeImageUrl: z.string().url(),
  acquiredCount: z.number(),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
});

export type Badge = z.infer<typeof badgeSchema>;

export const editBadgeSchema = z.object({
  modificationTags: z
    .array(z.string())
    .min(BADGE_TAG_MAX_LENGTH, `태그를 ${BADGE_TAG_MAX_LENGTH}개 입력해주세요.`)
    .max(
      BADGE_TAG_MAX_LENGTH,
      `태그는 ${BADGE_TAG_MAX_LENGTH}개만 입력할 수 있습니다.`,
    ),
});

export type EditBadge = z.infer<typeof editBadgeSchema>;
