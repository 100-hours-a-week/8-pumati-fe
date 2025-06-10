import { useMutation } from '@tanstack/react-query';
import { EditBadge } from '../schemas';
import { editBadge } from '../services';
 
export function useEditBadge() {
  return useMutation({
    mutationFn: ({
      token,
      teamId,
      data,
    }: {
      token: string;
      teamId: number;
      data: EditBadge;
    }) => editBadge(token, teamId, data),
    onSuccess: () => {
      alert('AI가 뱃지 생성을 시작했습니다!');
    },
    onError: (error) => {
      console.error('Failed to edit badge:', error);
      alert('뱃지 수정에 실패했습니다.');
    },
  });
}
