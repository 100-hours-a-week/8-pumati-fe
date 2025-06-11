import { CHATBOT_QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { createChatbotSessionId } from '../services';

export function useCreateChatbotSessionId(token: string, projectId: string) {
  return useQuery({
    queryKey: CHATBOT_QUERY_KEY.SESSION_ID,
    queryFn: () => createChatbotSessionId(token, projectId),
  });
}
