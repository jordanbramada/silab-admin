"use client";

import Image from "next/image";
import { useState } from "react";
import { Students } from "../types/students";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Switch,
} from "@headlessui/react";

interface StudentAttendanceEditButtonProps {
  student?: Students;
}

export default function StudentAttendanceEditButton({
  student,
}: StudentAttendanceEditButtonProps) {
  const [selectedStudent, setSelectedStudent] = useState<Students | null>();
  const [selectedStudentPresenceStatus, setSelectedStudentPresenceStatus] =
    useState<boolean | null>();
  const [
    IsUpdateStudentPresenceDialogOpen,
    setIsUpdateStudentPresenceDialogOpen,
  ] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => {
          setIsUpdateStudentPresenceDialogOpen(true);
          setSelectedStudent(student);
          setSelectedStudentPresenceStatus(
            student?.is_attended !== null && student?.submitted_at !== null
              ? true
              : false,
          );
        }}
        className="relative flex h-6 w-2/12 items-center justify-center"
      >
        <Image
          src={"/edit-blue.png"}
          alt="action"
          fill
          style={{ objectFit: "contain" }}
        />
      </button>
      <Dialog
        onClose={() => setIsUpdateStudentPresenceDialogOpen(false)}
        open={IsUpdateStudentPresenceDialogOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel className="flex h-3/5 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Ubah Status Presensi Mahasiswa
            </DialogTitle>
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex h-full w-full flex-col space-y-8">
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-[#5E6278]">NIM</p>
                  <p className="text-sm font-bold text-[#1D1D1D]">
                    {selectedStudent?.nim}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-[#5E6278]">
                    Nama Lengkap
                  </p>
                  <p className="text-sm font-bold text-[#1D1D1D]">
                    {selectedStudent?.student_name}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-[#5E6278]">
                    Status Presensi
                  </p>
                  <div className="mt-2 flex flex-row items-center space-x-3">
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      Belum Hadir / Tidak Hadir
                    </p>
                    <Switch
                      checked={
                        selectedStudentPresenceStatus === true ? true : false
                      }
                      onChange={(checked) =>
                        setSelectedStudentPresenceStatus(checked)
                      }
                      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#D9D9D9] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-[#3272CA] data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-[white] shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                      />
                    </Switch>
                    <p className="text-sm font-bold text-[#1D1D1D]">Hadir</p>
                  </div>
                </div>
              </div>
              <button className="w-full rounded-full bg-[#D2E3F1] p-4 font-semibold text-[#3272CA]">
                Simpan Perubahan
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
