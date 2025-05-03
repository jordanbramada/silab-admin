export interface IGetSubjectResponseBody {
  id: string;
  subject_code: string;
  subject_name: string;
  semester: string;
  lecturer: string;
}

export interface IAddSubjectRequestBody {
  subject_code: string;
  subject_name: string;
  semester: string;
  lecturer_id: string;
}
