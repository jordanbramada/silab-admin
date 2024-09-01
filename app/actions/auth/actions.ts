"use server";

import { encrypt, setCookies } from "@/app/lib/sessions";
import { FormEvent } from "react";

export async function handleFormSubmitLogin(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("https://silab-dev.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const responseData = await response.json();
    const nim = responseData["data"]["nim"];

    const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
    const session = await encrypt({ nim, expires });

    setCookies(session, { expires, httpOnly: true });
  } catch (error) {
    console.log(error);
  }
}
