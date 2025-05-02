import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import satellite from "../satellite";
import {
  IGetClassByIdResponseBody,
  IGetClassResponseBody,
} from "@/app/interfaces/class/class.interface";

export const getAllClass = async () => {
  const res =
    await satellite.get<IBaseResponse<IGetClassResponseBody[]>>("/class");

  return res.data;
};

export const getClassById = async (id: string) => {
  const res = await satellite.get<IBaseResponse<IGetClassByIdResponseBody>>(
    `/class/${id}`,
  );

  return res.data;
};
