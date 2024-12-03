import {
  getAllStudents,
  getTotalMatkul,
  getTotalRegisteredStudents,
  getUnpaidStudents,
  getAllSubjectClasses,
} from "../actions/dashboard/actions";
import BannerDashboard from "../components/banner-dashboard";
import DashboardDataCards from "../components/dashboard-data-cards";

export default async function Dashboard() {
  const subjectData = await getTotalMatkul();
  const studentsData = await getAllStudents();
  const studentsPaymentStatusPendingData = await getUnpaidStudents();
  const studentsPaymentStatusPaidData = await getTotalRegisteredStudents();
  const studentPracticumData = await getAllSubjectClasses();

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-6 overflow-auto overscroll-contain">
      <BannerDashboard />
      <DashboardDataCards
        subjectData={subjectData}
        studentsData={studentsData}
        studentsPaymentStatusPaidData={studentsPaymentStatusPaidData}
        studentsPaymentStatusPendingData={studentsPaymentStatusPendingData}
        studentPracticumData={studentPracticumData}
      />
    </div>
  );
}
