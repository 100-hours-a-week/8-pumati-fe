'use server';

import { PROJECT_REVALIDATE_TAG } from '@/constants';
import { revalidateTag } from 'next/cache';

export const revalidateSnapshot = async () => {
  revalidateTag(PROJECT_REVALIDATE_TAG.SNAPSHOT);
};

export const revalidateRankedProjects = async () => {
  revalidateTag(PROJECT_REVALIDATE_TAG.RANKED_PROJECTS);
};
