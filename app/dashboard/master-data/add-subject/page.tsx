"use client";

import { addSubjectFormSubmit } from "@/app/actions/dashboard/master-data/add-subject/action";
import ErrorDialog from "@/app/components/error-dialog";
import LecturerListBox from "@/app/components/master-data/lecturer-listbox";
import SemestersListBox from "@/app/components/semesters-listbox";
import SuccessDialog from "@/app/components/success-dialog";
import { IAddSubjectRequestBody } from "@/app/interfaces/subject/subject.interface";
import useSubjectStore from "@/app/store/useSubjectStore";
import { Lecturer } from "@/app/types/lecturer";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const subjectSchema = z.object({
  subject_code: z.string().min(1, "Kode mata kuliah wajib diisi"),
  subject_name: z.string().min(1, "Nama mata kuliah wajib diisi"),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

export default function AddSubject() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [semester, setSemester] = useState<string>("");
  const [lecturer, setLecturer] = useState<string>("");

  const { addSubject, isLoading, error } = useSubjectStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
  });

  const open = () => {
    setDialogOpen(true);
  };

  const close = () => {
    setDialogOpen(false);
  };

  const onSubmit = async () => {
    const data = watch();

    const addSubjectData: IAddSubjectRequestBody = {
      subject_name: data.subject_name,
      subject_code: data.subject_code,
      lecturer_id: lecturer,
      semester: semester,
    };

    await addSubject(addSubjectData);
  };

  const handleLecturerChange = (value: string) => {
    setLecturer(value);
  };

  const handleSemesterChange = (value: string) => {
    setSemester(value);
  };

  return (
    <div className="h-full w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col space-y-4 rounded-2xl bg-white p-5"
      >
        <div className="flex h-full w-full flex-col space-y-4">
          <div className="flex flex-row space-x-4">
            <div className="flex h-full w-full flex-col space-y-3">
              <label className="text-base font-semibold text-[#5E6278]">
                Kode Mata Kuliah
              </label>
              <input
                className="h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                type="text"
                {...register("subject_code")}
              />
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <SemestersListBox onSemesterChange={handleSemesterChange} />
            <div className="flex h-fit w-full flex-col space-y-3">
              <label className="text-base font-semibold text-[#5E6278]">
                Nama Mata Kuliah
              </label>
              <input
                className="h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                type="text"
                {...register("subject_name")}
              />
            </div>
          </div>
          <LecturerListBox
            value={lecturer}
            onLecturerChange={handleLecturerChange}
          />
        </div>
        <button
          type="submit"
          className="h-[54px] w-[140px] self-end rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA]"
        >
          {isLoading && <span className="loading loading-dots loading-md" />}
          {!isLoading && "Simpan"}
          {!error && !isLoading && (
            <SuccessDialog
              dialogOpen={dialogOpen}
              onClose={close}
              title={"Success"}
            />
          )}
          {error && !isLoading && (
            <ErrorDialog
              dialogOpen={dialogOpen}
              onClose={close}
              title={error}
            />
          )}
        </button>
      </form>
    </div>
  );
}
