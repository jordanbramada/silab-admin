"use server";

import { getAccessToken } from "@/app/lib/sessions";

export async function fetchClassDetails(classId: string) {
  try {
    const token = await getAccessToken();
    const response = await fetch(
      `${process.env.BASE_URL}/subject/classes/${classId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      },
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUsers(fullname: string | null) {
  try {
    const token = await getAccessToken();
    let response;

    if (fullname) {
      response = await fetch(
        `${process.env.BASE_URL}/users?fullname=${fullname}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
        },
      );
    } else {
      response = await fetch(`${process.env.BASE_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      });
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function postCollaborators(
  collaborators: string[],
  classId: string | undefined,
) {
  try {
    const token = await getAccessToken();
    const body = JSON.stringify({
      subject_class: classId,
      assistants: collaborators,
    });

    const response = await fetch(`${process.env.BASE_URL}/collaborations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body,
      cache: "no-cache",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function postMeeting(
  meetingName: string,
  classId: string | undefined,
) {
  try {
    const token = await getAccessToken();
    const body = JSON.stringify({
      meetingName: meetingName,
    });

    const response = await fetch(
      `${process.env.BASE_URL}/subject/classes/${classId}/meetings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: body,
        cache: "no-cache",
      },
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function getMeetings(classId: string | undefined) {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      `${process.env.BASE_URL}/subject/classes/${classId}/meetings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      },
    );

    const responseData = await response.json();
    console.log(responseData["students"]);
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
