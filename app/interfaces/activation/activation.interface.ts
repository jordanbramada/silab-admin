export interface IGetActivationResponseBody {
  id: string;
  nim: string;
  student: string;
  status: boolean;
  subjects: IActivationSubjects[];
}

interface IActivationSubjects {
  subject_name: string;
  semester: string;
}
