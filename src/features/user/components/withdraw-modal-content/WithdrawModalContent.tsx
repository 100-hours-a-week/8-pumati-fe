'use client';

import { ConfirmModal, ModalPortal } from '@/components';
import { WarningIcon } from '@/components/icons';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useWithdraw } from '../../hooks';

type WithdrawModalContentProps = {
  onClose: () => void;
};

export function WithdrawModalContent({ onClose }: WithdrawModalContentProps) {
  const router = useRouter();

  const accessToken = useAtomValue(accessTokenAtom);

  const { mutate: withdraw } = useWithdraw();

  const handleWithdraw = () => {
    if (!accessToken) {
      alert('로그인 후 탈퇴 가능합니다.');
      router.push(AUTH_PATH.LOGIN);
      return;
    }

    withdraw(accessToken);
  };
  return (
    <ModalPortal>
      <ConfirmModal
        title="탈퇴 확인"
        buttonText="탈퇴"
        onClose={onClose}
        onConfirm={handleWithdraw}
        destructive
      >
        <WarningIcon width={40} height={40} />
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold">정말 탈퇴하시겠습니까?</h2>
          <p>탈퇴 시 모든 정보가 삭제됩니다.</p>
        </div>
      </ConfirmModal>
    </ModalPortal>
  );
}
