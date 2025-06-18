'use client';

import { useEffect } from 'react';

export function useLockOutsideScroll() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return null;
}
