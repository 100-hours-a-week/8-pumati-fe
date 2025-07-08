'use client';

import { AlertModal, GuideMessage, ModalPortal } from '@/components';
import { PROJECT_PATH } from '@/constants';
import { cn } from '@/utils/style';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type BadgeProps = {
  imageUrl: string;
  size?: 'md' | 'lg' | 'xl';
  isExpandable?: boolean;
  title?: string;
  priority?: boolean;
  projectId?: number;
  isMyProject?: boolean;
};

export function Badge({
  imageUrl,
  size = 'md',
  isExpandable,
  title,
  priority,
  projectId,
  isMyProject,
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
        role={isExpandable ? 'button' : undefined}
        aria-label={`${title || ''} 팀 뱃지`}
        tabIndex={isExpandable ? 0 : undefined}
        onKeyDown={(e) => {
          if (isExpandable && e.key === 'Enter') {
            handleClick();
          }
        }}
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
            title={`${title} 팀 뱃지 확인`}
            buttonText="닫기"
            onClose={() => setIsBadgeModalOpen(false)}
          >
            <h2 className="text-lg font-semibold mt-4">{title} 팀 뱃지</h2>
            <div className="flex flex-col items-center gap-1">
              <GuideMessage message="뱃지는 프로젝트 수정페이지에서 변경할 수 있습니다." />
              {isMyProject && projectId && (
                <Link
                  href={PROJECT_PATH.EDIT(projectId.toString())}
                  className="text-xs text-blue hover:underline"
                >
                  뱃지 변경하기
                </Link>
              )}
            </div>
            <div className="mb-4">
              <Badge imageUrl={imageUrl} size="xl" />
            </div>
          </AlertModal>
        </ModalPortal>
      )}
    </>
  );
}
