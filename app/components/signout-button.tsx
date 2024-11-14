"use client";

import { signOut } from "@/app/lib/sessions";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

export default function SignOutButton() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group/sidebaritem">
      <button
        onClick={() => setIsOpen(true)}
        className={`flex w-full flex-row space-x-3 rounded-full px-4 py-3 font-semibold text-[#FE2F60] transition-all duration-300 group-hover/sidebaritem:bg-[#FBEFEF]`}
      >
        <Image
          className="transition-all duration-300 group-hover/sidebaritem:translate-x-3"
          src={"/logout.png"}
          height={24}
          width={24}
          alt={"logout"}
        />
        <p className="transition-all duration-300 group-hover/sidebaritem:translate-x-3">
          Sign Out
        </p>
      </button>
      <Dialog
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className={"relative z-50"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex h-[200px] w-[500px] flex-col justify-between rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#FE2F60]">
              Sign Out
            </DialogTitle>
            <p>Apakah anda ingin keluar?</p>
            <div className="flex gap-4">
              <button
                className="rounded-full bg-[#FF0000] px-4 py-2 text-white"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </button>
              <button
                className="text-[#FF0000]"
                onClick={async () => {
                  await signOut();
                  setIsOpen(false);
                }}
              >
                Keluar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
