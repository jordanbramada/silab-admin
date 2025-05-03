import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchSubjectData } from "../../actions/dashboard/praktikum/actions";
import { SubjectBySemester } from "../../types/subject-by-semester";
import useSubjectStore from "@/app/store/useSubjectStore";

interface SubjectDropdownMenuProps {
  isDisabled: boolean;
  onSubjectChange: (value: SubjectBySemester | undefined) => void;
}

export default function SubjectDropdownMenu({
  isDisabled,
  onSubjectChange,
}: SubjectDropdownMenuProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const { getAllSubjects, isLoading, error, subjectsData } = useSubjectStore();

  useEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  return (
    <Listbox>
      <ListboxButton
        disabled={isDisabled}
        className={`flex h-[54px] w-[300px] flex-row items-center justify-between rounded-full bg-white px-[15px] ${isDisabled ? "border border-gray-300 bg-opacity-50 text-gray-500" : "bg-opacity-100 text-black"}`}
      >
        {selectedSubject === "" ? "Praktikum" : selectedSubject}
        <div className="relative h-[24px] w-[24px]">
          <Image src={"/down.png"} alt="chevron down" fill />
        </div>
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className={`w-[var(--button-width)] space-y-3 rounded-lg bg-white`}
      >
        {subjectsData.map((subject) => {
          return (
            <ListboxOption
              value={subject}
              key={subject.id}
              className={`data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
            >
              <button
                className="block w-full px-[15px] py-2 text-start"
                onClick={() => {
                  setSelectedSubject(subject.subject_name);
                  onSubjectChange(subject);
                }}
              >
                {subject.subject_name}
              </button>
            </ListboxOption>
          );
        })}
      </ListboxOptions>
    </Listbox>
  );
}
