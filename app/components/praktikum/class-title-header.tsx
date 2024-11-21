import { Class } from "../../types/class-details-class";

export default function ClassTitleHeader({ data }: { data: Class }) {
  const { subject_class, semester } = data;
  return (
    <div className="flex w-full flex-col">
      <p className="text-[18px] font-semibold text-[#5E6278]">
        Semester {semester}
      </p>
      <p className="text-[32px] font-bold text-black">
        Praktikum {subject_class}
      </p>
    </div>
  );
}
