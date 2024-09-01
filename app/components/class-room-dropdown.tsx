import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { ClassRoom } from "../types/class-room";
import { useEffect, useState } from "react";

interface ClassRoomDropdownProps {
  onClassRoomChange: (value: string) => void;
  value: string;
}

export default function ClassRoomDropdown({
  onClassRoomChange,
  value,
}: ClassRoomDropdownProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const classRoom: ClassRoom[] = [{ name: "Lab. PSI" }, { name: "Lab. SBTI" }];

  useEffect(() => {
    setSelectedRoom(value);
  }, [value]);

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Ruang</p>
      <Menu>
        <MenuButton
          value={value}
          className={`flex h-full w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D]`}
        >
          {selectedRoom === "" ? "Ruang" : selectedRoom}
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className={`w-[865px] space-y-3 rounded-lg bg-[#f5f5f5]`}
        >
          {classRoom.map((room) => (
            <MenuItem key={room.name}>
              <button
                onClick={() => {
                  setSelectedRoom(room.name);
                  onClassRoomChange(room.name);
                }}
                className="flex w-full flex-row items-start justify-start px-[15px] py-2 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
              >
                {room.name}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
