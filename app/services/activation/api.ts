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

export const putUpdatePaymentStatus = async (
  id: string,
): Promise<IBaseResponse> => {
  const res = await satellite.put(`/activation/${id}`);

  return res.data;
};
