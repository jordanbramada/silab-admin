import { IGetClassResponseBody } from "@/app/interfaces/class/class.interface";
import SmallClassCard from "./small-class-card";

interface ClassesPreviewProps {
  subjectClasses: IGetClassResponseBody[];
}

export default function ClassesPreview({
  subjectClasses,
}: ClassesPreviewProps) {
  return (
    <div className="mt-10 flex w-full flex-row flex-wrap gap-4">
      {subjectClasses.map((subjectClass) => (
        <SmallClassCard subjectClass={subjectClass} key={subjectClass.id} />
      ))}
    </div>
  );
}
