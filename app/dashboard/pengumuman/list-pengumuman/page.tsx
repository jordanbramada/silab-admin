"use client";

import { getAnnouncementList } from "@/app/actions/dashboard/pengumuman/actions";
import { PengumumanQuery } from "@/app/types/pengumuman-query";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const pengumumanQuery: PengumumanQuery[] = [
  { value: true, title: "Terposting" },
  { value: false, title: "Belum Diposting" },
  { value: null, title: "Semua" },
];

export default function ListPengumuman() {
  const [query, setQuery] = useState<PengumumanQuery>(pengumumanQuery[2]);
  const [announcementData, setAnnouncementData] = useState();

  useEffect(() => {
    const fetchData = async (query: boolean | null) => {
      if (query !== null) {
        const responseData = await getAnnouncementList(query);
        if (responseData["status"] === 200) {
        }
      } else {
        const responseData = await getAnnouncementList("");
        if (responseData["status"] === 200) {
        }
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
    </div>
  );
}
