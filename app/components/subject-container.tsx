import Image from "next/image";
import { SubjectBySemester } from "../types/subject-by-semester";

interface SubjectContainerProps {
  subject: SubjectBySemester;
  onSubjectSelected: (value: SubjectBySemester) => void;
}

export default function SubjectContainer({
  subject,
  onSubjectSelected,
}: SubjectContainerProps) {
  return (
    <button
      onClick={() => {
        onSubjectSelected(subject);
      }}
      className="flex flex-row items-center justify-between rounded-lg bg-white p-[15px] hover:bg-[#BFD9EF] hover:text-[#3272CA]"
    >
      <p className="text-[16px] font-semibold">{subject.subject_name}</p>
      <div className="relative h-4 w-4">
        <Image
          src={"/down.png"}
          alt="chevron down"
          fill
          style={{ objectFit: "contain" }}
          className="-rotate-90"
        />
      </div>
    </button>
  );
}
