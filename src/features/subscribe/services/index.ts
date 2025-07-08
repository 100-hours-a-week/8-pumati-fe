import { ProjectItem } from '@/features/project/schemas';
import { authInfiniteApiClient } from '@/utils/api-client';
import { Term } from '../components';

export const getSubscribedProjects = async (
  term: Term,
  token: string,
  cursorTime: string | null,
  cursorId: number = 0,
  pageSize: number = 10,
) => {
  return authInfiniteApiClient<ProjectItem>(
    `/api/projects/subscription/term/${term}?sort=latest${cursorTime ? `&cursor-time=${cursorTime}` : ''}&cursor-id=${cursorId}&page-size=${pageSize}`,
    token,
  );
};
