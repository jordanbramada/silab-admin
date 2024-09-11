"use server";

import { getRole, setAccessToken, setRefreshToken } from "@/app/lib/sessions";
import { redirect } from "next/navigation";

export async function handleFormSubmitLogin(formData: FormData) {
  try {
    const nim = formData.get("nim");
    const password = formData.get("password");

    const response = await fetch(`http://10.4.52.201:3001/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nim, password }),
    });

    const responseData = await response.json();

    if (responseData["status"] === "success") {
      const accessTokenExpiry = new Date(Date.now() + 60 * 60 * 1 * 1000);
      setAccessToken(responseData["data"]["accessToken"], accessTokenExpiry);

      const refreshTokenExpiry = new Date(Date.now() + 60 * 60 * 8 * 1000);
      setRefreshToken(responseData["data"]["refreshToken"], refreshTokenExpiry);
    }
  } catch (error) {
    console.log(error);
  } finally {
    redirect("/dashboard");
  }
}
