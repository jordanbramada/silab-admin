"use server";

import { getToken } from "@/app/lib/sessions";
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

export async function addClasses(classes: Class[]) {
  try {
    const token = await getToken();
    const response = await fetch("https://silab-dev.vercel.app/class/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ classes: classes }),
      cache: "no-store",
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}
