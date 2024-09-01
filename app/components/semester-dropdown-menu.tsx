import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

const menuItems: menuItems[] = [
  { title: "Semester 1", value: 1 },
  { title: "Semester 2", value: 2 },
  { title: "Semester 3", value: 3 },
  { title: "Semester 4", value: 4 },
  { title: "Semester 5", value: 5 },
  { title: "Semester 6", value: 6 },
  { title: "Semester 7", value: 7 },
  { title: "Semester 8", value: 8 },
];

interface menuItems {
  value: number;
  title: string;
}

type SemesterDropdownMenuProps = {
  onSemesterChange: (value: number) => void;
  isShowAll: boolean | undefined;
  isDisabled: boolean | undefined;
};

export default function SemesterDropdownMenu({
  onSemesterChange,
  isShowAll,
  isDisabled,
}: SemesterDropdownMenuProps) {
  const [selectedSemester, setSelectedSemester] = useState<String>("");

  return (
    <Menu>
      <MenuButton
        disabled={isDisabled}
        className={`flex h-full w-[150px] flex-row items-center justify-between rounded-full bg-white px-[15px] ${isDisabled ? "border border-gray-300 bg-opacity-50 text-gray-500" : "bg-opacity-100 text-black"}`}
      >
        {selectedSemester === "" || isShowAll ? "Semester" : selectedSemester}
        <div className="relative h-[24px] w-[24px]">
          <Image src={"/down.png"} alt="chevron down" fill />
        </div>
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className={`w-[150px] space-y-3 rounded-lg bg-white`}
      >
        {menuItems.map((item) => {
          return (
            <MenuItem key={item.value}>
              <p
                className="block px-[15px] py-2 data-[focus]:bg-[#3272CA] data-[focus]:text-white"
                onClick={() => {
                  onSemesterChange(item.value);
                  setSelectedSemester(item.title);
                }}
              >
                {item.title}
              </p>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
