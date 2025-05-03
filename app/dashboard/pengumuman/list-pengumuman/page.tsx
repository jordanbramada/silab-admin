"use client";

import AnnouncementCard from "@/app/components/pengumuman/announcement-card";
import { IGetAllAnnouncementsResponseBody } from "@/app/interfaces/announcement/announcement.interface";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import { useEffect } from "react";

const ListPengumuman = () => {
  const { announcementsData, getAllAnnouncements } = useAnnouncementStore();

  useEffect(() => {
    getAllAnnouncements();
  }, [getAllAnnouncements]);

  return (
    <div className="flex h-full w-full flex-col overflow-auto overscroll-contain">
      <div className="flex flex-row items-baseline justify-between">
        <p className="text-3xl font-semibold text-[#1D1D1D]">
          <span className="font-extrabold">Semua</span> pengumuman.
        </p>
      </div>
      <div className="mt-10 flex flex-col space-y-10">
        {announcementsData &&
          announcementsData.map(
            (announcement: IGetAllAnnouncementsResponseBody) => (
              <AnnouncementCard
                announcement={announcement}
                key={announcement.id}
              />
            ),
          )}
      </div>
    </div>
  );
};

export default ListPengumuman;
