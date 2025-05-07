'use client';

import { useSignup, useSignupForm } from '@/features/auth/hooks';
import {
  SignupData,
  SignupForm as SignupFormData,
} from '@/features/auth/schemas';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { isCodeVerifiedAtom, signupTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { FormProvider } from 'react-hook-form';
import { SignupForm } from '../form';

export function SignupContainer() {
  const signupToken = useAtomValue(signupTokenAtom);
  const isCodeVerified = useAtomValue(isCodeVerifiedAtom);

  const methods = useSignupForm();
  const { handleSubmit, setError } = methods;

  const { mutateAsync: getPresignedUrl } = usePresignedUrl();
  const { mutate: signup } = useSignup();

  const onSubmit = async (data: SignupFormData) => {
    if (!signupToken) {
      throw new Error('Signup token is not found');
    }

    if (!isCodeVerified) {
      setError('code', { message: '인증코드가 확인되지 않았습니다.' });
      return;
    }

    const { code, profileImageUrl, ...signupFormData } = data;
    const signupData: SignupData = {
      ...signupFormData,
      signupToken,
      role: 'TRAINEE',
      mailConsent: true,
      profileImageUrl: null,
    };

    if (data.profileImageUrl) {
      const { publicUrl } = await getPresignedUrl(data.profileImageUrl);
      signupData.profileImageUrl = publicUrl;
    }

    signup(signupData);
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
