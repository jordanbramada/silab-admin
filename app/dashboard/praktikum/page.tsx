import AddPracticumBanner from "@/app/components/add-practicum-banner";
import ClassCard from "@/app/components/class-card";
import SubjectsList from "@/app/components/subjects-list";
import { getAccessToken, getRole } from "@/app/lib/sessions";

export default async function Praktikum() {
  const role: string = await getRole();

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

  return (
    <div className="h-full w-full space-y-10 overflow-auto overscroll-contain">
      <AddPracticumBanner />
      {role === "laborant" && <SubjectsList />}
      {role === "student" &&
        subjectClasses.map((subjectClass) => (
          <ClassCard subjectClass={subjectClass} key={subjectClass.id} />
        ))}
    </div>
  );
}
