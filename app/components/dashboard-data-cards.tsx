"use client";

import useAuthStore from "../store/useAuthStore";
import DashboardDataContainer from "./dashboard-data-container";

export default function DashboardDataCards({
  subjectData,
  studentsData,
  studentsPaymentStatusPaidData,
  studentsPaymentStatusPendingData,
  studentPracticumData,
}: any) {
  const { userData } = useAuthStore();

  return (
    <div className="flex w-full flex-col space-y-5">
      <div className="mt-6 flex w-full flex-row space-x-5">
        {userData?.role === "LABORAN" && (
          <>
            {" "}
            <DashboardDataContainer
              data={subjectData}
              title="Jumlah Praktikum"
              subTitle="Semester 1 - 8"
            />
            <DashboardDataContainer
              data={studentsPaymentStatusPaidData}
              data2={studentsData}
              title="Jumlah Mahasiswa"
              subTitle="Yang sudah mendaftar praktikum"
            />
            <DashboardDataContainer
              data={studentsPaymentStatusPendingData}
              data2={studentsData}
              title="Jumlah Mahasiswa"
              subTitle="Yang belum membayar praktikum"
            />
          </>
        )}
        {userData?.role === "MAHASISWA" && (
          <>
            <DashboardDataContainer
              data={subjectData}
              title="Jumlah Praktikum"
              subTitle="Semester 1 - 8"
            />
            <DashboardDataContainer
              data={studentPracticumData}
              title="Jumlah Kelas Asisten Praktikum"
              subTitle="Semester 1 - 8"
            />
          </>
        )}
      </div>
    </div>
  );
}
