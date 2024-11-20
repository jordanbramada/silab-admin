import { getAnnouncementList } from "@/app/actions/dashboard/pengumuman/actions";
import AnnouncementCard from "@/app/components/pengumuman/announcement-card";
import AnnouncementSettingsDropdownItem from "@/app/components/pengumuman/announcement-settings-dropdown-item";
import { getAccessToken } from "@/app/lib/sessions";
import { Pengumuman } from "@/app/types/pengumuman";
import { PengumumanQuery } from "@/app/types/pengumuman-query";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default async function ListPengumuman() {
  const accessToken = await getAccessToken();
  const res = await fetch(`${process.env.BASE_URL}/announcements`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  const responseData = await res.json();
  const data: Pengumuman[] = (await responseData["data"]) as Pengumuman[];

  return (
    <div className="flex h-full w-full flex-col overflow-auto overscroll-contain">
      <div className="flex flex-row items-baseline justify-between">
        <p className="text-3xl font-semibold text-[#1D1D1D]">
          <span className="font-extrabold">Semua</span> pengumuman.
        </p>
      </div>
      <div className="mt-10 flex flex-col space-y-10">
        {data &&
          data.map((announcement: Pengumuman) => (
            <AnnouncementCard
              announcement={announcement}
              key={announcement.id}
            />
          ))}
      </div>
    </div>
  );
}
