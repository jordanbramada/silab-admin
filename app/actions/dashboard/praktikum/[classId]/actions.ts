"use server";

import { cookies } from "next/headers";

const token = cookies().get("session")?.value;

export async function fetchClassDetails(classId: string) {
  const response = await fetch(`https://silab-dev.vercel.app/${classId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const responseData = await response.json();

  return responseData;
}
