"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function setAccessToken(accessToken: string, expiry: Date) {
  cookies().set({
    name: "accessToken",
    value: accessToken,
    secure: true,
    httpOnly: true,
    expires: expiry,
  });
}

export async function setRefreshToken(refreshToken: string, expiry: Date) {
  cookies().set({
    name: "refreshToken",
    value: refreshToken,
    secure: true,
    httpOnly: true,
    expires: expiry,
  });
}

export async function getAccessToken() {
  return cookies().get("accessToken")?.value;
}

export async function getRefreshToken() {
  return cookies().get("refreshToken")?.value;
}

export async function getToken() {
  return cookies().get("accessToken")?.value;
}

export async function getRole() {
  let role;

  const accessToken = cookies().get("accessToken")?.value;
  if (accessToken) {
    const arrayToken = accessToken.split(".");
    role = JSON.parse(atob(arrayToken[1]))["role"];
  }

  console.log(role);

  return role;
}

export async function signOut() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  redirect("/");
}
