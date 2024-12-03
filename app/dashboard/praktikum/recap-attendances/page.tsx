import { getAccessToken } from "@/app/lib/sessions";
import { Meeting } from "@/app/types/meeting";
import { GetServerSideProps } from "next";
import DownloadPDFClient from "./downloadpdf";

type StudentAttendance = {
  student_id: string;
  nim: string;
  student_name: string;
  submitted_at?: string;
  is_attended?: boolean;
};

export default async function RecapAttendancesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const classId = (await searchParams).classId;
  const meetingId = (await searchParams).meetingId;

  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.BASE_URL}/subject/classes/${classId}/meetings`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-cache",
    },
  );

  const responseData = await response.json();
  const meetingsList = responseData["data"] as Meeting[];
  const studentsList = responseData["data"][0][
    "students"
  ] as StudentAttendance[];

  return (
    <div className="w-full space-y-4" id="recap-attendances">
      {/* Table Header */}
      <div className="flex w-full flex-row justify-between border-b border-gray-300 pb-2 font-bold text-gray-700">
        <p className="w-1/12 text-center">No</p>
        <p className="w-3/12 text-center">Nama</p>
        <p className="w-2/12 text-center">NIM</p>
        {meetingsList.map((meeting, index) => (
          <p key={meeting.id} className="w-1/12 text-center">
            P{index + 1}
          </p>
        ))}
      </div>

      {/* Table Rows */}
      {studentsList.map((student, index) => (
        <div
          key={student.nim}
          className="flex w-full flex-row justify-between text-gray-600"
        >
          <p className="w-1/12 text-center">{index + 1}</p>
          <p className="w-3/12 text-center">{student.student_name}</p>
          <p className="w-2/12 text-center">{student.nim}</p>
          {meetingsList.map((meeting) => {
            const attendance = meeting.students?.find(
              (s) => s.student_id === student.student_id,
            );
            return (
              <p
                key={`${meeting.id}-${student.student_id}`}
                className={`w-1/12 text-center ${
                  attendance?.is_attended ? "text-green-600" : "text-red-600"
                }`}
              >
                {attendance?.is_attended ? "✔️" : "❌"}
              </p>
            );
          })}
        </div>
      ))}
      <DownloadPDFClient />
    </div>
  );
}
