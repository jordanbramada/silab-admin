"use client";

import {
  fetchClassDetails,
  postCollaborators,
  postMeeting,
} from "@/app/actions/dashboard/praktikum/[classId]/actions";
import ClassAssistantsComboBox from "@/app/components/class-assistants";
import SuccessDialog from "@/app/components/success-dialog";
import { Class } from "@/app/types/class-details-class";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ClassDetails({
  params,
}: {
  params: { classId: string };
}) {
  const [data, setData] = useState<Class>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddCollaboratorsOpen, setIsAddCollaboratorsOpen] =
    useState<boolean>(false);
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState<boolean>(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState<User[]>(
    [],
  );
  const [meetingName, setMeetingName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const responseData = await fetchClassDetails(params.classId);
        if (responseData["status"] === "success") {
          setData(responseData["data"]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.classId]);

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

  const addCollaborators = async (
    collaborators: string[],
    classId: string | undefined,
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

  const handleMeetingNameChange = (value: string) => {
    setMeetingName(value);
  };

  return (
    <div className="flex h-full w-full flex-col space-y-10 overflow-auto overscroll-contain">
      <div className="flex w-full flex-col">
        <p className="text-[18px] font-semibold text-[#5E6278]">
          Semester {data?.semester}
        </p>
        <p className="text-[32px] font-bold text-black">
          Praktikum {data?.subject_class}
        </p>
      </div>
      <div className="flex h-[150px] w-full flex-row justify-between space-x-6 rounded-[20px] bg-white p-5">
        <div className="flex h-full flex-col space-y-4">
          <p className="text-[16px] font-semibold text-[#5E6278]">Hari, Jam</p>
          <p className="text-[18px] font-semibold text-black">
            {data?.day}, <br /> {data?.session_time}
          </p>
        </div>
        <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
        <div className="flex h-full flex-col space-y-4">
          <p className="text-[16px] font-semibold text-[#5E6278]">Dosen</p>
          <p className="text-[18px] font-semibold text-black">
            {data?.lecturer}
          </p>
        </div>
        <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
        <div className="flex h-full flex-col space-y-4">
          <div className="flex flex-row items-center justify-between">
            <p className="text-[16px] font-semibold text-[#5E6278]">
              Asisten Praktikum
            </p>
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
          </div>
          <div className="flex flex-col space-y-2">
            {data?.assistant.length !== 0 &&
              data?.assistant.map((assistant) => (
                <div className="flex flex-row space-x-[10px]" key={assistant}>
                  <div className="h-full w-[6px] rounded-full bg-[#D2E3F1]"></div>
                  <p className="text-[18px] font-semibold text-black">
                    {assistant}
                  </p>
                </div>
              ))}
            {data?.assistant.length === 0 && (
              <div className="flex flex-row space-x-[10px]">
                <p className="text-[18px] font-semibold text-black">
                  Asisten Praktikum Belum Ditambahkan
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
        <div className="flex h-full flex-col space-y-4">
          <p className="text-[16px] font-semibold text-[#5E6278]">Kuota</p>
          <p className="text-[18px] font-semibold text-black">
            {data?.total_student} / {data?.quota}
          </p>
        </div>
        <div className="h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"></div>
        <div className="flex h-full w-[100px] flex-col justify-between space-y-4">
          <p className="text-[16px] font-semibold text-[#5E6278]">Modul</p>
          <button className="flex w-full flex-row items-center justify-between">
            <p className="w-[53px] text-start text-[14px] font-semibold leading-none text-[#3272CA]">
              Click to Open
            </p>
            <div className="relative h-[24px] w-[24px]">
              <Image
                src={"/open.png"}
                fill
                alt="open module"
                style={{ objectFit: "contain" }}
              />
            </div>
          </button>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between">
        <div className="flex h-1/6 flex-row space-x-4">
          <button
            onClick={() => setIsAddMeetingOpen(true)}
            className="h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white"
          >
            Tambah Pertemuan
          </button>
          <button className="h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white">
            Tambah Pertemuan
          </button>
        </div>
        <div className="flex h-1/6 flex-row space-x-4">
          <button className="h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white">
            Tambah Pertemuan
          </button>
          <button className="h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white">
            Tambah Pertemuan
          </button>
        </div>
      </div>
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
                  onClick={() => addMeeting(meetingName, data?.id)}
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
                  addCollaborators(collaboratorsId, data?.id);
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
    </div>
  );
}
