import { PROJECT_PATH } from '@/constants';
import { PROJECT_QUERY_KEY } from '@/constants/query-key';
import { getQueryClient } from '@/libs/tanstack-query';
import { accessTokenAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { NewProject } from '../schemas';
import { createProject } from '../services';

export function useCreateProject() {
  const router = useRouter();
  const accessToken = useAtomValue(accessTokenAtom);

  const queryClient = getQueryClient();

  return useMutation<{ id: number }, Error, NewProject>({
    mutationFn: (data) => createProject(data, accessToken as string),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_QUERY_KEY.RANKED_PROJECTS,
      });
      router.push(PROJECT_PATH.DETAIL(data.id.toString()));
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
