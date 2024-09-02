"use client";

import { addNewAnnouncement } from "@/app/actions/dashboard/pengumuman/actions";
import AnnouncementTypeDropdown from "@/app/components/announcement-type-dropdown";
import DatePicker from "@/app/components/date-picker";
import SuccessDialog from "@/app/components/success-dialog";
import TimeField from "@/app/components/time-field";
import { Announcement, AnnouncementTypeEnum } from "@/app/types/announcement";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export default function Pengumuman() {
  const [postTime, setPostTime] = useState<string | null>(null);
  const [postDate, setPostDate] = useState<string | null>(null);
  const [dueTime, setDueTime] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<File | undefined>();
  const [post, setPost] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const open = () => {
    setDialogOpen(true);
  };

  const close = () => {
    setDialogOpen(false);
  };

  const initialAnnouncement: Announcement = {
    desc: "",
    detail: "",
    dueDate: "",
    postDate: "",
    posterUrl: null,
    title: "",
    type: AnnouncementTypeEnum.pengumuman,
  };

  const [announcement, setAnnouncement] =
    useState<Announcement>(initialAnnouncement);

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPoster(e.target.files[0]);
      handleValueChange("posterUrl", e.target.files[0]);
    }
  };

  const handlePostDateChange = (date: string) => {
    setPostDate(date);
    if (postDate) {
      const combinedDateTime = `${date}T${postTime}`;
      handleValueChange("postDate", combinedDateTime);
    }
  };

  const handlePostTimeChange = (time: string) => {
    setPostTime(time);
    if (postTime) {
      const combinedDateTime = `${postDate}T${time}`;
      handleValueChange("postDate", combinedDateTime);
    }
  };

  const handleDueDateChange = (date: string) => {
    setDueDate(date);
    if (dueTime) {
      const combinedDateTime = `${date}T${dueTime}`;
      handleValueChange("dueDate", combinedDateTime);
    }
  };

  const handleDueTimeChange = (time: string) => {
    setDueTime(time);
    if (dueDate) {
      const combinedDateTime = `${dueDate}T${time}`;
      handleValueChange("dueDate", combinedDateTime);
    }
  };

  const removeSelectedImage = () => {
    setSelectedPoster(undefined);
  };

  const handleValueChange = (field: keyof Announcement, value: any) => {
    setAnnouncement((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (post === "now") {
      const now = new Date(Date.now());
      handleValueChange("postDate", now.toISOString());
    }
  }, [post]);

  const handleAddNewAnnnouncement = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", announcement.title);
      formData.append("desc", announcement.desc);
      formData.append("type", announcement.type.toString());
      formData.append("postDate", announcement.postDate);
      formData.append("dueDate", announcement.dueDate);

      if (announcement.detail) {
        formData.append("detail", announcement.detail);
      }
      if (selectedPoster) {
        formData.append("file", selectedPoster);
      }

      const response = await addNewAnnouncement(formData);

      if (response["status"] === 200) {
        resetAnnouncement();
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
    handleValueChange("desc", "");
    handleValueChange("detail", "");
    setPost("");
    setSelectedPoster(undefined);
  };

  return (
    <div className="flex h-full w-full flex-col space-y-10">
      <p className="w-full text-[32px] font-semibold text-[#1D1D1D]">
        Buat dan jadwalkan <span className="font-extrabold">pengumuman</span>{" "}
        yang akan disebarkan ke mahasiswa
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
            onChange={(e) => handleValueChange("desc", e.target.value)}
            value={announcement.desc ?? ""}
          />
        </fieldset>
        <fieldset className="w-full space-y-3">
          <label className="text-base font-semibold text-[#5E6278]">
            Detail Pengumuman
          </label>
          <textarea
            className="h-[140px] w-full resize-none rounded-2xl bg-[#F5F5F5] pl-5 pt-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
            placeholder="Detail pengumuman"
            inputMode="text"
            onChange={(e) => handleValueChange("detail", e.target.value)}
            value={announcement.detail ?? ""}
          />
        </fieldset>
        <fieldset className="flex w-full flex-col space-y-3">
          <label className="text-base font-semibold text-[#5E6278]">
            Unggah Poster
          </label>
          <input
            hidden
            id="poster-input"
            className="h-[140px] w-full resize-none rounded-2xl bg-[#F5F5F5] pl-5 pt-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => imageChange(e)}
          />
          <div className="flex flex-row">
            <label
              className="relative h-[60px] w-[60px] rounded-l-2xl bg-[#D1E7FB] p-4"
              htmlFor="poster-input"
            >
              <Image
                src={"/add-files.png"}
                alt="upload poster"
                width={30}
                height={30}
              />
            </label>
            <div className="flex h-[60px] w-[500px] flex-col items-center justify-center rounded-r-2xl bg-[#F5F5F5] text-base font-semibold text-[#1d1d1d]/30">
              Unggah poster dalam format jpg atau png
            </div>
          </div>
          {selectedPoster && (
            <div className="group relative h-[250px] w-[120px]">
              <Image
                src={URL.createObjectURL(selectedPoster)}
                alt="selected poster"
                width={120}
                height={250}
              />
              <button
                onClick={removeSelectedImage}
                className="absolute inset-x-24 inset-y-1 z-10 hidden h-6 w-6 group-hover:block"
              >
                <Image
                  src={"/cross-square.png"}
                  alt="remove selected image"
                  height={24}
                  width={24}
                />
              </button>
            </div>
          )}
        </fieldset>
        <RadioGroup value={post} onChange={setPost} className={`space-y-5`}>
          <Field className={`flex flex-col`}>
            <Radio
              value="now"
              className={`flex flex-row items-center space-x-3`}
            >
              {post === "now" ? (
                <div className="size-[35px] rounded-full border-[7px] border-[#D1E7FB] bg-[#3272CA]" />
              ) : (
                <div className="size-[35px] rounded-full bg-[#F5F5F5]" />
              )}

              <Label className={`text-base font-semibold`}>
                Posting Sekarang
              </Label>
            </Radio>
            <div
              className={`${post === "now" ? "visible" : "hidden"} mt-8 flex w-full flex-row space-x-10 pl-2`}
            >
              <DatePicker
                label="Tenggat Hari"
                onDateChanges={(value) => handleDueDateChange(value)}
              />
              <TimeField
                label="Tenggat Waktu"
                onTimeChange={(e) => handleDueTimeChange(e)}
                value=""
              />
            </div>
          </Field>
          <Field>
            <Radio
              value="scheduled"
              className={`flex flex-row items-center space-x-3`}
            >
              {post === "scheduled" ? (
                <div className="size-[35px] rounded-full border-[7px] border-[#D1E7FB] bg-[#3272CA]" />
              ) : (
                <div className="size-[35px] rounded-full bg-[#F5F5F5]" />
              )}

              <Label className={`text-base font-semibold`}>
                Jadwalkan Posting
              </Label>
            </Radio>
            <div className="flex w-full flex-col">
              <div
                className={`${post === "scheduled" ? "visible" : "hidden"} mt-8 flex w-full flex-row space-x-10 pl-2`}
              >
                <DatePicker
                  label="Tanggal Posting"
                  onDateChanges={(value) => handlePostDateChange(value)}
                />
                <TimeField
                  label="Waktu Posting"
                  onTimeChange={(e) => handlePostTimeChange(e)}
                  value=""
                />
              </div>
              <div
                className={`${post === "scheduled" ? "visible" : "hidden"} mt-8 flex w-full flex-row space-x-10 pl-2`}
              >
                <DatePicker
                  label="Tenggat Hari"
                  onDateChanges={(value) => handleDueDateChange(value)}
                />
                <TimeField
                  label="Tenggat Waktu"
                  onTimeChange={(e) => handleDueTimeChange(e)}
                  value=""
                />
              </div>
            </div>
          </Field>
        </RadioGroup>
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
      <SuccessDialog
        dialogOpen={dialogOpen}
        onClose={close}
        title="Pengumuman Ditambahkan"
      />
    </div>
  );
}
