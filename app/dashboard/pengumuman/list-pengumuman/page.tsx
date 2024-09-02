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
  const [query, setQuery] = useState<PengumumanQuery>(pengumumanQuery[2]);
  const [announcementData, setAnnouncementData] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (query: boolean | null) => {
      try {
        setAnnouncementData([]);
        setLoading(true);

        if (query !== null) {
          const responseData = await getAnnouncementList(query);
          if (responseData["status"] === 200) {
            setAnnouncementData(responseData["data"]);
          }
        } else {
          const responseData = await getAnnouncementList("");
          if (responseData["status"] === 200) {
            setAnnouncementData(responseData["data"]);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(query.value);
  }, [query.value]);

  return (
    <div className="flex h-full w-full flex-col overflow-auto overscroll-contain">
      <div className="flex flex-row items-baseline justify-between">
        {query.value === true && (
          <p className="text-3xl font-semibold text-[#1D1D1D]">
            Pengumuman yang{" "}
            <span className="font-extrabold">telah diposting.</span>
          </p>
        )}
        {query.value === false && (
          <p className="text-3xl font-semibold text-[#1D1D1D]">
            Pengumuman yang <span className="font-extrabold">terjadwal</span>
          </p>
        )}
        {query.value === null && (
          <p className="text-3xl font-semibold text-[#1D1D1D]">
            <span className="font-extrabold">Semua</span> pengumuman.
          </p>
        )}
        <Menu>
          <MenuButton
            className={`flex h-full w-[200px] flex-row items-center justify-between rounded-full bg-white px-[15px] text-[14px] font-semibold text-[#3272CA]`}
          >
            {query.title}
            <div className="relative h-[24px] w-[24px]">
              <Image src={"/down-blue.png"} alt="chevron down" fill />
            </div>
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className={`w-[200px] space-y-3 rounded-lg bg-white`}
          >
            {pengumumanQuery.map((item, i) => (
              <MenuItem key={i}>
                <p
                  className="block px-[15px] py-2 text-[14px] font-medium data-[focus]:bg-[#3272CA] data-[focus]:text-white"
                  onClick={() => {
                    setQuery(item);
                  }}
                >
                  {item.title}
                </p>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
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
                <p className="text-[22px] font-bold">{announcement.title}</p>
                <p className="text-[18px] font-semibold">{announcement.desc}</p>
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
                    hoverBgColor="D1E7FB"
                    hoverIcon="/details-hovered.png"
                    hoverTextColor="3272CA"
                    icon="/details.png"
                    title="Lihat Detail"
                    id={announcement.id}
                    onMenuClick={(value) => router.push(`${value}`)}
                  />
                  <div className="h-[1px] w-full bg-[#1D1D1D]/10" />
                  <AnnouncementSettingsDropdownItem
                    hoverBgColor="D1E7FB"
                    hoverIcon="/edit-hovered.png"
                    hoverTextColor="3272CA"
                    icon="/edit.png"
                    title="Edit"
                    id={announcement.id}
                    onMenuClick={(value) => console.log(value)}
                  />
                  <div className="h-[1px] w-full bg-[#1D1D1D]/10" />
                  <AnnouncementSettingsDropdownItem
                    hoverBgColor="FFD9D9"
                    hoverIcon="/delete-hovered.png"
                    hoverTextColor="FF0000"
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
