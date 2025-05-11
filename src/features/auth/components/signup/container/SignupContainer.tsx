'use client';

import { ROOT_PATH } from '@/constants';
import { useAuth, useSignup, useSignupForm } from '@/features/auth/hooks';
import {
  SignupData,
  SignupForm as SignupFormData,
} from '@/features/auth/schemas';
import { useUploadFileToS3 } from '@/hooks';
import { isCodeVerifiedAtom, signupTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import { SignupForm } from '../form';

export function SignupContainer() {
  const router = useRouter();
  const signupToken = useAtomValue(signupTokenAtom);
  const isCodeVerified = useAtomValue(isCodeVerifiedAtom);

  const methods = useSignupForm();
  const { handleSubmit, setError } = methods;

  const { mutateAsync: getPresignedUrl } = useUploadFileToS3();
  const { mutateAsync: signup } = useSignup();
  const { mutateAsync: getAuth } = useAuth();

  const onSubmit = async (data: SignupFormData) => {
    if (!signupToken) {
      throw new Error('Signup token is not found');
    }

    if (!isCodeVerified) {
      setError('code', { message: '인증코드가 확인되지 않았습니다.' });
      return;
    }

    const { name, nickname, term, teamNumber, course } = data;
    const signupData: SignupData = {
      name,
      nickname,
      term,
      teamNumber,
      course,
      signupToken,
      role: 'TRAINEE',
      mailConsent: true,
      profileImageUrl: null,
    };

    if (data.profileImageUrl) {
      const { publicUrl } = await getPresignedUrl(data.profileImageUrl);
      signupData.profileImageUrl = publicUrl;
    }

    const { accessToken } = await signup(signupData);
    await getAuth(accessToken);

    router.push(ROOT_PATH);
  };
  return (
    <FormProvider {...methods}>
      <form
        className="mt-12 w-full max-w-[25rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SignupForm />
      </form>
    </FormProvider>
  );
}
