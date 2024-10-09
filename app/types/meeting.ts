import { Students } from "./students";

export type Meeting = {
  id: string;
  meeting_name: string;
  students: Students[];
};
