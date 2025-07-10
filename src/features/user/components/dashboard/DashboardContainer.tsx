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
import { EmailNoticeModalContent } from '../email-notice-modal-content';
import { DashboardErrorFallback } from './DashboardErrorFallback';
import { DashboardFallback } from './DashboardFallback';
import { DashboardFetcher } from './DashboardFetcher';

export function DashboardContainer() {
  const [isEmailNoticeModalOpen, setIsEmailNoticeModalOpen] = useState(false);

  const authData = useAtomValue(authAtom);

  if (!authData) return null;

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
          </Tooltip>
          <p className="font-semibold text-dark-grey">
            주간 품앗이 리포트 이메일 수신여부
          </p>
          <button
            className="cursor-pointer"
            onClick={() => setIsEmailNoticeModalOpen(true)}
          >
            <NavArrowIcon width={20} height={20} className="rotate-90" />
          </button>
        </div>
        <ToggleButton initialValue={false} onToggle={() => {}} />
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
