"use server";

import { getAccessToken } from "@/app/lib/sessions";

export async function getLecturers() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.BASE_URL}/lecturers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function addSubjectFormSubmit(
  formData: FormData,
  semester: string,
  lecturer: string,
) {
  try {
    const accessToken = await getAccessToken();

    const credit = formData.get("credit");
    const subjectCode = formData.get("subject_code");
    const subjectName = formData.get("subject_name");

    const body = JSON.stringify({
      subject_code: subjectCode,
      subject_name: subjectName,
      credit: credit,
      semester: semester,
      lecturer: lecturer,
    });

    const response = await fetch(`${process.env.BASE_URL}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: body,
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
}
