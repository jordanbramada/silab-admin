"use server";

import { cookies } from "next/headers";

export async function getToken(): Promise<string | undefined> {
  const cookie = await cookies();

  const token = cookie.get("accessToken");

  if (token) {
    return token.value;
  }
}

export async function getUserData(): Promise<{
  role: string;
  fullname: string;
  nim: string;
  email: string;
} | null> {
  const cookie = await cookies();

  const role = cookie.get("role");
  const fullname = cookie.get("fullname");
  const nim = cookie.get("nim");
  const email = cookie.get("email");

  if (role && fullname && email && nim) {
    return {
      role: role.value,
      fullname: fullname.value,
      email: email.value,
      nim: nim.value,
    };
  }

  return null;
}

export async function setToken(token: string): Promise<void> {
  const cookie = await cookies();

  if (token) {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString());

    const exp = payload.exp;
    const expiresDate = new Date(exp * 1000);

    cookie.set("accessToken", token, {
      expires: expiresDate,
    });
  }
}

export async function setRefreshToken(token: string): Promise<void> {
  const cookie = await cookies();

  if (token) {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString());

    const exp = payload.exp;
    const expiresDate = new Date(exp * 1000);

    cookie.set("refreshToken", token, {
      expires: expiresDate,
    });
  }
}

export async function setUserRole(role: string): Promise<void> {
  const cookie = await cookies();

  if (role) {
    cookie.set("role", role);
  }
}

export async function deleteToken(): Promise<void> {
  const cookie = await cookies();

  cookie.delete("accessToken");
  cookie.delete("refreshToken");
  cookie.delete("role");
}
