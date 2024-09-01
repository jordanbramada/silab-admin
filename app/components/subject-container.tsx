import Image from "next/image";
import { useRouter } from "next/navigation";
import { Subject } from "../types/subject";

interface SubjectContainerProps {
  subject: Subject;
  onSubjectSelected: (value: Subject) => void;
}

export default function SubjectContainer({
  subject,
  onSubjectSelected,
}: SubjectContainerProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        onSubjectSelected(subject);
      }}
      className="flex flex-row items-center justify-between rounded-lg bg-white p-[15px] hover:bg-[#BFD9EF] hover:text-[#3272CA]"
    >
      <p className="text-[16px] font-semibold">{subject.name}</p>
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
