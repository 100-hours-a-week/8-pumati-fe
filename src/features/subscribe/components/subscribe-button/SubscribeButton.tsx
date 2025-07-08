'use client';

import { SubscribeIcon } from '@/components/icons';
import { accessTokenAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import {
  useCheckSubscriptionState,
  useSubscribe,
  useUnSubscribe,
} from '../../hooks';

type SubscribeButtonProps = {
  projectId: number;
};

export function SubscribeButton({ projectId }: SubscribeButtonProps) {
  const accessToken = useAtomValue(accessTokenAtom);

  const { data } = useCheckSubscriptionState(projectId);
  const { mutate: subscribe } = useSubscribe();
  const { mutate: unSubscribe } = useUnSubscribe();

  const isSubscribed = !!data?.isSubscribed;
  const request = isSubscribed ? unSubscribe : subscribe;

  const handleSubscribe = () => {
    if (!accessToken) return;

    request({
      projectId,
      token: accessToken,
    });
  };
  return (
    <button
      aria-label="프로젝트 구독"
      className="flex justify-center items-center p-1 cursor-pointer hover:bg-light-blue rounded-full transition-colors duration-150"
      onClick={handleSubscribe}
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
