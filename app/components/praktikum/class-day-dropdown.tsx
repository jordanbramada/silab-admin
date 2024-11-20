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
    { title: "Monday", value: "Monday" },
    { title: "Tuesday", value: "Tuesday" },
    { title: "Wednesday", value: "Wednesday" },
    { title: "Thursday", value: "Thursday" },
    { title: "Friday", value: "Friday" },
  ];

  useEffect(() => setSelectedDay(value), [value]);

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Hari</p>
      <Listbox>
        <ListboxButton
          value={value}
          className={`flex h-full w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D]`}
        >
          {selectedDay === "" ? "Hari" : selectedDay}
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={`w-[var(--button-width)] space-y-3 rounded-lg bg-[#f5f5f5]`}
        >
          {days.map((day) => (
            <ListboxOption
              value={day.value}
              key={day.value}
              className={`text-[#1d1d1d] data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
            >
              <button
                onClick={() => {
                  setSelectedDay(day.value);
                  onDayChange(day.value);
                }}
                className="flex w-full flex-row items-start justify-start px-[15px] py-2 font-semibold"
              >
                {day.title}
              </button>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
