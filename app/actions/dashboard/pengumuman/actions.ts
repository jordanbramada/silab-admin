"use server";

import { getToken } from "@/app/lib/sessions";

export async function addNewAnnouncement(formData: FormData) {
  try {
    const token = await getToken();
    const response = await fetch("https://silab-dev.vercel.app/announcement/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function getAnnouncementList(query: boolean | "") {
  try {
    const token = await getToken();
    const response = await fetch(
      `https://silab-dev.vercel.app/announcement?query=${query}`,
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
