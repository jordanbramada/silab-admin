"use server";

import { getAccessToken, getToken } from "@/app/lib/sessions";

export async function getTotalMatkul() {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${process.env.BASE_URL}/subjects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
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
      `${process.env.BASE_URL}/activations?status=paid`,
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

export async function getUnpaidStudents() {
  try {
    const token = await getToken();
    const response = await fetch(
      `${process.env.BASE_URL}/activations?status=pending`,
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

export async function getAllStudents() {
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.BASE_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSubjectClasses(){
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.BASE_URL}/subject/classes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}