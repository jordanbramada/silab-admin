"use client";

import SemesterDropdownMenu from "@/app/components/semester-dropdown-menu";
import SubjectDropdownMenu from "@/app/components/subject-dropdown-menu";
import { Subject } from "@/app/types/subject";
import { Fragment, useRef, useState } from "react";
import { query } from "../page";
import Image from "next/image";
import { Class } from "@/app/types/class-details-class";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type day = {
  value: string;
  title: string;
};

const days: day[] = [
  { title: "Senin", value: "Senin" },
  { title: "Selasa", value: "Selasa" },
  { title: "Rabu", value: "Rabu" },
  { title: "Kamis", value: "Kamis" },
  { title: "Jumat", value: "Jumat" },
];

export default function TambahPraktikum() {
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const [selectedSubject, setSelectedSubject] = useState<Subject>();
  const [query, setQuery] = useState<query[]>([]);
  const [newClass, setNewClass] = useState<Class[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [addClassDisabled, setAddClassDisabled] = useState<boolean>(true);

  const startHourRef1 = useRef(null);
  const startHourRef2 = useRef(null);
  const startMinuteRef1 = useRef(null);
  const startMinuteRef2 = useRef(null);
  const endHourRef1 = useRef(null);
  const endHourRef2 = useRef(null);
  const endMinuteRef1 = useRef(null);
  const endMinuteRef2 = useRef(null);

  const handleInputChange = (e: any, nextRef: any) => {
    const { value, maxLength } = e.target;
    if (value.length >= maxLength) {
      nextRef?.current?.focus();
    }
  };

  const handleKeyDown = (e: any, prevRef: any) => {
    if (e.key === "Backspace" && e.target.value === "" && prevRef) {
      prevRef.current.focus();
    }
  };

  const handleSemesterChange = (value: number) => {
    setSelectedSubject(undefined);
    setAddClassDisabled(true);
    if (value !== undefined) {
      setQuery([{ query: "semester", value: value.toString() }, ...query]);
      setSelectedSemester(value);
    } else {
      setSelectedSemester(0);
      setQuery([]);
    }
  };

  const handleSubjectChange = (value: Subject | undefined) => {
    if (value !== undefined) {
      setSelectedSubject(value);
      setAddClassDisabled(false);
    } else {
      setSelectedSubject(undefined);
      setAddClassDisabled(true);
    }
  };

  const getClassName = () => {
    const classCount = newClass.length;
    const className = String.fromCharCode(65 + classCount);
    return `${className}`;
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-[82px] w-full flex-row space-x-4">
        <div className="flex h-full flex-col space-y-3">
          <p>Semester</p>
          <SemesterDropdownMenu
            onSemesterChange={handleSemesterChange}
            isShowAll={undefined}
          />
        </div>
        <div className="flex h-full flex-col space-y-3">
          <p>Mata Kuliah</p>
          <SubjectDropdownMenu
            isDisabled={selectedSemester !== 0 ? false : true}
            onSubjectChange={handleSubjectChange}
            query={query}
          />
        </div>
      </div>
      <button
        disabled={addClassDisabled}
        onClick={() =>
          setNewClass([
            ...newClass,
            {
              day: "",
              endAt: "",
              id: "",
              isFull: false,
              learningModule: [],
              name: getClassName(),
              participants: [],
              quota: 0,
              ruang: "",
              startAt: "",
              subject: "",
            },
          ])
        }
        className="mt-10 flex w-[180px] flex-row items-center space-x-3 self-end p-2"
      >
        <div
          className={`relative rounded-full p-2 ${addClassDisabled ? "bg-gray-300" : "bg-[#D2E3F1]"}`}
        >
          <Image src={"/plus.png"} height={16} width={16} alt="tambah kelas" />
        </div>
        <p
          className={`text-[16px] ${addClassDisabled ? "font-normal text-gray-500" : "font-bold text-[#3272CA]"}`}
        >
          Tambah Kelas
        </p>
      </button>
      {newClass.map((newClass) => {
        return (
          <div
            key={newClass.name}
            className="mt-10 flex h-[650px] w-full flex-col rounded-[20px] border-[1px] border-[#5E6278]/30 p-5"
          >
            <p className="text-[22px] font-bold">Kelas {newClass.name}</p>
            <div className="mt-10 flex h-[90px] w-full flex-row space-x-10">
              <fieldset className="flex h-full w-[75px] flex-col space-y-3">
                <label className="text-base font-semibold text-[#5E6278]">
                  Kuota
                </label>
                <input
                  className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                  maxLength={2}
                  minLength={1}
                />
              </fieldset>
              <fieldset className="flex h-full w-full flex-col space-y-3">
                <label className="text-base font-semibold text-[#5E6278]">
                  Dosen
                </label>
                <input className="relative h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]" />
                <span className="absolute -translate-x-4 translate-y-10 self-end">
                  <Image
                    alt="password hide toggler"
                    src={"/search.png"}
                    width={24}
                    height={24}
                  />
                </span>
              </fieldset>
            </div>
            <div className="mt-10 flex h-[90px] w-full flex-row justify-between">
              <div className="flex h-full flex-col justify-between space-y-3">
                <p className="text-base font-semibold text-[#5E6278]">Hari</p>
                <Menu>
                  <MenuButton
                    className={`flex h-full w-[300px] flex-row items-center justify-between rounded-2xl bg-white px-[15px] font-semibold text-[#1D1D1D]`}
                  >
                    {selectedDay === "" ? "Hari" : selectedDay}
                    <div className="relative h-[24px] w-[24px]">
                      <Image src={"/down.png"} alt="chevron down" fill />
                    </div>
                  </MenuButton>
                  <MenuItems
                    anchor="bottom"
                    className={`w-[300px] space-y-3 rounded-lg bg-white`}
                  >
                    {days.map((day) => (
                      <MenuItem key={day.value}>
                        <p
                          onClick={() => setSelectedDay(day.value)}
                          className="block px-[15px] py-2 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
                        >
                          {day.title}
                        </p>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
              <div className="flex flex-col space-y-3">
                <p className="text-base font-semibold text-[#5E6278]">
                  Jam Mulai
                </p>
                <div className="flex flex-row items-center space-x-2">
                  <fieldset className="flex h-full w-[54px] flex-col space-y-3">
                    <input
                      ref={startHourRef1}
                      className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                      maxLength={1}
                      minLength={1}
                      onChange={(e) => handleInputChange(e, startHourRef2)}
                    />
                  </fieldset>
                  <fieldset className="flex h-full w-[54px] flex-col space-y-3">
                    <input
                      ref={startHourRef2}
                      className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                      maxLength={1}
                      minLength={1}
                      onChange={(e) => handleInputChange(e, startMinuteRef1)}
                      onKeyDown={(e) => handleKeyDown(e, startHourRef1)}
                    />
                  </fieldset>
                  <div className="flex h-full flex-col justify-center space-y-3">
                    <div className="h-[5px] w-[5px] rounded-full bg-[#1D1D1D]"></div>
                    <div className="h-[5px] w-[5px] rounded-full bg-[#1D1D1D]"></div>
                  </div>
                  <fieldset className="flex h-full w-[54px] flex-col space-y-3">
                    <input
                      ref={startMinuteRef1}
                      className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                      maxLength={1}
                      minLength={1}
                      onChange={(e) => handleInputChange(e, startMinuteRef2)}
                      onKeyDown={(e) => handleKeyDown(e, startHourRef2)}
                    />
                  </fieldset>
                  <fieldset className="flex h-full w-[54px] flex-col space-y-3">
                    <input
                      ref={startMinuteRef2}
                      className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                      maxLength={1}
                      minLength={1}
                      onKeyDown={(e) => handleKeyDown(e, startMinuteRef1)}
                    />
                  </fieldset>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <p className="text-base font-semibold text-[#5E6278]">
                  Jam Selesai
                </p>
                <div className="flex flex-row items-center space-x-2">
                  <fieldset className="flex h-full w-[54px] flex-col space-y-3">
                    <input
                      ref={endHourRef1}
                      className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                      maxLength={1}
                      minLength={1}
                      onChange={(e) => handleInputChange(e, endHourRef2)}
                    />
                  </fieldset>
                  <fieldset className="flex h-full w-[54px] flex-col space-y-3">
                    <input
                      ref={endHourRef2}
                      className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                      maxLength={1}
                      minLength={1}
                      onChange={(e) => handleInputChange(e, endMinuteRef1)}
                      onKeyDown={(e) => handleKeyDown(e, endHourRef1)}
                    />
                  </fieldset>
                  <div className="flex h-full flex-col justify-center space-y-3">
                    <div className="h-[5px] w-[5px] rounded-full bg-[#1D1D1D]"></div>
                    <div className="h-[5px] w-[5px] rounded-full bg-[#1D1D1D]"></div>
                  </div>
                  <fieldset className="flex h-full w-[54px] flex-col space-y-3">
                    <input
                      ref={endMinuteRef1}
                      className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                      maxLength={1}
                      minLength={1}
                      onChange={(e) => handleInputChange(e, endMinuteRef2)}
                      onKeyDown={(e) => handleKeyDown(e, endHourRef2)}
                    />
                  </fieldset>
                  <fieldset className="flex h-full w-[54px] flex-col space-y-3">
                    <input
                      ref={endMinuteRef2}
                      className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                      maxLength={1}
                      minLength={1}
                      onKeyDown={(e) => handleKeyDown(e, endMinuteRef1)}
                    />
                  </fieldset>
                </div>
              </div>
            </div>
            <div className="mt-10 flex h-full w-full flex-col">
              <fieldset className="flex h-full w-full flex-col space-y-3">
                <label className="text-base font-semibold text-[#5E6278]">
                  Asisten Praktikum
                </label>
                <input className="relative h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]" />
                <span className="absolute -translate-x-4 translate-y-10 self-end">
                  <Image
                    alt="password hide toggler"
                    src={"/search.png"}
                    width={24}
                    height={24}
                  />
                </span>
              </fieldset>
            </div>
          </div>
        );
      })}
      <div className="mt-14 flex w-full flex-row justify-end space-x-4">
        <button
          onClick={() => {
            setNewClass([]);
          }}
          className="rounded-full bg-[#FFD9D9] px-[16px] py-[8px] text-[16px] font-semibold text-[#FE2F60]"
        >
          Hapus
        </button>
        <button
          onClick={() => console.log(newClass)}
          className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA]"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
