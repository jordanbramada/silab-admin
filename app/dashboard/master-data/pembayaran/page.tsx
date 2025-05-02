"use client";

import ErrorDialog from "@/app/components/error-dialog";
import SuccessDialog from "@/app/components/success-dialog";
import { IGetActivationResponseBody } from "@/app/interfaces/activation/activation.interface";
import useActivationStore from "@/app/store/useActivationStore";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Switch,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export default function Pembayaran() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] =
    useState<IGetActivationResponseBody>();
  const [selectedStudentPaymentStatus, setSelectedStudentPaymentStatus] =
    useState<boolean>();
  const [message, setMessage] = useState<string>("");
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

  const {
    activationData,
    getAllActivations,
    isLoading,
    error,
    status,
    setStatusQuery,
    setNameQuery,
    reset,
  } = useActivationStore();

  useEffect(() => {
    getAllActivations();
  }, [getAllActivations]);

  useEffect(() => {
    reset();
  }, []);

  const debouncedSetQuery = useMemo(() => {
    return debounce((val: string) => {
      setNameQuery(val);
    }, 400);
  }, [setNameQuery]);

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [debouncedSetQuery]);

  return (
    <div className="flex h-full w-full flex-col space-y-[38px] overflow-auto overscroll-contain">
      <div className="flex h-fit w-full flex-row space-x-9">
        <div className="flex h-[200px] w-[300px] flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <h1 className="text-6xl font-bold text-[#FFBF01]">
            {
              activationData.filter((student) => student.status === false)
                .length
            }
          </h1>
          <p className="text-base font-semibold text-white">
            Jumlah aktivasi mahasiswa yang{" "}
            <span className="font-extrabold text-[#FFBF01]">belum bayar</span>
          </p>
        </div>
        <div className="flex h-[200px] w-[300px] flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <h1 className="text-6xl font-bold text-[#FFBF01]">
            {activationData.filter((student) => student.status === true).length}
          </h1>
          <p className="text-base font-semibold text-white">
            Jumlah aktivasi mahasiswa yang{" "}
            <span className="font-extrabold text-[#FFBF01]">sudah bayar</span>
          </p>
        </div>
      </div>
      <div className="relative h-fit w-full">
        <Field className={"h-12 w-full"}>
          <div className="absolute z-10 size-[24px] translate-x-2 translate-y-1/2">
            <Image
              src={"/search.png"}
              alt="search"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <Input
            className={
              "h-full w-full rounded-2xl pl-10 data-[focus]:outline-[#3272CA]"
            }
            placeholder="Cari Mahasiswa"
            onChange={(e) => setNameQuery(e.target.value)}
          />
        </Field>
      </div>
      <div className="flex h-fit w-full flex-col space-y-14 rounded-2xl bg-white p-7">
        <div className="flex w-full flex-row space-x-3">
          <button
            onClick={() => setStatusQuery("")}
            className={`h-fit w-fit rounded-full p-3 text-xs font-semibold ${status === "" ? "bg-[#3272CA] text-white" : "border-2 border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Show All
          </button>
          <button
            onClick={() => setStatusQuery("true")}
            className={`h-fit w-fit rounded-full p-3 text-xs font-semibold ${status === "true" ? "bg-[#3272CA] text-white" : "border-2 border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Sudah Bayar
          </button>
          <button
            onClick={() => setStatusQuery("false")}
            className={`h-fit w-fit rounded-full p-3 text-xs font-semibold ${status === "false" ? "bg-[#3272CA] text-white" : "border-2 border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Belum Bayar
          </button>
        </div>
        <div className="flex w-full flex-col space-y-9">
          <div className="flex flex-row text-sm font-bold text-[#5E6278]">
            <p className="flex w-2/12 justify-center">NIM</p>
            <p className="flex w-4/12 justify-center">Nama</p>
            <p className="flex w-3/12 justify-center">Mata Kuliah</p>
            <p className="flex w-2/12 justify-center">Status Pembayaran</p>
            <p className="flex w-1/12 justify-center"></p>
          </div>
          {activationData &&
            !status &&
            activationData.map((student) => (
              <div
                key={student.id}
                className="flex flex-row text-sm font-semibold text-[#5E6278]"
              >
                <p className="flex w-2/12 justify-center">{student.nim}</p>
                <p className="flex w-4/12 justify-center">{student.student}</p>
                <div className="flex w-3/12 flex-col justify-center space-y-2">
                  {student.subjects.map((subject) => (
                    <li key={subject.subject_name}>{subject.subject_name}</li>
                  ))}
                </div>
                <p
                  className={`flex h-fit w-2/12 justify-center rounded-md p-2 font-semibold ${student.status === false ? "bg-[#F1F1F2]" : "bg-[#E8FFF3] text-[#50CD89]"}`}
                >
                  {student.status === true ? "Sudah Bayar" : "Belum Bayar"}
                </p>
                <button
                  onClick={() => {
                    setIsDialogOpen(true);
                    setSelectedStudent(student);
                    setSelectedStudentPaymentStatus(student.status);
                  }}
                  className="relative flex h-6 w-1/12 justify-center"
                >
                  {!student.status && (
                    <Image
                      src={"/edit-blue.png"}
                      alt="action"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </button>
              </div>
            ))}
          {activationData &&
            status &&
            activationData.map((student) => (
              <div
                key={student.id}
                className="flex flex-row text-sm font-semibold text-[#5E6278]"
              >
                <p className="flex w-2/12 justify-center">{student.nim}</p>
                <p className="flex w-4/12 justify-center">{student.student}</p>
                <div className="flex w-3/12 flex-col justify-center space-y-2">
                  {student.subjects.map((subject) => (
                    <li key={subject.subject_name}>{subject.subject_name}</li>
                  ))}
                </div>
                <p
                  className={`flex h-fit w-2/12 justify-center rounded-md p-2 font-semibold ${student.status === false ? "bg-[#F1F1F2]" : "bg-[#E8FFF3] text-[#50CD89]"}`}
                >
                  {student.status === true ? "Sudah Bayar" : "Belum Bayar"}
                </p>
                <button className="relative flex h-6 w-1/12 justify-center">
                  {!student.status && (
                    <Image
                      src={"/edit-blue.png"}
                      alt="action"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </button>
              </div>
            ))}
        </div>
      </div>
      <Dialog
        onClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel className="flex h-3/5 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Ubah Status Pembayaran Mahasiswa
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
                    {selectedStudent?.student}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-[#5E6278]">
                    Status Pembayaran
                  </p>
                  <div className="mt-2 flex flex-row items-center space-x-3">
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      Belum Bayar
                    </p>
                    <Switch
                      checked={selectedStudentPaymentStatus}
                      onChange={(checked) =>
                        setSelectedStudentPaymentStatus(checked ? true : false)
                      }
                      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#D9D9D9] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-[#3272CA] data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-[white] shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                      />
                    </Switch>
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      Sudah Bayar
                    </p>
                  </div>
                </div>
              </div>
              <button
                // onClick={() =>
                //   updatePaymentStatus(
                //     selectedStudentPaymentStatus,
                //     selectedStudent?.activation_id,
                //   )
                // }
                className="w-full rounded-full bg-[#D2E3F1] p-4 font-semibold text-[#3272CA]"
              >
                Simpan Perubahan
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {!error && (
        <SuccessDialog
          dialogOpen={successDialogOpen}
          onClose={() => setSuccessDialogOpen(false)}
          title={message}
        />
      )}
      {error && (
        <ErrorDialog
          dialogOpen={errorDialogOpen}
          onClose={() => setErrorDialogOpen(false)}
          title={message}
        />
      )}
    </div>
  );
}
