'use client';

import { SpinnerIcon } from '@/components/icons';
import { accessTokenAtom } from '@/store/atoms';
import { useSetAtom } from 'jotai';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import { useRefresh } from '../../hooks/useRefresh';

type AuthProviderProps = {
  children: ReactNode;
  refreshToken?: string;
};

export function AuthProvider({ children, refreshToken }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(!!refreshToken);

  const setAccessToken = useSetAtom(accessTokenAtom);

  const {
    data: refreshData,
    isLoading: isRefreshing,
    isError: isRefreshError,
  } = useRefresh(refreshToken);
  const { mutateAsync: getAuth, isPending: isGettingAuth } = useAuth();

  useEffect(() => {
    const fetchAuth = async () => {
      if (refreshData?.accessToken) {
        const accessToken = refreshData.accessToken;

        setAccessToken(accessToken);
        await getAuth(accessToken);
      }

      setIsLoading(false);
    };

    fetchAuth();
  }, [refreshData, getAuth, setAccessToken]);

  if (isRefreshError) {
    return <>{children}</>;
  }

  if (isLoading || isRefreshing || isGettingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <SpinnerIcon
          width={32}
          height={32}
          fill="var(--color-blue)"
          className="animate-spin"
        />
      </div>
    );
  }

  return <>{children}</>;
}
