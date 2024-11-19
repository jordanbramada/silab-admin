"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import AnnouncementSettingsDropdownItem from "./announcement-settings-dropdown-item";
import Image from "next/image";
import { Pengumuman } from "../types/pengumuman";
interface AnnouncementCardProps {
  announcement: Pengumuman;
}

export default function AnnouncementCard({
  announcement,
}: AnnouncementCardProps) {
  return (
    <div key={announcement.id} className="flex w-full flex-row space-x-3">
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
            onMenuClick={(value) => console.log(value)}
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
  );
}
