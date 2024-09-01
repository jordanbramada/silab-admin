export type Class = {
  subjectId: string;
  name: string;
  day: string;
  startAt: string;
  endAt: string;
  ruang: string;
  assistants: string[] | [];
  quota: number;
  isFull: boolean;
  participants: string[] | [];
  learningModule: string[] | [];
};
