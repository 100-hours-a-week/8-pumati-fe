import { PROJECT_PATH } from '@/constants';
import { accessTokenAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { NewProject } from '../schemas';
import { createProject } from '../services';

export function useCreateProject() {
  const router = useRouter();
  const accessToken = useAtomValue(accessTokenAtom);

  return useMutation<{ id: number }, Error, NewProject>({
    mutationFn: (data) => createProject(data, accessToken as string),
    onSuccess: (data) => {
      router.push(PROJECT_PATH.DETAIL(data.id.toString()));
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
