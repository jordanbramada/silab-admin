import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import satellite from "../satellite";
import { IGetUserResponseBody } from "@/app/interfaces/user/user.interface";

export const getDosen = async (): Promise<
  IBaseResponse<IGetUserResponseBody[]>
> => {
  const res = await satellite.get(`/user/dosen`);

  return res.data;
};
