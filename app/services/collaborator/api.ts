import {
  IAddCollaboratorRequestBody,
  IGetCollaboratorsResponseBody,
} from "@/app/interfaces/collaborator/collaborator.interface";
import satellite from "../satellite";
import { IBaseResponse } from "@/app/interfaces/global/index.interface";

export const postCollaborators = async (
  body: IAddCollaboratorRequestBody,
): Promise<IBaseResponse> => {
  const res = await satellite.post("/collaborator", body);

  return res.data;
};

export const getClassCollaborators = async (
  id: string,
): Promise<IBaseResponse<IGetCollaboratorsResponseBody[]>> => {
  const res = await satellite.get(`/collaborator/${id}`);

  return res.data;
};
