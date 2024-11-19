import Link from "next/link";

interface SmallClassCardProps {
  subjectClass: SubjectClass;
}

export default function SmallClassCard({ subjectClass }: SmallClassCardProps) {
  return (
    <Link
      href={`${subjectClass.id}`}
      key={subjectClass.id}
      className="flex h-[140px] w-1/5 flex-col justify-between rounded-2xl bg-[#3272CA] p-3"
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
    </Link>
  );
}
