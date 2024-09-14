"use server";

import { getAccessToken } from "@/app/lib/sessions";

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

    const response = await fetch(`http://10.4.52.201:3001/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: body,
    });

    const responseData = await response.json();

    if (responseData["status"] === "Success") {
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
}
