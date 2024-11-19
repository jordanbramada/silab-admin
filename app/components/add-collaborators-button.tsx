"use client";

import Image from "next/image";
import { useState } from "react";
import { postCollaborators } from "../actions/dashboard/praktikum/[classId]/actions";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import ClassAssistantsComboBox from "./class-assistants";
import SuccessDialog from "./success-dialog";

interface AddCollaboratorsButtonProps {
  classId?: string;
}

export default function AddCollaboratorsButton({
  classId,
}: AddCollaboratorsButtonProps) {
  const [isAddCollaboratorsOpen, setIsAddCollaboratorsOpen] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState<boolean>(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState<User[]>(
    [],
  );

  const addCollaborators = async (
    collaborators: string[],
    classId?: string,
  ) => {
    setLoading(true);
    try {
      const response: any = await postCollaborators(collaborators, classId);

      if (response["status"] === "success") {
        setMessage(response["message"]);
        setIsSuccessDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsAddCollaboratorsOpen(false);
    }
  };

  const handleCollaboratorsChange = (value: User[]) => {
    const validCollaborators = value.filter(
      (collaborator): collaborator is User => collaborator != null,
    );

    setSelectedCollaborators(validCollaborators);
  };

  return (
    <>
      <button
        onClick={() => setIsAddCollaboratorsOpen(true)}
        className="relative size-4"
      >
        <Image
          src={"/edit.png"}
          alt={"Edit Collaborators"}
          fill
          style={{ objectFit: "contain" }}
        />
      </button>
      <Dialog
        onClose={() => setIsAddCollaboratorsOpen(false)}
        open={isAddCollaboratorsOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel className="flex h-3/4 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Edit Kolaborator / Asisten
            </DialogTitle>
            <ClassAssistantsComboBox
              onClassAssistantsChange={handleCollaboratorsChange}
              value={selectedCollaborators}
            />
            <div className="flex h-full flex-col justify-end">
              <button
                disabled={selectedCollaborators.length === 0 ? true : false}
                onClick={() => {
                  const collaboratorsId = selectedCollaborators.map(
                    (collaborator) => collaborator.id,
                  );
                  addCollaborators(collaboratorsId, classId);
                }}
                className="h-fit w-1/3 self-end rounded-full bg-[#D2E3F1] py-3 font-bold text-[#3272CA] disabled:bg-gray-300 disabled:text-white"
              >
                {loading ? (
                  <span className="loading loading-dots loading-sm" />
                ) : (
                  "Simpan"
                )}
              </button>
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
