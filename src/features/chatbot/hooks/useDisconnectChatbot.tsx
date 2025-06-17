import { useMutation } from '@tanstack/react-query';
import { disconnectChatbot } from '../services';

export function useDisconnectChatbot(
  token: string,
  projectId: string,
  sessionId: string,
) {
  return useMutation({
    mutationFn: () => disconnectChatbot(token, projectId, sessionId),
    onError: () => {
      console.log('챗봇 연결을 끊는데 실패했습니다.');
    },
  });
}
