"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.TOKEN_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string | undefined): Promise<any> {
  if (input !== undefined) {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }
  return;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function setCookies(session: any, expiry: Object) {
  cookies().set("session", session, expiry);
}

export async function getToken() {
  return cookies().get("session")?.value;
}

export async function signOut() {
  cookies().delete("session");
  redirect("/");
}
