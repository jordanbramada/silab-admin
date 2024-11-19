"use server";

import { setAccessToken, setRefreshToken } from "@/app/lib/sessions";
import { redirect } from "next/navigation";

export async function handleFormSubmitLogin(formData: FormData) {
  let error: boolean = false;
  let res: any;
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

      error = false;
    } else {
      error = true;
      res = responseData;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (!error) {
      redirect("/dashboard");
    } else {
      return res;
    }
  }
}
