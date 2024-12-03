import { getRole } from "../lib/sessions";
import DashboardDataContainer from "./dashboard-data-container";

export default async function DashboardDataCards({
  subjectData,
  studentsData,
  studentsPaymentStatusPaidData,
  studentsPaymentStatusPendingData,
  studentPracticumData,
}: any) {
  const role = await getRole();
  return (
    <div className="flex w-full flex-col space-y-5">
      <div className="mt-6 flex w-full flex-row space-x-5">
        {role === "laborant" && (
          <>
            {" "}
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
          </>
        )}
        {role === "student" && (
          <>
            <DashboardDataContainer
              data={subjectData["data"].length}
              title="Jumlah Praktikum"
              subTitle="Semester 1 - 8"
            />
            <DashboardDataContainer
              data={studentPracticumData["data"].length}
              title="Jumlah Kelas Asisten Praktikum"
              subTitle="Semester 1 - 8"
            />
          </>
        )}
      </div>
    </div>
  );
}
