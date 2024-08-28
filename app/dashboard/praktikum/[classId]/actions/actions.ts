"use server";

import { cookies } from "next/headers";

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

export async function fetchClassDetails(classId: string) {
  const token = cookies().get("session")?.value;

  const response = await fetch(`https://silab-dev.vercel.app/${classId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const responseData = await response.json();

  return responseData;
}
