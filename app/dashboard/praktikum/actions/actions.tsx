"use server";

import { cookies } from "next/headers";
import { query } from "../page";

export type Subject = {
  id: string;
  name: string;
  lecturer: string;
  semester: number;
  classes: Class[];
};

export type Class = {
  id: string;
  subject: string;
  name: string;
  quota: number;
  isFull: boolean;
  day: string;
  startAt: string;
  endAt: string;
  ruang: string;
  participants: string[];
  learningModule: string[];
};

export type SubjectBySemester = {
  _id: string;
  subjects: Subject[];
};

export async function fetchSubjectData(query: query[] | []) {
  let response;
  const token = cookies().get("session")?.value;

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

export async function getSubjectDetails(
  subjectId: string | null,
): Promise<Subject | undefined> {
  const cookie = cookies().get("session")?.value;

  try {
    const response = await fetch(
      `https://silab-dev.vercel.app/subject/${subjectId}`,
      {
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      },
    );
    const responseData = await response.json();
    return responseData["data"] as Subject;
  } catch (error) {
    console.log(error);
  }
}
