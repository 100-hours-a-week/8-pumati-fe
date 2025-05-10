'use client';

import { Button, Textarea, TextInput } from '@/components';
import { useMultiFilesToS3 } from '@/hooks';
import { authAtom } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateProject } from '../../hooks';
import { NewProjectForm, newProjectFormSchema } from '../../schemas';
import { ImageUploader } from '../image-uploader';
import { TagInput } from '../tag';

export function CreateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const auth = useAtomValue(authAtom);
  const methods = useForm<NewProjectForm>({
    defaultValues: {
      images: [],
      title: '',
      introduction: '',
      deploymentUrl: '',
      githubUrl: '',
      detailedDescription: '',
      tags: [],
    },
    resolver: zodResolver(newProjectFormSchema),
  });

  const { mutateAsync: uploadMultiFilesToS3 } = useMultiFilesToS3();
  const { mutateAsync: createProject } = useCreateProject();

  const onSubmit = async (data: NewProjectForm) => {
    if (!auth?.teamId) {
      alert('팀 정보가 없습니다.');
      return;
    }

    setIsSubmitting(true);
    const { urls } = await uploadMultiFilesToS3(data.images);
    const images = urls.map(({ publicUrl }, index) => ({
      url: publicUrl,
      sequence: index + 1,
    }));

    await createProject({
      ...data,
      images,
      teamId: auth.teamId,
    });
    setIsSubmitting(false);
  };
  return (
    <FormProvider {...methods}>
      <form
        className="mt-9 mb-25 w-full max-w-[25rem]"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <ImageUploader
          name="images"
          label="프로젝트 이미지"
          required
          maxImages={5}
          disabled={isSubmitting}
        />
        <TextInput
          name="title"
          label="프로젝트 이름"
          required
          placeholder="프로젝트 이름을 입력해주세요."
          disabled={isSubmitting}
        />
        <TextInput
          name="introduction"
          label="한 줄 소개"
          required
          placeholder="간단한 설명을 입력해주세요."
          disabled={isSubmitting}
        />
        <TextInput
          name="deploymentUrl"
          label="배포 링크"
          required
          placeholder="배포된 프로젝트의 URL을 입력해주세요"
          disabled={isSubmitting}
        />
        <TextInput
          name="githubUrl"
          label="GitHub 링크"
          required
          placeholder="GitHub 링크를 입력해주세요."
          disabled={isSubmitting}
        />
        <Textarea
          name="detailedDescription"
          label="상세 설명"
          required
          placeholder="목적, 기능, 개발 과정 등을 상세하게 작성해주세요."
          rows={6}
          disabled={isSubmitting}
        />
        <TagInput
          name="tags"
          label="태그"
          required
          maxTags={5}
          disabled={isSubmitting}
        />
        <Button type="submit" className="mt-3" isLoading={isSubmitting}>
          생성하기
        </Button>
      </form>
    </FormProvider>
  );
}
