const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
