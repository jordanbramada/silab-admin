import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/sessions";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/auth", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  let session: string;
  if (cookie !== undefined) {
    session = await decrypt(cookie);

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
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
