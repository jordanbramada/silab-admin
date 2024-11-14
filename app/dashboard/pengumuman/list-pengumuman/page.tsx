"use client";

import { getAnnouncementList } from "@/app/actions/dashboard/pengumuman/actions";
import AnnouncementSettingsDropdownItem from "@/app/components/announcement-settings-dropdown-item";
import { Pengumuman } from "@/app/types/pengumuman";
import { PengumumanQuery } from "@/app/types/pengumuman-query";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pengumumanQuery: PengumumanQuery[] = [
  { value: true, title: "Terposting" },
  { value: false, title: "Belum Diposting" },
  { value: null, title: "Semua" },
];

export default function ListPengumuman() {
  const [announcementData, setAnnouncementData] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAnnouncementData([]);
        setLoading(true);

        const responseData = await getAnnouncementList();
        if (responseData["status"] === "success") {
          setAnnouncementData(responseData["data"]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-auto overscroll-contain">
      <div className="flex flex-row items-baseline justify-between">
        <p className="text-3xl font-semibold text-[#1D1D1D]">
          <span className="font-extrabold">Semua</span> pengumuman.
        </p>
      </div>
      <div className="mt-10 flex flex-col space-y-10">
        {loading && (
          <span className="loading loading-dots loading-md self-center" />
        )}
        {!loading &&
          announcementData.map((announcement) => (
            <div
              key={announcement.id}
              className="flex w-full flex-row space-x-3"
            >
              <div className="flex h-[210px] w-full flex-col space-y-8 rounded-2xl bg-white p-8 text-[#1d1d1d]">
                <div className="flex flex-col">
                  <p className="text-[22px] font-bold">{announcement.title}</p>
                  <p className="text-[16px] font-light">
                    {new Date(announcement.created_at).toUTCString()} by{" "}
                    {announcement.author}
                  </p>
                </div>
                <p className="text-[18px] font-semibold">{announcement.body}</p>
              </div>
              <Menu>
                <MenuButton className="relative h-[24px] w-[24px]">
                  <Image
                    src={"/dots-vertical.png"}
                    alt="announcement settings"
                    className="static"
                    style={{ objectFit: "contain" }}
                    fill
                    priority
                  />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className={`flex flex-col space-y-4 rounded-2xl bg-white p-4 shadow-[#1D1D1D]/10 drop-shadow-md`}
                >
                  <AnnouncementSettingsDropdownItem
                    hoverIcon="/details-hovered.png"
                    icon="/details.png"
                    title="Lihat Detail"
                    id={announcement.id}
                    onMenuClick={(value) => router.push(`${value}`)}
                  />
                  <div className="h-[1px] w-full bg-[#1D1D1D]/10" />
                  <AnnouncementSettingsDropdownItem
                    hoverIcon="/edit-hovered.png"
                    icon="/edit.png"
                    title="Edit"
                    id={announcement.id}
                    onMenuClick={(value) => console.log(value)}
                  />
                  <div className="h-[1px] w-full bg-[#1D1D1D]/10" />
                  <AnnouncementSettingsDropdownItem
                    hoverIcon="/delete-hovered.png"
                    icon="/delete.png"
                    title="Hapus"
                    id={announcement.id}
                    onMenuClick={(value) => console.log(value)}
                  />
                </MenuItems>
              </Menu>
            </div>
          ))}
      </div>
    </div>
  );
}
