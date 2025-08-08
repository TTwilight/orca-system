import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 需要认证的路由
const protectedRoutes = [
  '/user/profile',
  '/user/list',
];

// 不需要认证的路由
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // 检查是否是受保护的路由
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  // 检查是否是公开路由
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // 如果是受保护的路由且没有token，重定向到登录页
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 如果已登录且访问登录相关页面，重定向到首页
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 配置匹配的路由
export const config = {
  matcher: [
    /*
     * 匹配所有需要认证和不需要认证的路由
     * - /user/profile
     * - /user/list
     * - /login
     * - /register
     * - /forgot-password
     * - /reset-password
     */
    '/user/:path*',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ],
};