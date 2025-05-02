import {
  IAddClassMeetingRequestBody,
  IGetAllClassMeetingResponseBody,
} from "@/app/interfaces/meeting/meeting.interface";
import satellite from "../satellite";
import { IBaseResponse } from "@/app/interfaces/global/index.interface";

export const postMeeting = async (
  body: IAddClassMeetingRequestBody,
): Promise<IBaseResponse> => {
  const res = await satellite.post("/meeting", body);

  return res.data;
};

export const getMeetings = async (
  classId: string,
): Promise<IBaseResponse<IGetAllClassMeetingResponseBody[]>> => {
  const res = await satellite.get(`/meeting/${classId}`);

  return res.data;
};
