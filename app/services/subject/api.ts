import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import satellite from "../satellite";
import {
  IAddSubjectRequestBody,
  IGetSubjectResponseBody,
} from "@/app/interfaces/subject/subject.interface";
import { IGetActivationResponseBody } from "@/app/interfaces/activation/activation.interface";

export const getAllSubjects = async () => {
  const res =
    await satellite.get<IBaseResponse<IGetSubjectResponseBody[]>>("/subject");

  return res.data;
};

export const getAllRegisteredStudent = async () => {
  const res =
    await satellite.get<IBaseResponse<IGetActivationResponseBody[]>>(
      "/activation",
    );

  return res.data;
};

export const getUnpaidStudents = async () => {
  const res =
    await satellite.get<IBaseResponse<IGetActivationResponseBody[]>>(
      "/activation",
    );

  return res.data;
};

export const addSubject = async (body: IAddSubjectRequestBody) => {
  const res = await satellite.post<IBaseResponse>("/subject", body);

  return res.data;
};
