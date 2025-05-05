import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { z } from 'zod';

export const newProjectSchema = z.object({
  images: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          '이미지 용량은 최대 5MB 까지 가능합니다.',
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          '지원하지 않는 이미지 형식입니다.',
        ),
    )
    .min(1, '프로젝트 이미지를 1장 이상 업로드해 주세요.')
    .max(5, '프로젝트 이미지는 최대 5장까지 업로드 가능합니다.'),
});

export type NewProject = z.infer<typeof newProjectSchema>;
