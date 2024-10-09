"use client";

import {
  getStudentPaymentStatus,
  updateStudentPaymentStatus,
} from "@/app/actions/dashboard/master-data/pembayaran/actions";
import SuccessDialog from "@/app/components/success-dialog";
import { StudentPaymentStatus } from "@/app/types/student-payment-status";
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
import { useEffect, useState } from "react";

export default function Pembayaran() {
  const [data, setData] = useState<StudentPaymentStatus[]>([]);
  const [filteredData, setFilteredData] = useState<StudentPaymentStatus[]>([]);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentPaymentStatus>();
  const [selectedStudentPaymentStatus, setSelectedStudentPaymentStatus] =
    useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getStudentPaymentStatus();
        const data = response.data as StudentPaymentStatus[];
        setData(data);

        if (query) {
          setFilteredData(data.filter((student) => student.status === query));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const updatePaymentStatus = async (
    status: string,
    activationId: string | undefined,
  ) => {
    setLoading(true);
    try {
      const response: any = await updateStudentPaymentStatus(
        status,
        activationId,
      );

      if (response["status"] === "success") {
        setMessage(response["message"]);
        setSuccessDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col space-y-[38px] overflow-auto overscroll-contain">
      <div className="flex h-fit w-full flex-row space-x-9">
        <div className="flex h-[200px] w-[300px] flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <h1 className="text-6xl font-bold text-[#FFBF01]">
            {data.filter((student) => student.status === "Pending").length}
          </h1>
          <p className="text-base font-semibold text-white">
            Jumlah aktivasi mahasiswa yang{" "}
            <span className="font-extrabold text-[#FFBF01]">belum bayar</span>
          </p>
        </div>
        <div className="flex h-[200px] w-[300px] flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <h1 className="text-6xl font-bold text-[#FFBF01]">
            {data.filter((student) => student.status === "Paid").length}
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
            onChange={(e) => setQuery(e.target.value)}
          />
        </Field>
      </div>
      <div className="flex h-fit w-full flex-col space-y-14 rounded-2xl bg-white p-7">
        <div className="flex w-full flex-row space-x-3">
          <button
            onClick={() => setQuery(undefined)}
            className={`h-fit w-fit rounded-full p-3 text-xs font-semibold ${query === undefined ? "bg-[#3272CA] text-white" : "border-2 border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Show All
          </button>
          <button
            onClick={() => setQuery("Paid")}
            className={`h-fit w-fit rounded-full p-3 text-xs font-semibold ${query === "Paid" ? "bg-[#3272CA] text-white" : "border-2 border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Sudah Bayar
          </button>
          <button
            onClick={() => setQuery("Pending")}
            className={`h-fit w-fit rounded-full p-3 text-xs font-semibold ${query === "Pending" ? "bg-[#3272CA] text-white" : "border-2 border-[#BFD9EF] text-[#3272CA]"}`}
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
          {data &&
            !query &&
            data.map((student) => (
              <div
                key={student.activation_id}
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
                  className={`flex h-fit w-2/12 justify-center rounded-md p-2 font-semibold ${student.status === "Pending" ? "bg-[#F1F1F2]" : "bg-[#E8FFF3] text-[#50CD89]"}`}
                >
                  {student.status === "Paid" ? "Sudah Bayar" : "Belum Bayar"}
                </p>
                <button
                  onClick={() => {
                    setIsDialogOpen(true);
                    setSelectedStudent(student);
                    setSelectedStudentPaymentStatus(student.status);
                  }}
                  className="relative flex h-6 w-1/12 justify-center"
                >
                  <Image
                    src={"/edit-blue.png"}
                    alt="action"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </button>
              </div>
            ))}
          {filteredData &&
            query &&
            filteredData.map((student) => (
              <div
                key={student.activation_id}
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
                  className={`flex h-fit w-2/12 justify-center rounded-md p-2 font-semibold ${student.status === "Pending" ? "bg-[#F1F1F2]" : "bg-[#E8FFF3] text-[#50CD89]"}`}
                >
                  {student.status === "Paid" ? "Sudah Bayar" : "Belum Bayar"}
                </p>
                <button className="relative flex h-6 w-1/12 justify-center">
                  <Image
                    src={"/edit-blue.png"}
                    alt="action"
                    fill
                    style={{ objectFit: "contain" }}
                  />
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
                      checked={
                        selectedStudentPaymentStatus === "Paid" ? true : false
                      }
                      onChange={(checked) =>
                        setSelectedStudentPaymentStatus(
                          checked ? "Paid" : "Pending",
                        )
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
                onClick={() =>
                  updatePaymentStatus(
                    selectedStudentPaymentStatus,
                    selectedStudent?.activation_id,
                  )
                }
                className="w-full rounded-full bg-[#D2E3F1] p-4 font-semibold text-[#3272CA]"
              >
                Simpan Perubahan
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <SuccessDialog
        dialogOpen={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        title={message}
      />
    </div>
  );
}
