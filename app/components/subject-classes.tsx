import { useEffect, useState } from "react";
import { getSubjectClasses } from "../actions/dashboard/praktikum/tambah-praktikum/actions";

interface SubjectClassesCardProps {
  subject_name: string;
}

export default function SubjectClassesCard({
  subject_name,
}: SubjectClassesCardProps) {
  const [subjectClasses, setSubjectClasses] = useState<SubjectClass[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSubjectClasses();

        if (response["status"] === "success") {
          const subjectClasses = response["data"] as SubjectClass[];
          const filteredSubjectClasses = subjectClasses.filter(
            (value) => value.subject_name === subject_name,
          );
          setSubjectClasses(filteredSubjectClasses);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [subject_name]);

  return (
    <div className="mt-10 flex h-full w-full flex-row flex-wrap gap-4">
      {subjectClasses.map((subjectClass) => (
        <div
          key={subjectClass.id}
          className="flex h-[150px] w-1/5 flex-col justify-between rounded-2xl bg-[#3272CA] p-3"
        >
          <div className="flex flex-row justify-between">
            <p className="text-3xl font-bold text-[#FFBF01]">
              {subjectClass.subject_class}
            </p>
            <div className="flex flex-row">
              <p className="text-3xl font-bold text-[#FFBF01]">
                {subjectClass.registered_students}
              </p>
              <p className="text-3xl font-bold text-[#FFBF01]">/</p>
              <p className="text-3xl font-bold text-[#FFBF01]">
                {subjectClass.quota}
              </p>
            </div>
          </div>
          <div className="flex flex-col text-white">
            <p className="text-lg">{subjectClass.subject_name}</p>
            <p className="text-sm">
              {subjectClass.day}, Sesi ke - {subjectClass.session}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
