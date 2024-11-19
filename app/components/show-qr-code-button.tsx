"use client";

import Image from "next/image";
import { useState } from "react";
import { Meeting } from "../types/meeting";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import QRCode from "react-qr-code";

interface ShowQrCodeButtonProps {
  meetings?: Meeting[];
  selectedMeeting?: string;
}

export default function ShowQrCodeButton({
  meetings,
  selectedMeeting,
}: ShowQrCodeButtonProps) {
  const [isQrDialogOpen, setIsQrDialogOpen] = useState<boolean>(false);
  const [qrToken, setQrToken] = useState<string | undefined>();

  return (
    <>
      <button
        onClick={() => {
          setQrToken(
            meetings?.find((meeting) => meeting.id === selectedMeeting)?.token,
          );
          setIsQrDialogOpen(true);
        }}
        className="flex flex-row items-center space-x-3 rounded-2xl bg-[#FFBF01] p-3"
      >
        <Image alt="QR Code Icon" src={"/qr.png"} width={32} height={32} />
      </button>
      <Dialog
        onClose={() => setIsQrDialogOpen(false)}
        open={isQrDialogOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel className="flex h-3/4 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Kode QR Presensi
            </DialogTitle>
            <div className="flex h-full w-full items-center justify-center">
              <QRCode value={qrToken ?? ""} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
