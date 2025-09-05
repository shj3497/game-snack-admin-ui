import {NextRequest, NextResponse} from 'next/server';
import {getToken} from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // 임시 로그
  console.log('X-Forwarded-Proto:', request.headers.get('x-forwarded-proto'));
  console.log('Cookie:', request.headers.get('cookie'));
  console.log('Host:', request.headers.get('host'));
  console.log('User-Agent:', request.headers.get('user-agent'));
  console.log('Method:', request.method);
  console.log('URL:', request.nextUrl.href);
  console.log('NODE_ENV:', process.env.NODE_ENV);

  const {origin} = request.nextUrl;
  let token = null;
  try {
    token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });
  } catch (error) {
    console.error('getToken error:', error);
    return NextResponse.redirect(`${origin}/auth/signin`);
  }
  if (token === null) {
    // 토큰이 없으면 로그인페이지로 리다이렉트
    return NextResponse.redirect(`${origin}/auth/signin`);
  }

  // 사용자가 루트 경로('/')로 접근했고, 토큰이 있는 경우 /workspace로 리디렉션
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(`${origin}/workspace`);
  }

  if (
    token.role !== 'SUPER_ADMIN' &&
    (request.nextUrl.pathname.includes('superspace') ||
      request.nextUrl.pathname === '/')
  ) {
    // 슈퍼관리자가 아니면 슈퍼스페이스 페이지 접근 불가
    return NextResponse.redirect(`${origin}/workspace`);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/', '/workspace/:path*', '/superspace/:path*'],
};
