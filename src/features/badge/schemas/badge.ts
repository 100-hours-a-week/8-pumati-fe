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
  tag: z.string().min(1, '태그를 입력해주세요.'),
});

export type EditBadge = z.infer<typeof editBadgeSchema>;
