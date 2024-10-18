import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const publicPaths = ['/', '/login', '/register'];

  if (publicPaths.includes(pathname) || token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|about|google|favicon.ico).*)',
  ],
};



// export { default } from "next-auth/middleware"

// export const config = { matcher: [
//     "/dashboard",
//     "/current-portfolio",
//     "/transactions",
//     "/equity-curve",
//     "/trade-sheet",
//     "/trade-statistics",
//     "/users",

// ]}