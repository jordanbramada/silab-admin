import {
  ILoginRequestBody,
  ILoginResponseBody,
  IMeResponseBody,
} from "@/app/interfaces/auth/auth.interface";
import satellite from "../satellite";
import { IBaseResponse } from "@/app/interfaces/global/index.interface";

export const postLogin = async (body: ILoginRequestBody) => {
  const res = await satellite.post<IBaseResponse<ILoginResponseBody>>(
    "/auth/login",
    body,
  );

  return res.data;
};

export const getMe = async () => {
  const res = await satellite.get<IBaseResponse<IMeResponseBody>>("/auth/me");

  return res.data;
};
