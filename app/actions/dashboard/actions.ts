"use server";

import { getAccessToken, getToken } from "@/app/lib/sessions";

export async function getTotalMatkul() {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${process.env.BASE_URL}/subject/`, {
      cache: "no-store",
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

export async function getTotalRegisteredStudents() {
  try {
    const token = await getToken();
    const response = await fetch(
      "https://silab-dev.vercel.app/selected-subject/?registered=1",
      {
        cache: "no-store",
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

export async function getUnpaidStudents() {
  try {
    const token = await getToken();
    const response = await fetch(
      "https://silab-dev.vercel.app/user/?paid=false",
      {
        cache: "no-store",
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

export async function getAllStudents() {
  try {
    const token = await getToken();
    const response = await fetch(
      "https://silab-dev.vercel.app/user/?role=mahasiswa",
      {
        cache: "no-store",
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
