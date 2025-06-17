import { InfiniteScrollResponse } from '@/schemas';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const projectExistenceResponseSchema = z.object({
  exists: z.boolean(),
});

export type ProjectExistenceResponse = z.infer<
  typeof projectExistenceResponseSchema
>;

const projectImageSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  url: z.string(),
  sequence: z.number(),
  createdAt: z.string(),
  modifiedAt: z.string(),
});

export type ProjectImage = z.infer<typeof projectImageSchema>;

const projectTagSchema = z.object({
  content: z.string(),
});

export const projectItemSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  term: z.number(),
  teamNumber: z.number(),
  badgeImageUrl: z.string(),
  representativeImageUrl: z.string(),
  title: z.string(),
  introduction: z.string(),
  tags: z.array(projectTagSchema),
  givedPumatiCount: z.number(),
  receivedPumatiCount: z.number(),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
});

export type ProjectItem = z.infer<typeof projectItemSchema>;

export type ProjectInfiniteScrollResponse = InfiniteScrollResponse<ProjectItem>;

export const projectDetailSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  title: z.string(),
  term: z.number(),
  teamNumber: z.number(),
  commentCount: z.number(),
  introduction: z.string(),
  detailedDescription: z.string(),
  representativeImageUrl: z.string().url(),
  images: z.array(projectImageSchema),
  deploymentUrl: z.string().url(),
  githubUrl: z.string().url(),
  tags: z.array(projectTagSchema),
  givedPumatiCount: z.number(),
  receivedPumatiCount: z.number(),
  teamRank: z.number(),
  isSubscribed: z.boolean(),
  badgeImageUrl: z.string().url(),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
});

export type ProjectDetail = z.infer<typeof projectDetailSchema>;

export type ProjectDashboard = Pick<
  ProjectDetail,
  'givedPumatiCount' | 'receivedPumatiCount' | 'teamRank'
>;
