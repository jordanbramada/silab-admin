"use server";

import { getToken } from "@/app/lib/sessions";

export async function fetchClassDetails(classId: string) {
  try {
    const token = await getToken();
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
  } catch (error) {
    console.log(error);
  }
}
