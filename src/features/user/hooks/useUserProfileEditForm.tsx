import { useForm } from 'react-hook-form';
import { AuthData, UserProfileEditForm } from '../schemas';

export function useUserProfileEditForm(authData: AuthData) {
  const { name, nickname, profileImageUrl, teamNumber, course } = authData;

  return useForm<UserProfileEditForm>({
    defaultValues: {
      name,
      nickname,
      profileImageUrl: {
        url: profileImageUrl,
      },
      term: authData.term ?? undefined,
      teamNumber: teamNumber ?? undefined,
      course: course ?? undefined,
    },
  });
}
