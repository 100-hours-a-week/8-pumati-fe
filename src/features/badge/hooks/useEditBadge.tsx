import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { EditBadge } from '../schemas';
import { editBadge } from '../services';

export function useEditBadge() {
  const router = useRouter();

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
      router.refresh();
    },
    onError: (error) => {
      console.error('Failed to edit badge:', error);
      alert('뱃지 수정에 실패했습니다.');
    },
  });
}
