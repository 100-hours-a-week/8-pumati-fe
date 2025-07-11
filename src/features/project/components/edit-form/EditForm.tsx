'use client';

import { Button, Textarea, TextInput } from '@/components';
import { PROJECT_PATH } from '@/constants';
import { EditBadge } from '@/features/badge/components';
import { useMultiFilesToS3 } from '@/hooks';
import { authAtom } from '@/store/atoms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useEditProject } from '../../hooks';
import {
  EditProjectForm,
  editProjectFormSchema,
  NewProject,
  ProjectDetail,
} from '../../schemas';
import { ImageUploader } from '../image-uploader';
import { TagInput } from '../tag';
import { DeleteProjectModalContent } from './DeleteProjectModalContent';

type EditFormProps = {
  project: ProjectDetail;
};

export function EditForm({ project }: EditFormProps) {
  const {
    id,
    images,
    teamId,
    title,
    introduction,
    deploymentUrl,
    githubUrl,
    badgeImageUrl,
    detailedDescription,
    tags,
  } = project;
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const authData = useAtomValue(authAtom);

  const methods = useForm<EditProjectForm>({
    defaultValues: {
      images: images.map((image) => ({ url: image.url })),
      title,
      introduction,
      deploymentUrl,
      githubUrl,
      detailedDescription,
      tags: tags.map((tag) => tag.content),
    },
    resolver: zodResolver(editProjectFormSchema),
  });

  const { mutateAsync: uploadMultiFilesToS3 } = useMultiFilesToS3();
  const { mutate: editProject } = useEditProject(project.id);

  const onSubmit = async (data: EditProjectForm) => {
    if (!authData?.teamId) {
      alert('팀 정보가 없습니다.');
      return;
    }

    setIsSubmitting(true);
    const prevImageUrls = data.images
      .filter((image) => image?.url)
      .map((image) => image!.url);
    const newFiles = data.images
      .filter((image) => image?.file)
      .map((image) => image!.file) as File[];

    let newUrls: string[] = [];
    if (newFiles.length) {
      const { urls } = await uploadMultiFilesToS3(newFiles);
      newUrls = urls.map((url) => url.publicUrl);
    }

    const curImageUrls = [...prevImageUrls, ...newUrls].map((url, index) => ({
      url,
      sequence: index + 1,
    })) as NewProject['images'];

    editProject(
      {
        ...data,
        images: curImageUrls,
        teamId: authData.teamId,
      },
      {
        onSuccess: () => {
          router.replace(PROJECT_PATH.DETAIL(id.toString()));
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  useEffect(() => {
    if (authData && teamId !== authData.teamId) {
      alert('프로젝트 수정 권한이 없습니다.');
      router.replace(PROJECT_PATH.DETAIL(id.toString()));
    }
  }, [teamId, authData, router, id]);
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
        <EditBadge badgeImageUrl={badgeImageUrl} />
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
          placeholder="배포된 프로젝트의 URL을 입력해주세요. (https://~)"
          disabled={isSubmitting}
        />
        <TextInput
          name="githubUrl"
          label="GitHub 링크"
          required
          placeholder="GitHub 링크를 입력해주세요. (https://~)"
          disabled={isSubmitting}
          description="예시: https://github.com/orgs/100-hours-a-week/teams/8"
        />
        <Textarea
          name="detailedDescription"
          label="상세 설명"
          required
          placeholder="목적, 기능, 개발 과정 등을 상세하게 작성해주세요! (마크다운은 지원하지 않습니다)"
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
        <Button
          type="submit"
          className="mt-3"
          isLoading={isSubmitting}
          name="수정하기"
        >
          수정하기
        </Button>
        <div className="flex justify-center mt-3">
          <button
            type="button"
            className="cursor-pointer text-sm text-grey hover:text-red-500 hover:underline"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            삭제하기
          </button>
          {isDeleteModalOpen && (
            <DeleteProjectModalContent
              projectId={id}
              onClose={() => setIsDeleteModalOpen(false)}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}
