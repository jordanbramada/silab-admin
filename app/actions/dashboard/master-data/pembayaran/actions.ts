"use server";

import { getToken } from "@/app/utils/cookie";

export async function getStudentPaymentStatus() {
  try {
    const accessToken = await getToken();

    const response = await fetch(`${process.env.BASE_URL}/activations/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function updateStudentPaymentStatus(
  status: string,
  activationId: string | undefined,
) {
  try {
    const accessToken = await getToken();

    const response = await fetch(
      `${process.env.BASE_URL}/activations/${activationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status: status,
        }),
      },
    );

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}
