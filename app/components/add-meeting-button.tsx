"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import SuccessDialog from "./success-dialog";
import { postMeeting } from "../actions/dashboard/praktikum/[classId]/actions";

interface AddMeetingButtonProps {
  classId?: string;
}

export default function AddMeetingButton({ classId }: AddMeetingButtonProps) {
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState<boolean>(false);
  const [meetingName, setMeetingName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState<boolean>(false);

  const handleMeetingNameChange = (value: string) => {
    setMeetingName(value);
  };

  const addMeeting = async (
    meetingName: string,
    classId: string | undefined,
  ) => {
    setLoading(true);
    try {
      const response: any = await postMeeting(meetingName, classId);

      if (response["status"] === "success") {
        setMessage(response["message"]);
        setIsSuccessDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsAddMeetingOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsAddMeetingOpen(true)}
        className="h-fit content-center rounded-full bg-[#D2E3F1] p-3 text-sm font-semibold text-[#3272CA]"
      >
        Tambah Pertemuan
      </button>
      <Dialog
        onClose={() => setIsAddMeetingOpen(false)}
        open={isAddMeetingOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel className="flex h-2/4 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Tambah Pertemuan Praktikum
            </DialogTitle>
            <div className="flex h-full w-full flex-col">
              <fieldset className="w-full space-y-4">
                <label className="text-base font-semibold text-[#5E6278]">
                  Judul Pertemuan{" "}
                  <p className="text-xs font-light text-gray-500">
                    e.g Pertemuan 1
                  </p>
                </label>
                <input
                  required
                  className="h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
                  placeholder="Judul pertemuan"
                  onChange={(e) => handleMeetingNameChange(e.target.value)}
                  value={meetingName}
                />
              </fieldset>
              <div className="flex h-full flex-col justify-end">
                <button
                  onClick={() => addMeeting(meetingName, classId)}
                  className="h-fit w-1/3 self-end rounded-full bg-[#D2E3F1] py-3 font-bold text-[#3272CA] disabled:bg-gray-300 disabled:text-white"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-sm" />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <SuccessDialog
        dialogOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={message}
      />
    </>
  );
}
