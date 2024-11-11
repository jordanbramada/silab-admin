import { SubjectStudentPaymentStatus } from "./subject-student-payment-status";

export type StudentPaymentStatus = {
  activation_id: string;
  nim: string;
  student: string;
  status: string;
  subjects: SubjectStudentPaymentStatus[];
};
