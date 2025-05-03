export interface IGetClassResponseBody {
  id: string;
  subjectId: string;
  name: string;
  subject_name: string;
  quota: number;
  day: string;
  startAt: string;
  endAt: string;
  participants: number;
}

export interface IGetClassByIdResponseBody {
  id: string;
  subjectId: string;
  name: string;
  subject_name: string;
  semester: string;
  lecturer: string;
  quota: number;
  day: string;
  startAt: string;
  endAt: string;
  participants: number;
}

export interface IAddClassRequestBody {
  subjectId: string;
  name: string;
  quota: number;
  day: string;
  startAt: string;
  endAt: string;
  room: string;
}
