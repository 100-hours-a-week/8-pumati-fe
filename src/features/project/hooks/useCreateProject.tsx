import { PROJECT_QUERY_KEY, STORAGE_KEY, USER_QUERY_KEY } from '@/constants';
import { getQueryClient } from '@/libs/tanstack-query';
import { accessTokenAtom, authAtom } from '@/store/atoms';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { NewProject } from '../schemas';
import { createProject } from '../services';

export function useCreateProject() {
  const queryClient = getQueryClient();

  const authData = useAtomValue(authAtom);
  const accessToken = useAtomValue(accessTokenAtom);

  return useMutation({
    mutationFn: (data: NewProject) =>
      createProject(data, accessToken as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_QUERY_KEY.RANKED_PROJECTS,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.DASHBOARD(authData!.teamId!),
      });
      sessionStorage.removeItem(STORAGE_KEY);
    },
    onError: (error) => {
      console.error(error);
      alert('프로젝트 생성에 실패했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}
