"use server";

import { cookies } from "next/headers";

const token = cookies().get("session")?.value;

export async function getTotalMatkul(): Promise<number | undefined> {
  try {
    const response = await fetch("https://silab-dev.vercel.app/subject/", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData["data"].length;
  } catch (error) {
    console.log(error);
  }
}

export async function getTotalRegisteredStudents(): Promise<
  number | undefined
> {
  try {
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
    return responseData["data"].length;
  } catch (error) {
    console.log(error);
  }
}

export async function getPaidStudents(): Promise<number | undefined> {
  try {
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
    return responseData["data"].length;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllStudents(): Promise<number | undefined> {
  try {
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
    return responseData["data"].length;
  } catch (error) {
    console.log(error);
  }
}
