import { BADGE_ERROR_MESSAGE } from '@/constants';
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
      if (error.message === BADGE_ERROR_MESSAGE.IN_PROGRESS) {
        alert('뱃지 수정 중입니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      console.error('Failed to edit badge:', error);
      alert('뱃지 수정에 실패했습니다.');
    },
  });
}
