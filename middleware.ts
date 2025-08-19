import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;
  console.log('🚀 middleware :: didLogin:', didLogin);
  if (!didLogin) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url)
    );
    // return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
<<<<<<< HEAD
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|api/sendmail|login|regist|passwdcheck|registcheck|login/error|$).*)',
=======
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|login|regist|passwdcheck|registcheck|my|$).*)',
>>>>>>> b8d05ce (my)
  ],
};
