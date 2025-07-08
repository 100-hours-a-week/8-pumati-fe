import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PATH, ROOT_PATH } from './constants';

const UNAUTHENTICATED_ONLY_ROUTES = ['/login', '/signup', '/oauth/callback'];

const PROTECTED_ROUTES = [
  /^\/mypage(\/.*)?$/,
  /^\/projects\/new$/,
  /^\/projects\/[^\/]+\/edit$/,
  /^\/projects\/subscription$/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (UNAUTHENTICATED_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (refreshToken) {
      return NextResponse.redirect(new URL(ROOT_PATH, request.url));
    }
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((pattern) =>
    pattern.test(pathname),
  );

  if (isProtectedRoute) {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.redirect(new URL(AUTH_PATH.LOGIN, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/oauth/callback/:path*',
    '/mypage/:path*',
    '/projects/new',
    '/projects/:path*/edit',
    '/projects/subscription',
  ],
};
