import {
  IAddAnnouncementRequestBody,
  IGetAllAnnouncementsResponseBody,
} from "@/app/interfaces/announcement/announcement.interface";
import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import satellite from "../satellite";

export const postAnnouncement = async (
  body: IAddAnnouncementRequestBody,
): Promise<IBaseResponse> => {
  const res = await satellite.post("/announcement", body);

  return res.data;
};

export const getAllAnnouncements = async (): Promise<
  IBaseResponse<IGetAllAnnouncementsResponseBody[]>
> => {
  const res = await satellite.get("/announcement");

  return res.data;
};

export const getAnnouncementById = async (
  id: string,
): Promise<IBaseResponse<IGetAllAnnouncementsResponseBody>> => {
  const res = await satellite.get(`/announcement/${id}`);

  return res.data;
};
