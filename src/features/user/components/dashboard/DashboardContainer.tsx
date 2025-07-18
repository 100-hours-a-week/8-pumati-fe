'use client';

import {
  AlertModal,
  ErrorHandlingWrapper,
  ModalPortal,
  ToggleButton,
  Tooltip,
} from '@/components';
import { NavArrowIcon } from '@/components/icons';
import { authAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useToggleEmailConsent } from '../../hooks';
import { EmailNoticeModalContent } from '../email-notice-modal-content';
import { DashboardErrorFallback } from './DashboardErrorFallback';
import { DashboardFallback } from './DashboardFallback';
import { DashboardFetcher } from './DashboardFetcher';

export function DashboardContainer() {
  const [isEmailNoticeModalOpen, setIsEmailNoticeModalOpen] = useState(false);

  const authData = useAtomValue(authAtom);
  const { mutate: toggleEmailConsent, isPending } = useToggleEmailConsent();

  if (!authData) return null;

  const handleToggleEmailConsent = () => {
    toggleEmailConsent();
  };
  return (
    <div className="mb-12 w-full">
      <ErrorHandlingWrapper
        ErrorFallback={<DashboardErrorFallback />}
        SuspenseFallback={<DashboardFallback />}
      >
        <DashboardFetcher />
      </ErrorHandlingWrapper>
      <div className="flex justify-between items-center w-fullw-full mt-4">
        <div className="flex items-center gap-3">
          <Tooltip direction="right">
            <p>
              이메일을 수신에 동의하면 매주 월요일 주간 품앗이 리포트가
              발송됩니다.
            </p>
            <p>
              발송되는 이메일은 회원가입 시 등록하신 이메일 주소로 전송됩니다.
            </p>
          </Tooltip>
          <p className="font-semibold text-dark-grey">
            주간 품앗이 리포트 이메일 수신여부
          </p>
          <button
            className="cursor-pointer"
            onClick={() => setIsEmailNoticeModalOpen(true)}
            aria-label="주간 품앗이 리포트 이메일 수신 안내 모달 열기"
          >
            <NavArrowIcon width={20} height={20} className="rotate-90" />
          </button>
        </div>
        <ToggleButton
          title="주간 품앗이 리포트 이메일 수신 여부"
          isOn={authData.hasEmailConsent}
          onToggle={handleToggleEmailConsent}
          isLoading={isPending}
        />
        {isEmailNoticeModalOpen && (
          <ModalPortal>
            <AlertModal
              title="주간 품앗이 리포트 이메일 수신 안내"
              buttonText="확인"
              onClose={() => setIsEmailNoticeModalOpen(false)}
            >
              <EmailNoticeModalContent />
            </AlertModal>
          </ModalPortal>
        )}
      </div>
    </div>
  );
}
