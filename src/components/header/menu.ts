import { AUTH_PATH, PROJECT_PATH, ROOT_PATH } from '@/constants';

export const MENU_LIST = [
  {
    label: '홈으로',
    href: ROOT_PATH,
  },
  {
    label: '프로젝트',
    href: PROJECT_PATH.ROOT,
  },
  {
    label: '로그인하러 가기',
    href: AUTH_PATH.LOGIN,
  },
];

export const MENU_HEIGHT = `${1 + 3 * MENU_LIST.length}rem`;
