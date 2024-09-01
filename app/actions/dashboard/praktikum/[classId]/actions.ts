"use server";

import { cookies } from "next/headers";

export async function fetchClassDetails(classId: string) {
  const token = cookies().get("session")?.value;
  const response = await fetch(
    `https://silab-dev.vercel.app/class/${classId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    },
  );

  const responseData = await response.json();

  return responseData;
}
