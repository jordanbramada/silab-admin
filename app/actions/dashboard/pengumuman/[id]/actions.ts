"use server";

import { getToken } from "@/app/lib/sessions";

export async function getAnnouncementDetails(id: string) {
  try {
    const token = await getToken();
    const response = await fetch(
      `https://silab-dev.vercel.app/announcement/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}
