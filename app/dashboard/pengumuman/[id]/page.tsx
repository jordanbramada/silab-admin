"use client";

import { getAnnouncementDetails } from "@/app/actions/dashboard/pengumuman/[id]/actions";
import { Pengumuman } from "@/app/types/pengumuman";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AnnouncementDetailsProps {
  params: { id: string };
}

export default function AnnouncementDetails({
  params,
}: AnnouncementDetailsProps) {
  const [announcement, setAnnouncement] = useState<Pengumuman>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const responseData = await getAnnouncementDetails(params.id);

        if (responseData["status"] === 200) {
          setAnnouncement(responseData["data"]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="w-full overflow-auto overscroll-contain">
      {loading && !announcement && (
        <span className="loading loading-dots loading-md self-center" />
      )}
      {!loading && announcement && (
        <div className="flex w-full flex-col">
          {announcement.posterUrl &&
            (console.log(announcement.posterUrl),
            (
              <Image
                src={announcement.posterUrl}
                alt="poster"
                height={0}
                width={0}
                sizes="100vw"
                style={{ height: "100%", width: "auto" }}
                className="self-center"
              />
            ))}
          <p className="mt-10 text-[22px] font-bold text-[#1D1D1D]">
            {announcement.title}
          </p>
          <p className="mt-10 text-[18px] font-semibold text-[#1D1D1D]">
            {announcement.desc}
          </p>
          <p className="mt-10 text-[18px] font-semibold text-[#1D1D1D]">
            {announcement.detail}
          </p>
          <div className="my-10 h-[1px] w-full bg-[#1D1D1D]/20" />
          <div className="flex w-full flex-col space-y-10">
            <div className="flex flex-row justify-between">
              <p className="w-1/3 text-lg font-bold text-[#1D1D1D]/50">
                Tanggal / Waktu Posting
              </p>
              <p className="w-1/3 text-lg font-bold text-[#1D1D1D]">
                {new Date(announcement.postDate).toDateString()}
              </p>
              <p className="w-1/3 text-lg font-bold text-[#1D1D1D]">
                {new Date(announcement.postDate).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="w-1/3 text-lg font-bold text-[#1D1D1D]/50">
                Tenggat Posting{" "}
              </p>
              <p className="w-1/3 text-lg font-bold text-[#1D1D1D]">
                {new Date(announcement.dueDate).toDateString()}
              </p>
              <p className="w-1/3 text-lg font-bold text-[#1D1D1D]">
                {new Date(announcement.dueDate).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
