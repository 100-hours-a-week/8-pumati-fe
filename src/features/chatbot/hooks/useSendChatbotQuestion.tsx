import { useMutation } from '@tanstack/react-query';
import { sendChatbotQuestion } from '../services';

export function useSendChatbotQuestion(
  token: string,
  projectId: string,
  sessionId: string,
) {
  return useMutation({
    mutationFn: (content: string) =>
      sendChatbotQuestion(token, projectId, sessionId, content),
    onError: () => {
      console.log('질문을 보내는데 실패했습니다.');
    },
  });
}
