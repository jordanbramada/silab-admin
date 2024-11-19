import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { AnnouncementType } from "../../types/announcement-type";
import { AnnouncementTypeEnum } from "../../types/announcement";
import { useState } from "react";

const announcementTypeList: AnnouncementType[] = [
  { title: "Pengumuman", value: AnnouncementTypeEnum[3] },
  { title: "Pendaftaran Praktikum", value: AnnouncementTypeEnum[1] },
  { title: "Pendaftaran Inhal", value: AnnouncementTypeEnum[2] },
  {
    title: "Pendaftaran Asisten Praktikum",
    value: AnnouncementTypeEnum[0],
  },
];

interface AnnouncementTypeDropdownProps {
  value: AnnouncementTypeEnum;
  onAnnouncementTypeChange: (value: string) => void;
}

export default function AnnouncementTypeDropdown({
  value,
  onAnnouncementTypeChange,
}: AnnouncementTypeDropdownProps) {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Pengumuman</p>
      <Menu>
        <MenuButton
          value={value}
          className={`flex h-[64px] w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D]`}
        >
          {selected === undefined ? "Pengumuman" : selected}
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className={`w-[var(--button-width)] space-y-3 rounded-lg bg-[#f5f5f5]`}
        >
          {announcementTypeList.map((announcement) => (
            <MenuItem key={announcement.value}>
              <button
                onClick={() => {
                  setSelected(announcement.value);
                  onAnnouncementTypeChange(announcement.value);
                }}
                className="flex w-full flex-row items-start justify-start px-[15px] py-2 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
              >
                {announcement.title}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
