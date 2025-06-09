import { EditBadge } from '../schemas';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const receiveBadge = async (token: string, teamId: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/members/teams/${teamId}/badge`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to receive badge:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while receiving badge');
  }
};

export const getMyBadges = async (
  token: string,
  cursorId: number | null,
  cursorCount: number | null,
  pageSize: number = 20,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/members/badges?page-size=${pageSize}${cursorId ? `&cursor-id=${cursorId}` : ''}${cursorCount ? `&cursor-count=${cursorCount}` : ''}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to get my badges:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting my badges');
  }
};

export const editBadge = async (
  token: string,
  teamId: number,
  editBadgeData: EditBadge,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/teams/${teamId}/badge-image`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editBadgeData),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to edit badge:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while editing badge');
  }
};
