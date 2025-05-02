"use server";

import { getToken } from "@/app/utils/cookie";

export async function fetchSubjectData() {
  try {
    const token = await getToken();

    const response = await fetch(`${process.env.BASE_URL}/subjects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchSubjectById(subjectId: string) {
  try {
    const token = await getToken();

    const response = await fetch(
      `${process.env.BASE_URL}/subjects/${subjectId}`,
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
  } catch (error) {
    console.log(error);
  }
}
