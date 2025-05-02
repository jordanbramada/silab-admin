import { IGetClassByIdResponseBody } from "@/app/interfaces/class/class.interface";

interface IClassTitleHeaderProps {
  data: IGetClassByIdResponseBody;
}

const ClassTitleHeader: React.FC<IClassTitleHeaderProps> = ({ data }) => {
  return (
    <div className="flex w-full flex-col">
      <p className="text-[18px] font-semibold text-[#5E6278]">
        Semester {data.semester}
      </p>
      <p className="text-[32px] font-bold text-black">
        Praktikum {data.subject_name}
      </p>
    </div>
  );
};

export default ClassTitleHeader;
