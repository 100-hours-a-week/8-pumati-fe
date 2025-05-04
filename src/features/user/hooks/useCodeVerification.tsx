'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export function useCodeVerification() {
  const { watch, trigger } = useFormContext();
  const codeValue = watch('code', '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleCodeVerification = async () => {
    const isValid = await trigger('code', { shouldFocus: true });

    if (!isValid) return;

    setIsVerifying(true);
    // 인증 코드 실행
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsVerifying(false);
    setIsVerified(true);
  };

  return { codeValue, isVerifying, isVerified, handleCodeVerification };
}
