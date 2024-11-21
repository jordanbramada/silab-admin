import DashboardDataContainer from "./dashboard-data-container";

export default function DashboardDataCards({subjectData, studentsData, studentsPaymentStatusPaidData, studentsPaymentStatusPendingData}: any) {
  return (
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
  );
}
