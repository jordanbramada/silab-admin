import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import satellite from "../satellite";
import { IGetActivationResponseBody } from "@/app/interfaces/activation/activation.interface";

export const getAllActivation = async (
  status?: string,
  name?: string,
): Promise<IBaseResponse<IGetActivationResponseBody[]>> => {
  const res = await satellite.get(`/activation/?status=${status}&name=${name}`);

  return res.data;
};
