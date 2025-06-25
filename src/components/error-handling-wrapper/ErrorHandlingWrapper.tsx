'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from '../error-boundary';

type ErrorHandlingWrapperProps = {
  children: React.ReactNode;
  ErrorFallback: React.ReactNode;
  SuspenseFallback: React.ReactNode;
};

export function ErrorHandlingWrapper({
  children,
  ErrorFallback,
  SuspenseFallback,
}: ErrorHandlingWrapperProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={ErrorFallback} onReset={reset}>
          <Suspense fallback={SuspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
