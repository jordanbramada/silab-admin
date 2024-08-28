import { cookies } from "next/headers";
import Image from "next/image";

export default function Dashboard() {
  async function getTotalMatkul(): Promise<number | undefined> {
    const cookie = cookies().get("session")?.value;

    try {
      const response = await fetch("https://silab-dev.vercel.app/subject/", {
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      const responseData = await response.json();
      return responseData["data"].length;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTotalRegisteredStudents(): Promise<number | undefined> {
    const cookie = cookies().get("session")?.value;

    try {
      const response = await fetch(
        "https://silab-dev.vercel.app/selected-subject/?registered=1",
        {
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        },
      );
      const responseData = await response.json();
      return responseData["data"].length;
    } catch (error) {
      console.log(error);
    }
  }

  async function getPaidStudents(): Promise<number | undefined> {
    const cookie = cookies().get("session")?.value;

    try {
      const response = await fetch(
        "https://silab-dev.vercel.app/user/?paid=false",
        {
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        },
      );
      const responseData = await response.json();
      return responseData["data"].length;
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllStudents(): Promise<number | undefined> {
    const cookie = cookies().get("session")?.value;

    try {
      const response = await fetch(
        "https://silab-dev.vercel.app/user/?role=mahasiswa",
        {
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        },
      );
      const responseData = await response.json();
      return responseData["data"].length;
    } catch (error) {
      console.log(error);
    }
  }

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
