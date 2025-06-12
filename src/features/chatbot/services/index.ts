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

export const sendChatbotQuestion = async (
  token: string,
  projectId: string,
  sessionId: string,
  content: string,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/projects/${projectId}/chatbot/sessions/${sessionId}/message`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to send chatbot question:', error);

    throw error instanceof Error
      ? error
      : new Error(
          'An unexpected error occurred while sending chatbot question',
        );
  }
};

export const disconnectChatbot = async (
  token: string,
  projectId: string,
  sessionId: string,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/projects/${projectId}/chatbot/sessions/${sessionId}/stream`,
      {
        method: 'DELETE',
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
    console.error('Failed to disconnect chatbot:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while disconnecting chatbot');
  }
};
