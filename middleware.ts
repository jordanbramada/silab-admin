import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
const protectedRoutes = ["/dashboard", "/dashboard/:path"];
const publicRoutes = ["/auth", "/"];

export default async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) =>
      path.startsWith(route),
    );
    const isPublicRoute = publicRoutes.includes(path);

    const accessToken = cookies().get("accessToken")?.value;

    if (isProtectedRoute && !accessToken) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if (
      isPublicRoute &&
      accessToken &&
      !req.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
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
