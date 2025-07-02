'use client';

import { AlertModal, ModalPortal } from '@/components';
import { cn } from '@/utils/style';
import Image from 'next/image';
import { useState } from 'react';

type BadgeProps = {
  imageUrl: string;
  size?: 'md' | 'lg' | 'xl';
  isExpandable?: boolean;
  title?: string;
  priority?: boolean;
};

export function Badge({
  imageUrl,
  size = 'md',
  isExpandable,
  title,
  priority,
}: BadgeProps) {
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  const sizes = size === 'md' ? 48 : size === 'lg' ? 64 : 224;

  const handleClick = () => {
    if (isExpandable) {
      setIsBadgeModalOpen(true);
    }
  };
  return (
    <>
      <div
        className={cn(
          'relative flex items-center justify-center z-30 rounded-full overflow-hidden shadow-sm',
          size === 'md'
            ? 'w-12 h-12 '
            : size === 'lg'
              ? 'w-16 h-16'
              : 'w-56 h-56',
          isExpandable && 'cursor-pointer',
        )}
        onClick={handleClick}
      >
        <Image
          src={imageUrl}
          alt="프로젝트 뱃지"
          width={sizes}
          height={sizes}
          className="object-contain"
          priority={priority}
        />
      </div>
      {isBadgeModalOpen && (
        <ModalPortal>
          <AlertModal
            buttonText="닫기"
            onClose={() => setIsBadgeModalOpen(false)}
          >
            <h2 className="text-lg font-semibold mt-4">{title} 팀 뱃지</h2>
            <div className="my-4">
              <Badge imageUrl={imageUrl} size="xl" />
            </div>
          </AlertModal>
        </ModalPortal>
      )}
    </>
  );
}
