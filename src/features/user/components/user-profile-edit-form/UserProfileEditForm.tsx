'use client';

import { Button, Dropdown, TextInput } from '@/components';
import { useTeamList } from '@/features/auth/hooks';
import { useUploadFileToS3 } from '@/hooks';
import { accessTokenAtom, authAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { FormProvider, useWatch } from 'react-hook-form';
import { useEditUserProfile, useUserProfileEditForm } from '../../hooks';
import {
  UserProfileEditData,
  UserProfileEditForm as UserProfileEditFormType,
} from '../../schemas';
import { ImageUploader } from '../image-uploader';

export function UserProfileEditForm() {
  const authData = useAtomValue(authAtom);
  const accessToken = useAtomValue(accessTokenAtom);
  const { termOptions, teamNumberOptions } = useTeamList();

  if (!authData || !accessToken) {
    // 에러 throw 하고 에러바운더리로 처리
    return null;
  }

  const methods = useUserProfileEditForm(authData);
  const { handleSubmit, control } = methods;
  const { term } = useWatch({ control });

  const { mutate: editUserProfile } = useEditUserProfile(accessToken);
  const { mutateAsync: getPresignedUrl } = useUploadFileToS3();

  const onSubmit = async (data: UserProfileEditFormType) => {
    const userData: UserProfileEditData = {
      ...data,
      profileImageUrl: authData.profileImageUrl,
      mailConsent: true,
    };

    if (data.profileImageUrl && data.profileImageUrl.file) {
      const { publicUrl } = await getPresignedUrl(data.profileImageUrl.file);
      userData.profileImageUrl = publicUrl;
    }

    editUserProfile(userData);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-9">
        <ImageUploader label="프로필 이미지" name="profileImageUrl" />
        <TextInput
          label="이름"
          name="name"
          placeholder="이름을 입력해주세요."
          required
        />
        <TextInput
          label="닉네임"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          required
        />
        {authData.course && (
          <>
            <Dropdown
              label="기수"
              name="term"
              options={termOptions || []}
              placeholder="기수를 선택해주세요."
              required
            />
            <Dropdown
              label="팀(조)"
              name="teamNumber"
              options={teamNumberOptions[term ?? 0] || []}
              placeholder="팀(조)을 선택해주세요."
              disabled={!term}
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
            />
          </>
        )}
        <Button type="submit">수정하기</Button>
      </form>
    </FormProvider>
  );
}
