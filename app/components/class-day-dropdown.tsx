"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { day } from "../types/day";
import { useEffect, useState } from "react";

interface ClassDayDropdownProps {
  onDayChange: (value: string) => void;
  value: string;
}

export default function ClassDayDropdown({
  onDayChange,
  value,
}: ClassDayDropdownProps) {
  const [selectedDay, setSelectedDay] = useState<string>("");

  const days: day[] = [
    { title: "Senin", value: "Senin" },
    { title: "Selasa", value: "Selasa" },
    { title: "Rabu", value: "Rabu" },
    { title: "Kamis", value: "Kamis" },
    { title: "Jumat", value: "Jumat" },
  ];

  useEffect(() => setSelectedDay(value), [value]);

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Hari</p>
      <Menu>
        <MenuButton
          value={value}
          className={`flex h-full w-full flex-row items-center justify-between rounded-2xl bg-white px-[15px] font-semibold text-[#1D1D1D]`}
        >
          {selectedDay === "" ? "Hari" : selectedDay}
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className={`w-[480px] space-y-3 rounded-lg bg-white`}
        >
          {days.map((day) => (
            <MenuItem key={day.value}>
              <button
                onClick={() => {
                  setSelectedDay(day.value);
                  onDayChange(day.value);
                }}
                className="flex w-full flex-row items-start justify-start px-[15px] py-2 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
              >
                {day.title}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
