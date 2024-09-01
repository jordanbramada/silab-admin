"use server";

import { cookies } from "next/headers";

const token = cookies().get("session")?.value;

export async function addNewAnnouncement(formData: FormData) {
  try {
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
