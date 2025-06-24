import { PROJECT_REVALIDATE_TAG } from '@/constants';
import {
  apiClient,
  authApiClient,
  infiniteApiClient,
} from '@/utils/api-client';
import { ApiError } from '@/utils/error';
import {
  NewProject,
  NewProjectResponse,
  ProjectDetail,
  ProjectExistenceResponse,
  ProjectItem,
  TeamMember,
} from '../schemas';

export const checkProjectExists = async (token: string) => {
  return authApiClient<ProjectExistenceResponse>(
    '/api/members/teams/projects/existence',
    token,
  ).then((res) => res.data);
};

export const createProject = async (
  newProjectData: NewProject,
  token: string,
) => {
  return authApiClient<NewProjectResponse>('/api/projects', token, {
    method: 'POST',
    body: newProjectData,
  }).then((res) => res.data);
};

export const editProject = async (
  projectId: number,
  projectData: NewProject,
  token: string,
) => {
  return authApiClient(`/api/projects/${projectId}`, token, {
    method: 'PUT',
    body: projectData,
  });
};

export const deleteProject = async (projectId: number, token: string) => {
  return authApiClient(`/api/projects/${projectId}`, token, {
    method: 'DELETE',
  });
};

export const getProject = async (projectId: number) => {
  if (typeof projectId !== 'number' || isNaN(projectId)) return undefined;

  try {
    const response = await apiClient<ProjectDetail>(
      `/api/projects/${projectId}`,
    );

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.statusCode === 404) {
        return undefined;
      }
    }

    throw error;
  }
};

export const getTeamMembers = async (teamId: number) => {
  return apiClient<TeamMember[]>(`/api/teams/${teamId}/members`).then(
    (res) => res.data,
  );
};

export const getSnapshot = async () => {
  return apiClient<{ id: number }>('/api/projects/snapshot', {
    method: 'POST',
    next: {
      tags: [PROJECT_REVALIDATE_TAG.SNAPSHOT],
    },
  }).then((res) => res.data);
};

export const getRankedProjects = async (
  contextId: number,
  cursorId: number = 0,
  pageSize: number = 10,
) => {
  return infiniteApiClient<ProjectItem>(
    `/api/projects?sort=rank&context-id=${contextId}&cursor-id=${cursorId}&page-size=${pageSize}`,
    {
      next: {
        tags: [PROJECT_REVALIDATE_TAG.RANKED_PROJECTS],
      },
    },
  );
};

export const getLatestProjects = async (
  cursorTime: string | null,
  cursorId: number = 0,
  pageSize: number = 10,
) => {
  return infiniteApiClient<ProjectItem>(
    `/api/projects?sort=latest${cursorTime ? `&cursor-time=${cursorTime}` : ''}&cursor-id=${cursorId}&page-size=${pageSize}`,
  );
};

export const givePumati = async ({
  token,
  teamId,
}: {
  token: string;
  teamId: number;
}) => {
  return authApiClient<{ givedPumatiCount: number }>(
    `/api/teams/${teamId}/gived-pumati`,
    token,
    {
      method: 'PATCH',
    },
  ).then((res) => res.data);
};

export const receivePumati = async ({
  token,
  teamId,
}: {
  token: string;
  teamId: number;
}) => {
  return authApiClient<{ receivedPumatiCount: number }>(
    `/api/teams/${teamId}/received-pumati`,
    token,
    {
      method: 'PATCH',
    },
  ).then((res) => res.data);
};
