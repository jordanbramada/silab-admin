import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { getClassSessions } from "../../actions/dashboard/praktikum/tambah-praktikum/actions";
import Image from "next/image";

interface ClassSessionListboxProps {
  value: Sessions | null;
  onClassSessionChange: (value: Sessions) => void;
}

export default function ClassSessionListbox({
  value,
  onClassSessionChange,
}: ClassSessionListboxProps) {
  const [selectedSession, setSelectedSession] = useState<Sessions | null>(null);

  const sessions: Sessions[] = [
    {
      id: "1",
      start_time: "07.00",
      end_time: "08.40",
      session: "1",
    },
    {
      id: "2",
      start_time: "08.45",
      end_time: "10.25",
      session: "2",
    },
    {
      id: "3",
      start_time: "10.30",
      end_time: "12.10",
      session: "3",
    },
    {
      id: "4",
      start_time: "12.30",
      end_time: "14.10",
      session: "4",
    },
    {
      id: "5",
      start_time: "14.15",
      end_time: "16.05",
      session: "5",
    },
    {
      id: "6",
      start_time: "16.10",
      end_time: "17.10",
      session: "6",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Sesi Kelas</p>
      <Listbox value={selectedSession} onChange={setSelectedSession}>
        <ListboxButton
          className={`flex h-full w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D]`}
        >
          <p>
            {selectedSession && value && selectedSession.session}{" "}
            {!selectedSession && !value && "Sesi Kelas"}
          </p>
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={`w-[var(--button-width)] space-y-3 rounded-lg bg-[#f5f5f5]`}
        >
          {sessions &&
            sessions.map((session) => (
              <ListboxOption
                value={session}
                key={session.id}
                className={`text-[#1d1d1d] data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
              >
                <button
                  onClick={() => onClassSessionChange(session)}
                  className="flex h-[54px] w-full flex-row items-center justify-center px-[15px] py-2 font-semibold"
                >
                  Sesi ke - {session.session}, {session.start_time} -{" "}
                  {session.end_time}
                </button>
              </ListboxOption>
            ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
