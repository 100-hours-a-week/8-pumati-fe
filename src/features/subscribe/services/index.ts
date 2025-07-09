import { ProjectItem } from '@/features/project/schemas';
import { authApiClient, authInfiniteApiClient } from '@/utils/api-client';
import { Term } from '../components';

export const subscribe = async ({
  projectId,
  token,
}: {
  projectId: number;
  token: string;
}) => {
  return authApiClient(`/api/projects/${projectId}/subscription`, token, {
    method: 'POST',
  });
};

export const unSubscribe = async ({
  projectId,
  token,
}: {
  projectId: number;
  token: string;
}) => {
  return authApiClient(`/api/projects/${projectId}/subscription`, token, {
    method: 'DELETE',
  });
};

export const checkSubscription = async ({
  projectId,
  token,
}: {
  projectId: number;
  token: string;
}) => {
  return authApiClient<{ isSubscribed: boolean }>(
    `/api/projects/${projectId}/subscription`,
    token,
  ).then((res) => res.data);
};

export const getSubscribedProjects = async (
  term: Term,
  token: string,
  cursorTime: string | null,
  cursorId: number = 0,
  pageSize: number = 12,
) => {
  return authInfiniteApiClient<ProjectItem>(
    `/api/projects/subscription/term/${term}?sort=latest${cursorTime ? `&cursor-time=${cursorTime}` : ''}&cursor-id=${cursorId}&page-size=${pageSize}`,
    token,
  );
};
