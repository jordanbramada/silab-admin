import { Class } from "./class";

export type Subject = {
  id: string;
  name: string;
  lecturer: string;
  semester: number;
  classes: Class[];
};
