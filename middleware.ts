import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("accessToken")?.value;

    const isProtectedRoute = pathname.startsWith("/dashboard");
    const isAuthPage = pathname === "/auth";

    if (isProtectedRoute && !token) {
      if (!isAuthPage) {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
    }

    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
