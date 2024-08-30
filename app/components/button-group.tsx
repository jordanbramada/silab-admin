"use client";

import { useState } from "react";
import SemesterDropdownMenu from "./semester-dropdown-menu";
import { query } from "../dashboard/praktikum/page";
import ClassesDropdownMenu from "./classes-dropdown-menu";
import SubjectDropdownMenu from "./subject-dropdown-menu";
import { Subject } from "../types/subject";

type ButtonGroupProps = {
  onQueryChanges: (query: query[]) => void;
  onSubjectQueryChanges: (subject: Subject | undefined) => void;
};

export default function ButtonGroup({
  onQueryChanges,
  onSubjectQueryChanges,
}: ButtonGroupProps) {
  const [query, setQuery] = useState<query[]>([]);
  const [subjectQuery, setSubjectQuery] = useState<Subject>();

  const handleSemesterChange = (value: number) => {
    if (value !== undefined) {
      onQueryChanges([
        { query: "semester", value: value.toString() },
        ...query,
      ]);
      setQuery([{ query: "semester", value: value.toString() }, ...query]);
      setSubjectQuery(undefined);
    } else {
      setSubjectQuery(undefined);
      setQuery([]);
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
    <div className="mt-[40px] flex h-[44px] w-full flex-row">
      <button
        className={`py-15 px-15 mr-4 h-full w-[90px] rounded-[30px] bg-white ${query.length !== 0 ? "border" : "border border-[#BFD9EF] font-semibold text-[#3272CA]"}`}
        onClick={() => {
          setQuery([]);
          setSubjectQuery(undefined);
          onQueryChanges([]);
          onSubjectQueryChanges(undefined);
        }}
      >
        Show All
      </button>
      <div className="mr-4 inline-block h-full w-[1px] self-stretch rounded-full bg-[#1d1d1d]/30"></div>
      <div className="flex h-full w-full flex-row space-x-5">
        <SemesterDropdownMenu
          isShowAll={query.length === 0 ? true : false}
          onSemesterChange={handleSemesterChange}
        />
        <SubjectDropdownMenu
          query={query}
          isDisabled={query.length !== 0 ? false : true}
          onSubjectChange={handleSubjectChange}
        />
        <ClassesDropdownMenu
          classes={[]}
          isDisabled={true}
          isShowAll={query.length === 0 ? true : false}
          onClassChange={handleClassChange}
        />
        <button className="h-full rounded-[30px] bg-[#BFD9EF] px-[15px] text-[#3272CA]">
          Search
        </button>
      </div>
    </div>
  );
}
