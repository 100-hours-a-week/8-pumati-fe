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
