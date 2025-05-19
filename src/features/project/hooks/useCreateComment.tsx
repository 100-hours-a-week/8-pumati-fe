import { useMutation } from '@tanstack/react-query';
import { CreateComment } from '../schemas';
import { createComment } from '../services';

export function useCreateComment() {
  return useMutation({
    mutationFn: ({
      projectId,
      commentData,
      token,
    }: {
      projectId: number;
      commentData: CreateComment;
      token: string;
    }) => createComment(projectId, commentData, token),
    onSuccess: () => {
      alert('후기가 작성되었습니다.');
    },
  });
}
