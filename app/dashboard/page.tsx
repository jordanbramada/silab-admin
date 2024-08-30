import Image from "next/image";
import {
  getAllStudents,
  getPaidStudents,
  getTotalMatkul,
  getTotalRegisteredStudents,
} from "../actions/dashboard/actions";

export default async function Dashboard() {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex h-[300px] w-full flex-row items-start justify-between">
        <div className="flex w-[534px] flex-col space-y-4">
          <p className="text-[54px] font-bold leading-tight text-[#1d1d1d]">
            Selamat datang di Dashboard{" "}
            <span className="font-extrabold text-[#3272CA]">SILAB.</span>
          </p>
          <p className="text-[24px] font-semibold leading-tight text-[#5E6278]">
            Atur dan pantau semua informasi praktikum dengan mudah di sini.
          </p>
        </div>
        <Image
          src={"illustration-1.svg"}
          alt="illustration"
          width={222}
          height={300}
        />
      </div>
      <div className="mt-6 flex w-full flex-row space-x-5">
        <div className="flex h-[280px] w-1/3 flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <p className="text-7xl font-bold text-[#FFBF01]">
            {getTotalMatkul()}
          </p>
          <div className="flex flex-col text-white">
            <p className="text-[24px] font-bold">Jumlah Praktikum</p>
            <p className="text-[18px] font-semibold">Semester 1 - 8</p>
          </div>
        </div>
        <div className="flex h-[280px] w-1/3 flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <p className="text-7xl font-bold text-[#FFBF01]">
            {getTotalRegisteredStudents()}/{getAllStudents()}
          </p>
          <div className="flex flex-col text-white">
            <p className="text-[24px] font-bold">Jumlah Mahasiswa</p>
            <p className="text-[18px] font-semibold">
              Yang sudah mendaftar praktikum
            </p>
          </div>
        </div>
        <div className="flex h-[280px] w-1/3 flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <p className="text-7xl font-bold text-[#FFBF01]">
            {getPaidStudents()}/{getAllStudents()}
          </p>
          <div className="flex flex-col text-white">
            <p className="text-[24px] font-bold">Jumlah Mahasiswa</p>
            <p className="text-[18px] font-semibold">
              Yang belum membayar praktikum
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex w-full flex-row space-x-5">
        <div className="flex h-[280px] w-1/3 flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <p className="text-7xl font-bold text-[#FFBF01]">
            {getPaidStudents()}/{getAllStudents()}
          </p>
          <div className="flex flex-col text-white">
            <p className="text-[24px] font-bold">Jumlah Asisten Praktikum</p>
          </div>
        </div>
        <div className="flex h-[280px] w-2/3 flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <p className="text-7xl font-bold text-[#FFBF01]">
            {getPaidStudents()}/{getAllStudents()}
          </p>
          <div className="flex flex-col text-white">
            <p className="text-[24px] font-bold">Jumlah Mahasiswa</p>
            <p className="text-[18px] font-semibold">
              Yang belum membayar praktikum
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
