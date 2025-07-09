'use client';

import { SubscribeIcon } from '@/components/icons';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCheckSubscriptionState, useToggleSubscription } from '../../hooks';

type SubscribeButtonProps = {
  projectId: number;
};

export function SubscribeButton({ projectId }: SubscribeButtonProps) {
  const router = useRouter();

  const accessToken = useAtomValue(accessTokenAtom);

  const { data, isLoading } = useCheckSubscriptionState(projectId);
  const { mutate: toggleSubscription } = useToggleSubscription();

  const isSubscribed = !!data?.isSubscribed;

  const handleSubscribe = () => {
    if (!accessToken) {
      router.push(AUTH_PATH.LOGIN);
      return;
    }

    toggleSubscription({
      projectId,
      isSubscribed,
      token: accessToken,
    });
  };
  return (
    <button
      aria-label="프로젝트 구독"
      className="flex justify-center items-center p-1 cursor-pointer hover:bg-light-blue rounded-full transition-colors duration-150"
      onClick={handleSubscribe}
      disabled={isLoading}
    >
      <SubscribeIcon
        width={24}
        height={24}
        fill={isSubscribed ? 'var(--color-blue)' : 'none'}
        stroke={isSubscribed ? 'var(--color-blue)' : '#000000'}
      />
    </button>
  );
}
