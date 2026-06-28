import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
  "/login",
  "/register",
  "/signup",
  "/verify-email",
  "/forgot-password",
];

const protectedRoutes = ["/admin", "/dashboard"];

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.includes(pathname);
  
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: 'experimental-edge',
  matcher: [
    "/login",
    "/register",
    "/signup",
    "/verify-email",
    "/forgot-password",
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};