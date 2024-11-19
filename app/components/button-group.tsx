"use client";

import { useState } from "react";
import SemesterDropdownMenu from "./semester-dropdown-menu";
import { query } from "../dashboard/praktikum/page";
import ClassesDropdownMenu from "./classes-dropdown-menu";
import SubjectDropdownMenu from "./praktikum/subject-dropdown-menu";
import { Subject } from "../types/subject";

type ButtonGroupProps = {
  onSemesterChanges: (semester: string) => void;
  onSubjectQueryChanges: (subject: Subject | undefined) => void;
};

export default function ButtonGroup({
  onSemesterChanges,
  onSubjectQueryChanges,
}: ButtonGroupProps) {
  const [subjectQuery, setSubjectQuery] = useState<Subject>();
  const [semester, setSemester] = useState<string>("");

  const handleSemesterChange = (value: number) => {
    if (value !== undefined) {
      setSemester(value.toString());
      onSemesterChanges(value.toString());
      setSubjectQuery(undefined);
    } else {
      setSubjectQuery(undefined);
    }
  };

  const handleSubjectChange = (value: Subject | undefined) => {
    if (value !== undefined) {
      onSubjectQueryChanges(value);
      setSubjectQuery(value);
    }
  };

  const handleClassChange = (value: string) => {};

  return (
    <div className="mt-[40px] flex h-[54px] w-full flex-row">
      <button
        className={`py-15 px-15 h- mr-4 w-[90px] rounded-[30px] bg-white ${semester !== "" ? "border" : "border border-[#BFD9EF] font-semibold text-[#3272CA]"}`}
        onClick={() => {
          setSubjectQuery(undefined);
          onSubjectQueryChanges(undefined);
        }}
      >
        Show All
      </button>
      <div className="mr-4 inline-block h-full w-[1px] self-stretch rounded-full bg-[#1d1d1d]/30"></div>
      <div className="flex h-full w-full flex-row space-x-5">
        <SemesterDropdownMenu
          isDisabled={undefined}
          isShowAll={semester === "" ? true : false}
          onSemesterChange={handleSemesterChange}
        />
        <SubjectDropdownMenu
          isDisabled={semester !== "" ? false : true}
          onSubjectChange={handleSubjectChange}
        />
        <ClassesDropdownMenu
          classes={[]}
          isDisabled={true}
          isShowAll={semester === "" ? true : false}
          onClassChange={handleClassChange}
        />
        <button className="h-full rounded-[30px] bg-[#BFD9EF] px-[15px] text-[#3272CA]">
          Search
        </button>
      </div>
    </div>
  );
}
