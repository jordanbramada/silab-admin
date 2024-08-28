import { cookies } from "next/headers";
import { Class, Subject } from "./actions/actions";
import Image from "next/image";

export default async function ClassDetails({
  params,
}: {
  params: { classId: string };
}) {
  const token = cookies().get("session")?.value;
  const response = await fetch(
    `https://silab-dev.vercel.app/class/${params.classId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  const classDetails = data["data"] as Class;
  const subject = data["data"]["subject"] as Subject;

  return (
    <div className="flex h-full w-full flex-col space-y-10">
      <div className="flex w-full flex-col">
        <p className="text-[18px] font-semibold text-[#5E6278]">
          Semester {subject.semester}
        </p>
        <p className="text-[32px] font-bold text-black">
          Praktikum {subject.name} Kelas({classDetails.name})
        </p>
      </div>
      <div className="flex h-[150px] w-full flex-row justify-between space-x-6 rounded-[20px] bg-white p-5">
        <div className="flex h-full flex-col space-y-4">
          <p className="text-[16px] font-semibold text-[#5E6278]">Hari, Jam</p>
          <p className="text-[18px] font-semibold text-black">
            {classDetails.day}, <br /> {classDetails.startAt} -{" "}
            {classDetails.endAt}
          </p>
        </div>
        <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
        <div className="flex h-full flex-col space-y-4">
          <p className="text-[16px] font-semibold text-[#5E6278]">Dosen</p>
          <p className="text-[18px] font-semibold text-black">
            {subject.lecturer}
          </p>
        </div>
        <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
        <div className="flex h-full flex-col space-y-4">
          <p className="text-[16px] font-semibold text-[#5E6278]">
            Asisten Praktikum
          </p>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row space-x-[10px]">
              <div className="h-full w-[6px] rounded-full bg-[#D2E3F1]"></div>
              <p className="text-[18px] font-semibold text-black">
                Naufal Firoos Asy Syarif
              </p>
            </div>
            <div className="flex flex-row space-x-[10px]">
              <div className="h-full w-[6px] rounded-full bg-[#D2E3F1]"></div>
              <p className="text-[18px] font-semibold text-black">
                Naufal Firoos Asy Syarif
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
        <div className="flex h-full flex-col space-y-4">
          <p className="text-[16px] font-semibold text-[#5E6278]">Kuota</p>
          <p className="text-[18px] font-semibold text-black">
            {classDetails.participants.length} / {classDetails.quota}
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
    </div>
  );
}
