"use client";

import { useState } from "react";
import { updateAttendancesStatus } from "../actions/dashboard/praktikum/[classId]/actions";
import SuccessDialog from "./success-dialog";
import { Meeting } from "../types/meeting";

interface OpenAttendancesButtonProps {
  classId?: string;
  meeting?: Meeting[];
  selectedMeeting?: string;
}

export default function OpenAttendancesButton({
  classId,
  meeting,
  selectedMeeting,
}: OpenAttendancesButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState<boolean>(false);

  const handleUpdateAttendancesStatus = async (
    classId?: string,
    meetingId?: string,
    meetingToken?: string,
  ) => {
    setLoading(true);
    try {
      const response: any = await updateAttendancesStatus(
        classId,
        meetingId,
        meetingToken,
      );

      if (response["status"] === "success") {
        setMessage(response["message"]);
        setIsSuccessDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() =>
          handleUpdateAttendancesStatus(
            classId,
            meeting?.find((meeting) => meeting.id === selectedMeeting)?.id,
            meeting?.find((meeting) => meeting.id === selectedMeeting)?.token,
          )
        }
        className="h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white"
      >
        Buka Presensi
      </button>
      <SuccessDialog
        dialogOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={message}
      />
    </>
  );
}
