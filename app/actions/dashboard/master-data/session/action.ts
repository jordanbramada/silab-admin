"use server";

import { getAccessToken } from "@/app/lib/sessions";

export async function getAllSessions() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.BASE_URL}/sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}
