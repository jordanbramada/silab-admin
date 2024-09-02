"use client";

import { MenuItem } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

interface AnnouncementSettingsDropdownItemProps {
  hoverBgColor: string;
  hoverTextColor: string;
  hoverIcon: string;
  icon: string;
  title: string;
  id: string;
  onMenuClick: (value: string) => void;
}

export default function AnnouncementSettingsDropdownItem({
  hoverBgColor,
  hoverTextColor,
  hoverIcon,
  icon,
  title,
  id,
  onMenuClick,
}: AnnouncementSettingsDropdownItemProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <MenuItem>
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => onMenuClick(id)}
        className={`flex flex-row items-center space-x-3 rounded-lg p-3 align-middle text-[#1D1D1D] ${`hover:bg-[#${hoverBgColor}] hover:text-[#${hoverTextColor}]`}`}
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
