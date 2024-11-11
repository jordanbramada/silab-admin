"use server";

import { getAccessToken, getToken } from "@/app/lib/sessions";
import { Class } from "@/app/types/add-class";

export async function searchAsisten(query: string) {
  try {
    const token = await getToken();
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
  } catch (error) {
    console.log(error);
  }
}

export async function addClasses(newClass: Class) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${process.env.BASE_URL}/subject/classes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject_id: newClass.subject_id,
        subject_class: newClass.subject_class,
        day: newClass.day,
        session: newClass.session,
        quota: newClass.quota,
      }),
      cache: "no-store",
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function getClassSessions() {
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.BASE_URL}/sessions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function getSubjectClasses() {
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.BASE_URL}/subject/classes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}
