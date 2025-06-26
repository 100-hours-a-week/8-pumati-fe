'use client';

import { QueryErrorResetFunction } from '@tanstack/react-query';
import * as React from 'react';
import { Button } from '../button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  onReset: QueryErrorResetFunction;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });

    this.props.onReset();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="relative">
          {this.props.fallback}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl font-bold">잠시후 다시 시도해주세요</p>
              <p className="text-center text-sm text-dark-grey font-semibold">
                요청사항을 처리하는데
                <br />
                실패했습니다.
              </p>
            </div>
            <Button type="button" size="md" onClick={this.handleReset}>
              다시 시도
            </Button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
