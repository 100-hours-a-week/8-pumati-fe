'use client';

import { Button } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { NewProject, newProjectSchema } from '../../schemas';
import { ImageUploader } from '../image-uploader';

export function CreateForm() {
  const methods = useForm<NewProject>({
    defaultValues: {
      images: [],
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
        <Button type="submit">생성하기</Button>
      </form>
    </FormProvider>
  );
}
