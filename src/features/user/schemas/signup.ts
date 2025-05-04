import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const signupSchema = z.object({
  profileImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      '이미지 용량은 최대 5MB 까지 가능합니다.',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      '지원하지 않는 이미지 형식입니다.',
    )
    .optional(),
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 2~10자 이내로 입력해주세요.')
    .max(10, '이름은 2~10자 이내로 입력해주세요.')
    .regex(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다.'),
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요.')
    .min(2, '닉네임은 2~50자 이내로 입력해주세요.')
    .max(50, '닉네임은 2~50자 이내로 입력해주세요.')
    .regex(/^[a-z]+$/, '닉네임은 영어 소문자만 입력 가능합니다.'),
  code: z
    .string()
    .length(4, '인증 코드는 4자리 숫자여야 합니다.')
    .regex(/^\d{4}$/, '인증 코드는 숫자만 입력 가능합니다.'),
  term: z.number({
    required_error: '기수를 선택해주세요.',
  }),
  team: z.number({
    required_error: '팀(조)을 선택해주세요.',
  }),
  course: z.string({
    required_error: '과정명을 선택해주세요.',
  }),
});

export type Signup = z.infer<typeof signupSchema>;
