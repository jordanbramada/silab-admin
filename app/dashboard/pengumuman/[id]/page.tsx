"use client";

import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function AnnouncementDetails() {
  const params = useParams<{ id: string }>();

  const { getAnnouncementById, announcementData } = useAnnouncementStore();

  useEffect(() => {
    getAnnouncementById(params.id);
  }, [getAnnouncementById, params.id]);

  return (
    <div className="w-full overflow-auto overscroll-contain">
      <div className="flex w-full flex-col">
        <p className="mt-10 text-[22px] font-bold text-[#1D1D1D]">
          {announcementData?.title}
        </p>
        <p className="mt-10 text-[18px] font-semibold text-[#1D1D1D]">
          {announcementData?.body}
        </p>

        <div className="my-10 h-[1px] w-full bg-[#1D1D1D]/20" />
        <div className="flex w-full flex-col space-y-10">
          <div className="flex flex-row justify-between">
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]/50">
              Tanggal / Waktu Posting
            </p>
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]">
              {announcementData?.created_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
