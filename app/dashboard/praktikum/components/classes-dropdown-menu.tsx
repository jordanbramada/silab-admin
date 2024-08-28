import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Class } from "../actions/actions";
import { useState } from "react";
import Image from "next/image";

interface ClassesDropdownMenuProps {
  isDisabled: boolean;
  isShowAll: boolean;
  classes: Class[];
  onClassChange: (value: string) => void;
}

export default function ClassesDropdownMenu({
  isDisabled,
  isShowAll,
  classes,
  onClassChange,
}: ClassesDropdownMenuProps) {
  const [selectedClass, setSelectedClass] = useState<string>("");

  return (
    <Menu>
      <MenuButton
        disabled={isDisabled}
        className={`flex h-full w-[110px] flex-row items-center justify-between rounded-full bg-white px-[15px] ${isDisabled ? "border border-gray-300 bg-opacity-50 text-gray-500" : "bg-opacity-100 text-black"}`}
      >
        {classes.length === 0 || isShowAll || selectedClass === ""
          ? "Kelas"
          : selectedClass}
        <div className="relative h-[24px] w-[24px]">
          <Image src={"/down.png"} alt="chevron down" fill />
        </div>
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className={`w-[110px] space-y-3 rounded-lg bg-white`}
      >
        {classes.map((classItem) => {
          return (
            <MenuItem key={classItem.id}>
              <p
                className="block px-[15px] py-2 data-[focus]:bg-[#3272CA] data-[focus]:text-white"
                onClick={() => {
                  setSelectedClass(classItem.name);
                  onClassChange(classItem.id);
                }}
              >
                {classItem.name}
              </p>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
