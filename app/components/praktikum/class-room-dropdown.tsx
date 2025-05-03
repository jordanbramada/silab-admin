"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { day } from "../../types/day";
import { useEffect, useState } from "react";

interface ClassRoomDropdownProps {
  onRoomChange: (value: string) => void;
  value: string;
}

type room = {
  title: string;
  value: string;
};

export default function ClassRoomDropdown({
  onRoomChange,
  value,
}: ClassRoomDropdownProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const rooms: room[] = [
    { title: "PSI", value: "PSI" },
    { title: "SBTI", value: "SBTI" },
  ];

  useEffect(() => setSelectedRoom(value), [value]);

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Ruangan</p>
      <Listbox>
        <ListboxButton
          value={value}
          className={`flex h-full w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D]`}
        >
          {selectedRoom === "" ? "Ruangan" : selectedRoom}
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={`w-[var(--button-width)] space-y-3 rounded-lg bg-[#f5f5f5]`}
        >
          {rooms.map((room) => (
            <ListboxOption
              value={room.value}
              key={room.value}
              className={`text-[#1d1d1d] data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
            >
              <button
                onClick={() => {
                  setSelectedRoom(room.value);
                  onRoomChange(room.value);
                }}
                className="flex w-full flex-row items-start justify-start px-[15px] py-2 font-semibold"
              >
                {room.title}
              </button>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
