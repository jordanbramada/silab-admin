"use server";

import { query } from "@/app/dashboard/praktikum/page";
import { getToken } from "@/app/lib/sessions";

export async function fetchSubjectData(query: query[] | []) {
  try {
    const token = await getToken();
    let response;

    if (query.length !== 0) {
      response = await fetch(
        `https://silab-dev.vercel.app/subject/semesters?${query[0].query}=${query[0].value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );
    } else {
      response = await fetch("https://silab-dev.vercel.app/subject/semesters", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}
