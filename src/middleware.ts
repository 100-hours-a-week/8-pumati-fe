// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AUTH_PATH, ROOT_PATH } from './constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === AUTH_PATH.SIGN_UP) {
    const referer = request.headers.get('referer') || '';
    const origin = request.nextUrl.origin;

    if (!referer.startsWith(origin)) {
      const url = request.nextUrl.clone();
      url.pathname = ROOT_PATH;

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [AUTH_PATH.SIGN_UP],
};
