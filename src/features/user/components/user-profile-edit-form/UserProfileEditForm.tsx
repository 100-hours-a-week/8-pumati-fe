'use client';

import { Button, Dropdown, TextInput } from '@/components';
import { useTeamList } from '@/features/auth/hooks';
import { useUploadFileToS3 } from '@/hooks';
import { authAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useEditUserProfile, useUserProfileEditForm } from '../../hooks';
import {
  UserProfileEditData,
  UserProfileEditForm as UserProfileEditFormType,
} from '../../schemas';
import { ImageUploader } from '../image-uploader';
import { WithdrawModalContent } from '../withdraw-modal-content';

export function UserProfileEditForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const authData = useAtomValue(authAtom);
  const { termOptions, teamNumberOptions } = useTeamList();

  const methods = useUserProfileEditForm(authData);
  const { handleSubmit, control, trigger, getValues } = methods;
  const { term } = useWatch({ control });

  const { mutate: editUserProfile } = useEditUserProfile();
  const { mutateAsync: getPresignedUrl } = useUploadFileToS3();

  const getEditData = async (data: UserProfileEditFormType) => {
    const userData: UserProfileEditData = {
      name: data.name,
      nickname: data.nickname,
      profileImageUrl: null,
      term: data.term ?? null,
      teamNumber: data.teamNumber ?? null,
      course: data.course ?? null,
      mailConsent: true,
    };

    if (data.profileImageUrl && data.profileImageUrl.file) {
      const { publicUrl } = await getPresignedUrl(data.profileImageUrl.file);
      userData.profileImageUrl = publicUrl;
    }

    return userData;
  };
  const handleTraineeEditProfile = async (data: UserProfileEditFormType) => {
    const editData = await getEditData(data);

    editUserProfile(editData);
  };
  const handleNonTraineeEditProfile = async () => {
    const valid = await trigger(['profileImageUrl', 'name', 'nickname']);
    if (valid) {
      const values = getValues();
      const editData = await getEditData(values);

      editUserProfile(editData);
    }
  };
  const handleEditClick = async () => {
    setIsSubmitting(true);

    if (authData && !authData.course) {
      await handleNonTraineeEditProfile();
    } else {
      await handleSubmit(handleTraineeEditProfile)();
    }

    setIsSubmitting(false);
  };
  return (
    <FormProvider {...methods}>
      <form className="mb-9">
        <ImageUploader label="프로필 이미지" name="profileImageUrl" />
        <TextInput
          label="이름"
          name="name"
          placeholder="이름을 입력해주세요."
          disabled={isSubmitting}
          required
        />
        <TextInput
          label="닉네임"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          disabled={isSubmitting}
          required
        />
        {authData && authData.course && (
          <>
            <Dropdown
              label="기수"
              name="term"
              options={termOptions || []}
              placeholder="기수를 선택해주세요."
              required
              disabled={isSubmitting}
            />
            <Dropdown
              label="팀(조)"
              name="teamNumber"
              options={teamNumberOptions[term ?? 0] || []}
              placeholder="팀(조)을 선택해주세요."
              disabled={!term || isSubmitting}
              required
            />
            <Dropdown
              label="과정"
              name="course"
              options={[
                { label: '풀스택', value: 'FULL_STACK' },
                { label: '인공지능', value: 'AI' },
                { label: '클라우드', value: 'CLOUD' },
              ]}
              placeholder="과정을 선택해주세요."
              required
              disabled={isSubmitting}
            />
          </>
        )}
        <div className="flex gap-1">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button
            type="button"
            isLoading={isSubmitting}
            onClick={handleEditClick}
            name="수정하기"
          >
            수정하기
          </Button>
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="text-sm text-grey hover:text-red transition-colors duration-150 cursor-pointer"
            onClick={() => setIsWithdrawModalOpen(true)}
          >
            탈퇴하기
          </button>
          {isWithdrawModalOpen && (
            <WithdrawModalContent
              onClose={() => setIsWithdrawModalOpen(false)}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}
