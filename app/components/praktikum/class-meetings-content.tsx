"use client";

import { useState } from "react";
import AddMeetingButton from "./add-meeting-button";
import MeetingsDropDown from "../meetings-dropdown";
import OpenAttendancesButton from "../open-attendance-button";
import ShowQrCodeButton from "./show-qr-code-button";
import StudentAttendanceEditButton from "../student-attendance-edit-button";
import { Meeting } from "../../types/meeting";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import Image from "next/image";

interface ClassMeetingsContentProps {
  classId?: string;
}

export default function ClassMeetingsContent({
  classId,
}: ClassMeetingsContentProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<string>("");
  const [meetingData, setMeetingData] = useState<Meeting[] | undefined>(
    undefined,
  );

  const downloadPDF = async () => {
    try {
      const element = document.getElementById("recap-attendances");
      if (!element) {
        throw new Error("No content to generate the PDF!");
      }

      const canvas = await html2canvas(element, { scale: 2 });
      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("attendance-recap.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <div className="flex h-1/6 flex-row space-x-4">
          <AddMeetingButton classId={classId} />
          <MeetingsDropDown
            classId={classId}
            onMeetingSelected={setSelectedMeeting}
            onMeetingDataRetrieved={setMeetingData}
          />
        </div>
        <div className="flex h-1/6 flex-row space-x-4">
          <OpenAttendancesButton
            classId={classId}
            meeting={meetingData}
            selectedMeeting={selectedMeeting}
          />
          <Link
            href={{
              pathname: "recap-attendances",
              query: {
                classId: classId,
              },
            }}
            className="h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white"
          >
            Rekap All
          </Link>
        </div>
      </div>
      {!selectedMeeting && (
        <div className="flex h-full w-full items-center justify-center">
          <p>Pilih Pertemuan untuk Melihat Daftar Presensi! </p>
        </div>
      )}
      {selectedMeeting && (
        <div className="h-full w-full space-y-14 bg-white p-5">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-4">
              <ShowQrCodeButton
                meetings={meetingData}
                selectedMeeting={selectedMeeting}
              />
              <Link
                href={{
                  pathname: "recap-attendances",
                  query: {
                    classId: classId,
                    meetingId: selectedMeeting,
                  },
                }}
                aria-disabled={selectedMeeting === "" || !selectedMeeting}
                className={
                  selectedMeeting === "" || !selectedMeeting
                    ? "pointer-events-none"
                    : "flex flex-row items-center space-x-3 rounded-2xl bg-[#3272CA] p-3"
                }
              >
                <Image
                  alt="QR Code Icon"
                  src={"/pdf.png"}
                  width={32}
                  height={32}
                />
              </Link>
              <p className="text-base font-bold">
                {
                  meetingData?.find((meeting) => meeting.id === selectedMeeting)
                    ?.meeting_name
                }
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p>Tanggal Meeting</p>
              <p>Total Mahasiswa Presensi</p>
            </div>
          </div>
          <div id="recap-attendances">
            <div className="flex w-full flex-row text-base font-bold text-[#5E6278]">
              <p className="flex w-2/12 items-center justify-center">NIM</p>
              <p className="flex w-5/12 items-center justify-center">Nama</p>
              <p className="flex w-3/12 items-center justify-center">
                Presensi
              </p>
              <div className="flex w-2/12 items-center justify-center" />
            </div>
            {meetingData
              ?.find((meeting) => meeting.id === selectedMeeting)
              ?.students.map((student) => (
                <div
                  key={student.student_id}
                  className="flex w-full flex-row text-base font-semibold text-[#5E6278]"
                >
                  <p className="flex w-2/12 items-center justify-center">
                    {student.nim}
                  </p>
                  <p className="flex w-5/12 items-center justify-center">
                    {student.student_name}
                  </p>
                  <div className={`flex w-3/12 items-center justify-center`}>
                    <p
                      className={`rounded-md p-2 text-sm font-semibold ${
                        student.is_attended !== null &&
                        student.submitted_at === null
                          ? "bg-[#FFF5F8] text-[#F1416C]"
                          : student.is_attended !== null &&
                              student.submitted_at !== null
                            ? "bg-[#E8FFF3] text-[#50CD89]"
                            : "bg-[#F1F1F2] text-[#181C32]"
                      }`}
                    >
                      {student.is_attended !== null &&
                      student.submitted_at === null
                        ? "Tidak Hadir"
                        : student.is_attended !== null &&
                            student.submitted_at !== null
                          ? "Hadir"
                          : "Belum Presensi"}
                    </p>
                  </div>
                  <StudentAttendanceEditButton />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
