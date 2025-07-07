'use client';

import { SubscribeIcon } from '@/components/icons';

type SubscribeButtonProps = {
  isSubscribed: boolean;
};

export function SubscribeButton({ isSubscribed }: SubscribeButtonProps) {
  return (
    <button className="flex justify-center items-center p-1 cursor-pointer hover:bg-light-blue rounded-full transition-colors duration-150">
      <SubscribeIcon
        width={24}
        height={24}
        fill={isSubscribed ? 'var(--color-blue)' : 'none'}
        stroke={isSubscribed ? 'var(--color-blue)' : '#000000'}
      />
    </button>
  );
}
