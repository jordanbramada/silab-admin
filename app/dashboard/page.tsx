"use client";

import { useEffect } from "react";
import BannerDashboard from "../components/banner-dashboard";
import DashboardDataCards from "../components/dashboard-data-cards";
import useDashboardStore from "../store/useDashboardStore";
import useAuthStore from "../store/useAuthStore";

export default function Dashboard() {
  const {
    getTotalRegisteredStudent,
    getTotalSubject,
    getTotalUnpaidStudent,
    totalRegisteredStudent,
    totalSubject,
    totalUnpaidStudent,
  } = useDashboardStore();
  const { me } = useAuthStore();

  useEffect(() => {
    getTotalRegisteredStudent(), getTotalSubject(), getTotalUnpaidStudent();
    me();
  }, [getTotalRegisteredStudent, getTotalSubject, getTotalUnpaidStudent, me]);

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
