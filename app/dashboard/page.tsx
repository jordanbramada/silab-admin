import Image from "next/image";
import DashboardDataContainer from "../components/dashboard-data-container";
import {
  getAllStudents,
  getTotalMatkul,
  getTotalRegisteredStudents,
  getUnpaidStudents,
} from "../actions/dashboard/actions";

export default async function Dashboard() {
  const subjectData = await getTotalMatkul();

  const studentsData = await getAllStudents();

  const studentsPaymentStatusPendingData = await getUnpaidStudents();

  const studentsPaymentStatusPaidData = await getTotalRegisteredStudents();

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-6 overflow-auto overscroll-contain">
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
          priority
        />
      </div>
      <div className="flex w-full flex-col space-y-5">
        <div className="mt-6 flex w-full flex-row space-x-5">
          <DashboardDataContainer
            data={subjectData["data"].length}
            title="Jumlah Praktikum"
            subTitle="Semester 1 - 8"
          />
          <DashboardDataContainer
            data={studentsPaymentStatusPaidData["data"].length}
            data2={studentsData["data"].length}
            title="Jumlah Mahasiswa"
            subTitle="Yang sudah mendaftar praktikum"
          />
          <DashboardDataContainer
            data={studentsPaymentStatusPendingData["data"].length}
            data2={studentsData["data"].length}
            title="Jumlah Mahasiswa"
            subTitle="Yang belum membayar praktikum"
          />
        </div>
      </div>
    </div>
  );
}
