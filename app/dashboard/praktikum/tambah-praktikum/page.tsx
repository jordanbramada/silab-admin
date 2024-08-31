"use client";

import SemesterDropdownMenu from "@/app/components/semester-dropdown-menu";
import SubjectDropdownMenu from "@/app/components/subject-dropdown-menu";
import { Subject } from "@/app/types/subject";
import { useState } from "react";
import { query } from "../page";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import TimeField from "@/app/components/time-field";
import { day } from "@/app/types/day";
import { Class } from "@/app/types/add-class";
import ClassNameField from "@/app/components/class-name-field";
import ClassQuotaField from "@/app/components/class-quota-field";
import ClassDayDropdown from "@/app/components/class-day-dropdown";
import ClassRoomDropdown from "@/app/components/class-room-dropdown";
import ClassAssistants from "@/app/components/class-assistants";
import ClassAssistantsComboBox from "@/app/components/class-assistants";

export default function TambahPraktikum() {
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const [selectedSubject, setSelectedSubject] = useState<Subject>();
  const [query, setQuery] = useState<query[]>([]);
  const [newClass, setNewClass] = useState<Class[]>([]);
  const [addClassDisabled, setAddClassDisabled] = useState<boolean>(true);

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

  const handleClassAssistantsChange = (value: User[], index: number) => {
    if (value.length !== 0) {
      setNewClass((prevClasses) => {
        const updatedClasses = [...prevClasses];
        updatedClasses[index] = {
          ...updatedClasses[index],
          assistants: value.map((asisten) => asisten.id),
        };
        return updatedClasses;
      });
    }
  };

  const handleClassChange = (index: number, field: keyof Class, value: any) => {
    setNewClass((prevClasses) => {
      const updatedClasses = [...prevClasses];

      updatedClasses[index] = { ...updatedClasses[index], [field]: value };
      return updatedClasses;
    });
  };

  const deleteNewClass = (index: number) => {
    setNewClass((prevClasses) => prevClasses.filter((_, i) => i !== index));
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
            isDisabled={
              (selectedSemester !== 0 ? false : true) ||
              (newClass.length > 0 ? true : false)
            }
            onSubjectChange={handleSubjectChange}
            query={query}
          />
        </div>
      </div>
      <button
        disabled={addClassDisabled}
        onClick={() => {
          if (selectedSubject !== undefined) {
            setNewClass([
              ...newClass,
              {
                day: "",
                endAt: "",
                isFull: false,
                learningModule: [],
                name: "",
                participants: [],
                assistants: [],
                quota: 0,
                ruang: "",
                startAt: "",
                subjectId: selectedSubject.id,
              },
            ]);
          }
        }}
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
      {newClass.map((addNewClass, i) => {
        return (
          <div
            key={i}
            className="mt-10 flex h-[650px] w-full flex-col rounded-[20px] border-[1px] border-[#5E6278]/30 p-5"
          >
            <div className="mt-5 flex h-[90px] w-full flex-row space-x-8">
              <ClassNameField
                value={addNewClass.name}
                onClassNameChange={(value) =>
                  handleClassChange(i, "name", value)
                }
              />
              <ClassQuotaField
                value={
                  addNewClass.quota !== undefined
                    ? addNewClass.quota.toString()
                    : "0"
                }
                onClassQuotaChange={(value) => {
                  if (Number.parseInt(value) > 0) {
                    handleClassChange(i, "quota", Number.parseInt(value));
                  } else {
                    handleClassChange(i, "quota", Number.parseInt("0"));
                  }
                }}
              />
              <ClassRoomDropdown
                value={addNewClass.ruang}
                onClassRoomChange={(value) =>
                  handleClassChange(i, "ruang", value)
                }
              />
            </div>
            <div className="mt-10 flex h-[90px] w-full flex-row space-x-8">
              <ClassDayDropdown
                value={addNewClass.day}
                onDayChange={(value) => handleClassChange(i, "day", value)}
              />
              <TimeField
                label="Jam Mulai"
                value={
                  addNewClass.startAt !== undefined
                    ? addNewClass.startAt
                    : "00:00"
                }
                onTimeChange={(value) => handleClassChange(i, "startAt", value)}
              />
              <TimeField
                label="Jam Selesai"
                value={
                  addNewClass.endAt !== undefined ? addNewClass.endAt : "00:00"
                }
                onTimeChange={(value) => handleClassChange(i, "endAt", value)}
              />
            </div>
            <div className="mt-10 flex h-[280px] w-full flex-col">
              <ClassAssistantsComboBox
                value={addNewClass.assistants}
                onClassAssistantsChange={(value) =>
                  handleClassAssistantsChange(value, i)
                }
              />
            </div>
            <button
              onClick={() => deleteNewClass(i)}
              className="flex flex-row items-center space-x-2 self-end"
            >
              <div className="flex h-[44px] w-[44px] flex-row items-center justify-center rounded-full bg-[#FFD9D9]">
                <Image
                  src={"/trash.png"}
                  alt="delete class icon"
                  width={24}
                  height={24}
                  className="self-center"
                />
              </div>
              <p className="text-[16px] font-bold text-[#FE2F60]">
                Hapus Kelas
              </p>
            </button>
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
