'use client';

import { Button, TextInput } from '@/components';
import { useFormContext } from 'react-hook-form';
import { ImageUploader } from '../../image-uploader';

type FirstStepProps = {
  onNext: () => void;
};

export function FirstStep({ onNext }: FirstStepProps) {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const valid = await trigger(['name', 'nickname']);

    if (valid) onNext();
  };
  return (
    <>
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
      <Button type="button" size="full" className="mt-3" onClick={handleNext}>
        다음
      </Button>
    </>
  );
}
