"use client";

import { MenuItem } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

interface AnnouncementSettingsDropdownItemProps {
  hoverIcon: string;
  icon: string;
  title: string;
  id: string;
}

export default function AnnouncementSettingsDropdownItem({
  hoverIcon,
  icon,
  title,
  id,
}: AnnouncementSettingsDropdownItemProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <MenuItem>
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`flex flex-row items-center space-x-3 rounded-lg p-3 align-middle text-[#1D1D1D] ${title === "Lihat Detail" || title === "Edit" ? "hover:bg-[#D1E7FB] hover:text-[#3272CA]" : "hover:bg-[#FFD9D9] hover:text-[#FF0000]"}`}
      >
        <div className="relative h-[20px] w-[20px]">
          {isHovered ? (
            <Image
              src={hoverIcon}
              alt="announcement settings"
              className="static"
              style={{ objectFit: "contain" }}
              fill
              priority
            />
          ) : (
            <Image
              src={icon}
              alt="announcement settings"
              className="static"
              style={{ objectFit: "contain" }}
              fill
              priority
            />
          )}
        </div>
        <p className="text-sm font-semibold">{title}</p>
      </button>
    </MenuItem>
  );
}
