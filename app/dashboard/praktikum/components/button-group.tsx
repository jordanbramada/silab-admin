"use client";

import { useState } from "react";
import SemesterDropdownMenu from "./semester-dropdown-menu";
import { query } from "../page";
import SubjectDropdownMenu from "./subject-dropdown-menu";
import ClassesDropdownMenu from "./classes-dropdown-menu";

type ButtonGroupProps = {
  onQueryChanges: (query: query[]) => void;
};

export default function ButtonGroup({ onQueryChanges }: ButtonGroupProps) {
  const [query, setQuery] = useState<query[]>([]);

  const handleSemesterChange = (value: number) => {
    if (value !== undefined) {
      onQueryChanges([
        { query: "semester", value: value.toString() },
        ...query,
      ]);
      setQuery([{ query: "semester", value: value.toString() }, ...query]);
    } else {
      setQuery([]);
    }
  };

  const handleSubjectChange = (value: string) => {};

  return (
    <div className="mt-[40px] flex h-[44px] w-full flex-row">
      <button
        className={`py-15 px-15 mr-4 h-full w-[90px] rounded-[30px] bg-white ${query.length !== 0 ? "border" : "border border-[#BFD9EF] font-semibold text-[#3272CA]"}`}
        onClick={() => {
          setQuery([]);
          onQueryChanges([]);
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
          isShowAll={query.length === 0 ? true : false}
          query={query}
          isDisabled={query.length !== 0 ? false : true}
          onSubjectChange={handleSubjectChange}
        />
        <ClassesDropdownMenu
          classes={[]}
          isDisabled={true}
          isShowAll={query.length === 0 ? true : false}
        />
        <button className="h-full rounded-[30px] bg-[#BFD9EF] px-[15px] text-[#3272CA]">
          Search
        </button>
      </div>
    </div>
  );
}
