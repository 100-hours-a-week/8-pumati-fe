const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createChatbotSessionId = async (
  token: string,
  projectId: string,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/projects/${projectId}/chatbot/session`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to create chatbot session id:', error);

    throw error instanceof Error
      ? error
      : new Error(
          'An unexpected error occurred while creating chatbot session id',
        );
  }
};
