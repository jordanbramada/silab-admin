"use client";

import Image from "next/image";
import {
  getAllStudents,
  getTotalMatkul,
  getTotalRegisteredStudents,
  getUnpaidStudents,
} from "../actions/dashboard/actions";
import { useEffect, useState } from "react";
import DashboardDataContainer from "../components/dashboard-data-container";

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState({
    totalMk: 0,
    totalRegisteredStudent: 0,
    totalStudent: 0,
    totalUnpaidStudent: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalMkResponse,
          registeredStudentResponse,
          totalStudentResponse,
          unpaidStudentResponse,
        ] = await Promise.all([
          getTotalMatkul(),
          getTotalRegisteredStudents(),
          getAllStudents(),
          getUnpaidStudents(),
        ]);

        setDashboardData({
          totalMk:
            totalMkResponse.status === 200 ? totalMkResponse.data.length : 0,
          totalRegisteredStudent:
            registeredStudentResponse.status === 200
              ? registeredStudentResponse.data.length
              : 0,
          totalStudent:
            totalStudentResponse.status === 200
              ? totalStudentResponse.data.length
              : 0,
          totalUnpaidStudent:
            unpaidStudentResponse.status === 200
              ? unpaidStudentResponse.data.length
              : 0,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            loading={loading}
            data={dashboardData.totalMk}
            title="Jumlah Praktikum"
            subTitle="Semester 1 - 8"
          />
          <DashboardDataContainer
            loading={loading}
            data={dashboardData.totalRegisteredStudent}
            data2={dashboardData.totalStudent}
            title="Jumlah Mahasiswa"
            subTitle="Yang sudah mendaftar praktikum"
          />
          <DashboardDataContainer
            loading={loading}
            data={dashboardData.totalUnpaidStudent}
            data2={dashboardData.totalStudent}
            title="Jumlah Mahasiswa"
            subTitle="Yang belum membayar praktikum"
          />
        </div>
        <div className="mt-6 flex w-full flex-row space-x-5">
          <DashboardDataContainer
            loading={loading}
            data={dashboardData.totalUnpaidStudent}
            data2={dashboardData.totalStudent}
            title="Jumlah Asisten Praktikum"
            subTitle=""
          />
          <div className="flex h-[280px] w-2/3 flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
            <p className="text-7xl font-bold text-[#FFBF01]">
              {loading ? (
                <span className="loading loading-dots loading-md" />
              ) : (
                dashboardData.totalUnpaidStudent
              )}
              /
              {loading ? (
                <span className="loading loading-dots loading-md" />
              ) : (
                dashboardData.totalStudent
              )}
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
    </div>
  );
}
