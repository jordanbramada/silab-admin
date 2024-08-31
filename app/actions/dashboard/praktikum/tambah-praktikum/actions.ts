"use server";

import { cookies } from "next/headers";

const token = cookies().get("session")?.value;

export async function searchAsisten(query: string) {
  const response = await fetch(
    `https://silab-dev.vercel.app/user/asisten?query=${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const responseData = await response.json();

  return responseData;
}
