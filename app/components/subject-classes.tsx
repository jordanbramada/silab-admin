import { getAccessToken } from "../lib/sessions";
import ClassCard from "./praktikum/class-card";

interface SubjectClassesCardProps {
  subject_name: string;
}

export default async function SubjectClasses({
  subject_name,
}: SubjectClassesCardProps) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${process.env.BASE_URL}/subject/classes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  const responseData = await response.json();
  const subjectClasses = responseData["data"] as SubjectClass[];
  const filteredSubjectClasses = subjectClasses.filter(
    (value) => value.subject_name === subject_name
  );

  return (
    <div className="mt-10 flex h-full w-full flex-row flex-wrap gap-4">
      {filteredSubjectClasses.map((subjectClass) => (
        <ClassCard subjectClass={subjectClass} key={subjectClass.id} />
      ))}
    </div>
  );
}
