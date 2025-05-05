import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { z } from 'zod';

export const tagSchema = z
  .string()
  .min(2, '태그는 2~20자 이내로 입력해주세요.')
  .max(20, '태그는 2~20자 이내로 입력해주세요.')
  .regex(/^\S+$/, { message: '태그는 공백을 포함할 수 없습니다.' })
  .regex(/^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/, {
    message: '태그는 특수문자를 포함할 수 없습니다.',
  });

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
  description: z
    .string()
    .min(1, { message: '프로젝트 상세 설명을 입력해주세요.' })
    .max(1000, '최대 1000자까지 입력 가능합니다.'),
  tags: z.array(tagSchema).min(1, { message: '태그를 입력해주세요.' }),
});

export type NewProject = z.infer<typeof newProjectSchema>;
