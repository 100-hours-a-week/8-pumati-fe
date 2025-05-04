import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Signup, signupSchema } from '../schemas';

export function useSignup() {
  const methods = useForm<Signup>({
    defaultValues: {
      profileImage: undefined,
      name: '',
      nickname: '',
      code: '',
      term: undefined,
      team: undefined,
      course: undefined,
    },
    resolver: zodResolver(signupSchema),
  });

  return methods;
}
