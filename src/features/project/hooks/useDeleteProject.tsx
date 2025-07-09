import { PROJECT_PATH, PROJECT_QUERY_KEY, USER_QUERY_KEY } from '@/constants';
import { getQueryClient } from '@/libs/tanstack-query';
import { accessTokenAtom, authAtom } from '@/store/atoms';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { deleteProject } from '../services';

export function useDeleteProject() {
  const router = useRouter();

  const authData = useAtomValue(authAtom);
  const accessToken = useAtomValue(accessTokenAtom);

  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (projectId: number) =>
      deleteProject(projectId, accessToken as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_QUERY_KEY.SUBSCRIPTION_DATA,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.DASHBOARD(authData!.teamId!),
      });
      router.push(PROJECT_PATH.ROOT);
    },
    onError: (error) => {
      console.error(error);
      alert('프로젝트 삭제에 실패했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}
