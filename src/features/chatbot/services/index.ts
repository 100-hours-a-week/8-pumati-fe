import { authApiClient } from '@/utils/api-client';

export const createChatbotSessionId = async (
  token: string,
  projectId: string,
) => {
  return authApiClient<string>(
    `/api/projects/${projectId}/chatbot/session`,
    token,
    {
      method: 'POST',
    },
  ).then((res) => res.data);
};

export const sendChatbotQuestion = async (
  token: string,
  projectId: string,
  sessionId: string,
  content: string,
) => {
  return authApiClient(
    `/api/projects/${projectId}/chatbot/sessions/${sessionId}/message`,
    token,
    {
      method: 'POST',
      body: { content },
    },
  );
};

export const disconnectChatbot = async (
  token: string,
  projectId: string,
  sessionId: string,
) => {
  return authApiClient(
    `/api/projects/${projectId}/chatbot/sessions/${sessionId}/stream`,
    token,
    {
      method: 'DELETE',
    },
  );
};
