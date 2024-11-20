"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { Lecturer } from "../../types/lecturer";
import { useEffect, useState } from "react";
import { getLecturers } from "../../actions/dashboard/master-data/add-subject/action";

interface LecturerListBoxProps {
  onLecturerChange: (value: string) => void;
}

export default function LecturerListBox({
  onLecturerChange,
}: LecturerListBoxProps) {
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer>();
  const [lecturersData, setLecturersData] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseData = await getLecturers();

        if (responseData["status"] === "success") {
          setLecturersData(responseData["data"]);
        } else if (responseData["error"] === true) {
          console.log(responseData["message"]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <fieldset className="flex h-fit w-full flex-col space-y-3">
      <label className="text-base font-semibold text-[#5E6278]">
        Dosen Pengampu
      </label>
      <Listbox
        value={selectedLecturer}
        onChange={(value) => {
          setSelectedLecturer(value);
          onLecturerChange(value.id);
        }}
      >
        <ListboxButton
          className={`relative flex h-[54px] w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px]`}
        >
          <p>
            {selectedLecturer && selectedLecturer.fullname}
            {!selectedLecturer && "Dosen Pengampu"}
          </p>
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={`mt-2 h-fit w-[var(--button-width)] rounded-lg bg-[#f5f5f5]`}
        >
          {lecturersData.map((lecturer) => (
            <ListboxOption
              className={`flex h-[54px] w-full items-center justify-center data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
              key={lecturer.id}
              value={lecturer}
            >
              <button className="h-full w-full pl-4 text-start">
                {lecturer.fullname}
              </button>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </fieldset>
  );
}
