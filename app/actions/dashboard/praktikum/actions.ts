"use server";

import { query } from "@/app/dashboard/praktikum/page";
import { cookies } from "next/headers";

const token = cookies().get("session")?.value;

export async function fetchSubjectData(query: query[] | []) {
  let response;

  if (query.length !== 0) {
    response = await fetch(
      `https://silab-dev.vercel.app/subject/semesters?${query[0].query}=${query[0].value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      },
    );
  } else {
    response = await fetch("https://silab-dev.vercel.app/subject/semesters", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
  }

  const responseData = await response.json();

  return responseData;
}