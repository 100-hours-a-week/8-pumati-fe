'use client';

import { Button, Textarea, TextInput } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { NewProject, newProjectSchema } from '../../schemas';
import { ImageUploader } from '../image-uploader';
import { TagInput } from '../tag';

export function CreateForm() {
  const methods = useForm<NewProject>({
    defaultValues: {
      images: [],
      tags: [],
      description: '',
    },
    resolver: zodResolver(newProjectSchema),
  });

  const onSubmit = (data: NewProject) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        className="mt-9 w-full max-w-[25rem]"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <ImageUploader
          name="images"
          label="프로젝트 이미지"
          required
          maxImages={5}
        />
        <TextInput
          name="title"
          label="프로젝트 이름"
          required
          placeholder="프로젝트 이름을 입력해주세요."
        />
        <Textarea
          name="description"
          label="상세 설명"
          required
          placeholder="목적, 기능, 개발 과정 등을 상세하게 작성해주세요."
          rows={6}
        />
        <TagInput name="tags" label="태그" required maxTags={5} />
        <Button type="submit">생성하기</Button>
      </form>
    </FormProvider>
  );
}
