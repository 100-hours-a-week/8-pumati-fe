'use client';

import { useSignup } from '@/features/user/hooks';
import { Signup } from '@/features/user/schemas';
import { FormProvider } from 'react-hook-form';
import { SignupForm } from '../form';

export function SignupContainer() {
  const methods = useSignup();
  const { handleSubmit } = methods;

  const onSubmit = (data: Signup) => {
    console.log(data);
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
