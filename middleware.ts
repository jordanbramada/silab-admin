import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/sessions";

const protectedRoutes = ["/dashboard", "/dashboard/:path"];
const publicRoutes = ["/auth", "/"];

export default async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) =>
      path.startsWith(route),
    );
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = cookies().get("session")?.value;

    const session = await decrypt(cookie);
    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if (
      isPublicRoute &&
      session &&
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
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
