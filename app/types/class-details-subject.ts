import { Class } from "./class-details-class";

export type Subject = {
  id: string;
  name: string;
  lecturer: string;
  semester: number;
  classes: Class[];
};
