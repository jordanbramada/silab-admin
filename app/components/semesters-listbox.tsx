"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

const semesters: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface SemestersListBoxProps {
  onSemesterChange: (value: string) => void;
}

export default function SemestersListBox({
  onSemesterChange,
}: SemestersListBoxProps) {
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  return (
    <fieldset className="flex h-fit w-1/3 flex-col space-y-3">
      <label className="text-base font-semibold text-[#5E6278]">Semester</label>
      <Listbox
        value={selectedSemester}
        onChange={(value) => {
          setSelectedSemester(value);
          onSemesterChange(value);
        }}
      >
        <ListboxButton
          className={`relative flex h-[54px] w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px]`}
        >
          <p>
            {selectedSemester && selectedSemester}
            {!selectedSemester && "Semester"}
          </p>
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={`mt-2 h-fit w-[var(--button-width)] rounded-lg bg-[#f5f5f5]`}
        >
          {semesters.map((semester) => (
            <ListboxOption
              className={`flex h-[54px] w-full items-center justify-center data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
              key={semester}
              value={semester}
            >
              <button className="h-full w-full">{semester}</button>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </fieldset>
  );
}
