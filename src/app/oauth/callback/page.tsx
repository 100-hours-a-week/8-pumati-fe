'use client';

import { SpinnerIcon } from '@/components/icons';
import { LoginCallbackContent } from '@/features/auth/components';
import { Suspense } from 'react';

export default function LoginCallbackPage() {
  return (
    <Suspense fallback={<SpinnerIcon />}>
      <LoginCallbackContent />
    </Suspense>
  );
}
