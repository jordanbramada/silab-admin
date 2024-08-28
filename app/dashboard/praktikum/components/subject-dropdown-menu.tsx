import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  Subject,
  SubjectBySemester,
  fetchSubjectData,
} from "../actions/actions";
import { query } from "../page";
import Image from "next/image";

interface SubjectDropdownMenuProps {
  query: query[];
  isDisabled: boolean;
  isShowAll: boolean;
  onSubjectChange: (value: Subject | undefined) => void;
}

export default function SubjectDropdownMenu({
  query,
  isDisabled,
  isShowAll,
  onSubjectChange,
}: SubjectDropdownMenuProps) {
  const [subjectData, setSubjectData] = useState<SubjectBySemester[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setSelectedSubject("");
      setLoading(true);

      try {
        const data = await fetchSubjectData(query);
        setSubjectData(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <Menu>
      <MenuButton
        disabled={isDisabled}
        className={`flex h-full w-[300px] flex-row items-center justify-between rounded-full bg-white px-[15px] ${isDisabled ? "border border-gray-300 bg-opacity-50 text-gray-500" : "bg-opacity-100 text-black"}`}
      >
        {selectedSubject === "" ? "Praktikum" : selectedSubject}
        <div className="relative h-[24px] w-[24px]">
          <Image src={"/down.png"} alt="chevron down" fill />
        </div>
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className={`w-[300px] space-y-3 rounded-lg bg-white`}
      >
        {subjectData.map((subjects) => {
          return subjects.subjects.map((subject) => {
            return (
              <MenuItem key={subject.id}>
                <p
                  className="block px-[15px] py-2 data-[focus]:bg-[#3272CA] data-[focus]:text-white"
                  onClick={() => {
                    setSelectedSubject(subject.name);
                    onSubjectChange(subject);
                  }}
                >
                  {subject.name}
                </p>
              </MenuItem>
            );
          });
        })}
      </MenuItems>
    </Menu>
  );
}
