"use client";

import { addNewAnnouncement } from "@/app/actions/dashboard/pengumuman/actions";
import AnnouncementTypeDropdown from "@/app/components/announcement-type-dropdown";
import ErrorDialog from "@/app/components/error-dialog";
import SuccessDialog from "@/app/components/success-dialog";
import { Announcement, AnnouncementTypeEnum } from "@/app/types/announcement";
import { useState } from "react";

export default function Pengumuman() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const open = () => {
    setDialogOpen(true);
  };

  const close = () => {
    setDialogOpen(false);
  };

  const initialAnnouncement: Announcement = {
    type: AnnouncementTypeEnum.Basic,
    title: "",
    body: "",
  };

  const [announcement, setAnnouncement] =
    useState<Announcement>(initialAnnouncement);

  const handleValueChange = (field: keyof Announcement, value: any) => {
    setAnnouncement((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNewAnnnouncement = async () => {
    try {
      setLoading(true);

      const response = await addNewAnnouncement(announcement);

      if (response["status"] === "success") {
        setError(false);
        setMessage(response["message"]);
        resetAnnouncement();
        open();
      } else {
        setError(true);
        setMessage(response["message"]);
        open();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetAnnouncement = () => {
    handleValueChange("title", "");
    handleValueChange("type", "");
    handleValueChange("body", "");
  };

  return (
    <div className="flex h-full w-full flex-col space-y-10">
      <p className="w-full text-[32px] font-semibold text-[#1D1D1D]">
        Buat <span className="font-extrabold">pengumuman</span> yang akan
        disebarkan ke mahasiswa
      </p>

      <div className="flex h-screen w-full flex-col space-y-10 overflow-auto overscroll-contain rounded-[20px] bg-white p-5">
        <p className="text-[22px] font-bold text-[#1D1D1D]">Buat Pengumuman</p>
        <fieldset className="w-full space-y-3">
          <label className="text-base font-semibold text-[#5E6278]">
            Judul Pengumuman
          </label>
          <input
            required
            className="h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
            placeholder="Judul pengumuman"
            onChange={(e) => handleValueChange("title", e.target.value)}
            value={announcement.title ?? ""}
          />
        </fieldset>
        <div className="h-[85px]">
          <AnnouncementTypeDropdown
            onAnnouncementTypeChange={(value) =>
              handleValueChange("type", value)
            }
            value={announcement.type}
          />
        </div>
        <fieldset className="w-full space-y-3">
          <label className="text-base font-semibold text-[#5E6278]">
            Deskripsi Pengumuman{" "}
            <span className="text-xs font-normal text-[#5E6278]/75">
              (maks: 200 karakter)
            </span>
          </label>
          <textarea
            required
            className="h-[140px] w-full resize-none rounded-2xl bg-[#F5F5F5] pl-5 pt-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
            placeholder="Deskripsi pengumuman"
            maxLength={200}
            inputMode="text"
            onChange={(e) => handleValueChange("body", e.target.value)}
            value={announcement.body ?? ""}
          />
        </fieldset>
        <div className="my-10 h-[1px] w-full bg-[#1D1D1D]/30" />
        <div className="flex w-full flex-row justify-end space-x-6">
          <button
            onClick={() => resetAnnouncement()}
            className="rounded-full bg-[#FFD9D9] px-[16px] py-[8px] text-[16px] font-semibold text-[#FE2F60]"
          >
            Hapus
          </button>
          <button
            onClick={() => handleAddNewAnnnouncement()}
            className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA]"
          >
            {!loading ? (
              "Simpan"
            ) : (
              <span className="loading loading-dots loading-sm" />
            )}
          </button>
        </div>
      </div>
      {!error && (
        <SuccessDialog
          dialogOpen={dialogOpen}
          onClose={close}
          title={message}
        />
      )}
      {error && (
        <ErrorDialog dialogOpen={dialogOpen} onClose={close} title={message} />
      )}
    </div>
  );
}
