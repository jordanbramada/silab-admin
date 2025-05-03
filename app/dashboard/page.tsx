"use client";

import { useEffect } from "react";
import BannerDashboard from "../components/banner-dashboard";
import DashboardDataCards from "../components/dashboard-data-cards";
import useDashboardStore from "../store/useDashboardStore";

export default function Dashboard() {
  const {
    getTotalRegisteredStudent,
    getTotalSubject,
    getTotalUnpaidStudent,
    totalRegisteredStudent,
    totalSubject,
    totalUnpaidStudent,
  } = useDashboardStore();

  useEffect(() => {
    getTotalRegisteredStudent(), getTotalSubject(), getTotalUnpaidStudent();
  }, [getTotalRegisteredStudent, getTotalSubject, getTotalUnpaidStudent]);

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-6 overflow-auto overscroll-contain">
      <BannerDashboard />
      <DashboardDataCards
        subjectData={totalSubject}
        studentsData={totalRegisteredStudent}
        studentsPaymentStatusPaidData={totalRegisteredStudent}
        studentsPaymentStatusPendingData={totalUnpaidStudent}
        studentPracticumData={totalSubject}
      />
    </div>
  );
}
