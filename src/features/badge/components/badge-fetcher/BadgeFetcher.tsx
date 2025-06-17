'use client';

import { AlertModal, ModalPortal } from '@/components';
import { accessTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useMyBadges } from '../../hooks';
import { BadgeList } from '../badge-list';
import { BadgeModalContent } from '../badge-modal-content';

const MAX_BADGE_COUNT = 12;

export function BadgeFetcher() {
  const [isBadgeListModalOpen, setIsBadgeListModalOpen] = useState(false);

  const accessToken = useAtomValue(accessTokenAtom);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMyBadges(accessToken);
  const badges = data?.pages.flatMap((page) => page.data) ?? [];

  const handleBadgeListModalToggle = () => {
    setIsBadgeListModalOpen((prev) => !prev);
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-end w-full">
        <h2 className="text-lg font-semibold">받은 품앗이 뱃지</h2>
        {badges.length > MAX_BADGE_COUNT && (
          <button
            className="text-sm text-blue cursor-pointer hover:underline"
            onClick={handleBadgeListModalToggle}
          >
            더 보기
          </button>
        )}
      </div>
      <div className="bg-blue-white rounded-xl p-4">
        <BadgeList
          badges={badges.slice(0, MAX_BADGE_COUNT)}
          isLoading={isLoading}
        />
      </div>
      {isBadgeListModalOpen && (
        <ModalPortal>
          <AlertModal onClose={handleBadgeListModalToggle} buttonText="확인">
            <BadgeModalContent
              badges={badges}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </AlertModal>
        </ModalPortal>
      )}
    </section>
  );
}
