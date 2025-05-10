import { NewProject } from '../schemas';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createProject = async (
  newProjectData: NewProject,
  accessToken: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newProjectData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to create project:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating a project');
  }
};

export const getSnapshot = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects/snapshot`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to get snapshot:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting snapshot');
  }
};

export const getProjects = async (
  sort: 'rank' | 'latest',
  contextId?: number,
  cursorId: number = 0,
  pageSize: number = 10,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/projects?sort=${sort}${contextId ? `&context-id=${contextId}` : ''}&cursor-id=${cursorId}&page-size=${pageSize}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to get projects:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting projects');
  }
};
