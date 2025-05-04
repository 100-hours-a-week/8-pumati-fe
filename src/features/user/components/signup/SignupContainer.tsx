'use client';

import { FormProvider } from 'react-hook-form';
import { useSignup } from '../../hooks';
import { Signup } from '../../schemas';
import { SignupForm } from './SignupForm';

export function SignupContainer() {
  const methods = useSignup();
  const { handleSubmit } = methods;

  const onSubmit = (data: Signup) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form className="mt-12 w-[25rem]" onSubmit={handleSubmit(onSubmit)}>
        <SignupForm />
      </form>
    </FormProvider>
  );
}
