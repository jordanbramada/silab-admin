import { useEffect } from "react";
import useClassStore from "../store/useClassStore";
import ClassCard from "./praktikum/class-card";

interface ISubjectClassesCardProps {
  subject_name: string;
}

const SubjectClasses: React.FC<ISubjectClassesCardProps> = ({
  subject_name,
}) => {
  const { getAllClass, classesData } = useClassStore();

  useEffect(() => {
    getAllClass();
  }, [getAllClass]);

  const filteredSubjectClasses = classesData.filter(
    (value) => value.subject_name === subject_name,
  );

  return (
    <div className="mt-10 flex h-full w-full flex-row flex-wrap gap-4">
      {filteredSubjectClasses.map((subjectClass) => (
        <ClassCard subjectClass={subjectClass} key={subjectClass.id} />
      ))}
    </div>
  );
};

export default SubjectClasses;
