"use server";

import { getAccessToken } from "@/app/lib/sessions";
import { Announcement } from "@/app/types/announcement";

export async function addNewAnnouncement(announcement: Announcement) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${process.env.BASE_URL}/announcements`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(announcement),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function getAnnouncementList() {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${process.env.BASE_URL}/announcements`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
