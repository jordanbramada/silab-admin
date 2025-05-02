import Image from "next/image";
import AddCollaboratorsButton from "@/app/components/praktikum/add-collaborators-button";
import { IGetClassByIdResponseBody } from "@/app/interfaces/class/class.interface";
import useAuthStore from "@/app/store/useAuthStore";

interface IClassDetailBox {
  data: IGetClassByIdResponseBody;
}

const ClassDetailsBox: React.FC<IClassDetailBox> = ({ data }) => {
  const { userData } = useAuthStore();

  return (
    <div className="flex h-[150px] w-full flex-row justify-between space-x-6 rounded-[20px] bg-white p-5">
      <div className="flex h-full flex-col space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Hari, Jam</p>
        <p className="text-[18px] font-semibold text-black">
          {data.day}, <br /> {data.startAt} - {data.endAt}
        </p>
      </div>
      <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
      <div className="flex h-full flex-col space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Dosen</p>
        <p className="text-[18px] font-semibold text-black">{data.lecturer}</p>
      </div>
      <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
      <div className="flex h-full flex-col space-y-4">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[16px] font-semibold text-[#5E6278]">
            Asisten Praktikum
          </p>
          {userData?.role === "LABORAN" && (
            <AddCollaboratorsButton classId={data.id} />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          {/* asprak */}
          {/* {assistant.length !== 0 &&
            assistant.map((assistant) => (
              <div className="flex flex-row space-x-[10px]" key={assistant}>
                <div className="h-full w-[6px] rounded-full bg-[#D2E3F1]"></div>
                <p className="text-[18px] font-semibold text-black">
                  {assistant}
                </p>
              </div>
            ))}
          {assistant.length === 0 && (
            <div className="flex flex-row space-x-[10px]">
              <p className="text-[18px] font-semibold text-black">
                Asisten Praktikum Belum Ditambahkan
              </p>
            </div>
          )} */}
        </div>
      </div>
      <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
      <div className="flex h-full flex-col space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Kuota</p>
        <p className="text-[18px] font-semibold text-black">
          {data.participants} / {data.quota}
        </p>
      </div>
      <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
      <div className="flex h-full w-[100px] flex-col justify-between space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Modul</p>
        <button className="flex w-full flex-row items-center justify-between">
          <p className="w-[53px] text-start text-[14px] font-semibold leading-none text-[#3272CA]">
            Click to Open
          </p>
          <div className="relative h-[24px] w-[24px]">
            <Image
              src={"/open.png"}
              fill
              alt="open module"
              style={{ objectFit: "contain" }}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ClassDetailsBox;
