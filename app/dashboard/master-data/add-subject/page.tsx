"use client";

import { addSubjectFormSubmit } from "@/app/actions/dashboard/master-data/add-subject/action";
import SuccessDialog from "@/app/components/success-dialog";
import { FormEvent, useState } from "react";

export default function AddSubject() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const open = () => {
    setDialogOpen(true);
  };

  const close = () => {
    setDialogOpen(false);
  };

  const handleAddSubjectFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    setLoading(true);
    event.preventDefault();

    try {
      const response = await addSubjectFormSubmit(
        new FormData(event.currentTarget),
      );

      setMessage(response["message"]);
      setError(response["error"]);
    } catch (error) {
      console.log(error);
    } finally {
      open();
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full">
      <form
        onSubmit={handleAddSubjectFormSubmit}
        className="flex h-full w-full flex-col space-y-4 rounded-2xl bg-white p-5"
      >
        <div className="flex flex-row space-x-4">
          <fieldset className="flex h-full w-[75px] flex-col space-y-3">
            <label className="text-base font-semibold text-[#5E6278]">
              SKS
            </label>
            <input
              name="credit"
              className="h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
              type="text"
              maxLength={1}
              minLength={1}
            />
          </fieldset>
          <fieldset className="flex h-full w-full flex-col space-y-3">
            <label className="text-base font-semibold text-[#5E6278]">
              Kode Mata Kuliah
            </label>
            <input
              name="subject_code"
              className="h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
              type="text"
            />
          </fieldset>
        </div>
        <fieldset className="flex h-full w-full flex-col space-y-3">
          <label className="text-base font-semibold text-[#5E6278]">
            Nama Mata Kuliah
          </label>
          <input
            name="subject_name"
            className="h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
            type="text"
          />
        </fieldset>
        <button
          type="submit"
          className="h-[54px] w-[140px] self-end rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA]"
        >
          {loading && <span className="loading loading-dots loading-md" />}
          {!loading && "Simpan"}
          {!error && (
            <SuccessDialog
              dialogOpen={dialogOpen}
              onClose={close}
              title={message}
            />
          )}
        </button>
      </form>
    </div>
  );
}
