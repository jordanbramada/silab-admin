import { Students } from "./students";

export type Meeting = {
  id: string;
  meeting_name: string;
  token: string;
  students: Students[];
};
