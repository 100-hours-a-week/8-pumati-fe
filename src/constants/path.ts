export const ROOT_PATH = '/';

export const AUTH_PATH = Object.freeze({
  LOGIN: '/login',
  SIGN_UP: '/signup',
});

export const PROJECT_PATH = Object.freeze({
  ROOT: '/projects',
  NEW: '/projects/new',
  DETAIL: (id: string) => `/projects/${id}`,
  EDIT: (id: string) => `/projects/${id}/edit`,
  SUBSCRIPTION: '/projects/subscription',
});

export const USER_PATH = Object.freeze({
  MY_PAGE: '/mypage',
  MY_PAGE_EDIT: '/mypage/edit',
});
