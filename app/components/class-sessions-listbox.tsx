import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { getClassSessions } from "../actions/dashboard/praktikum/tambah-praktikum/actions";
import Image from "next/image";

export default function ClassSessionListbox() {
  const [sessionsData, setSessionsData] = useState<Sessions[]>([]);
  const [selectedSession, setSelectedSession] = useState<Sessions>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClassSessions();

        if (response["status"] === "success") {
          setSessionsData(response["data"]["sessions"]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Sesi Kelas</p>
      <Listbox value={selectedSession} onChange={setSelectedSession}>
        <ListboxButton
          className={`flex h-full w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D]`}
        >
          <p>
            {selectedSession && selectedSession.session}{" "}
            {!selectedSession && "Sesi Kelas"}
          </p>
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={`w-[var(--button-width)] space-y-3 rounded-lg bg-[#f5f5f5]`}
        >
          {sessionsData &&
            sessionsData.map((session) => (
              <ListboxOption
                value={session}
                key={session.id}
                className={`text-[#1d1d1d] data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
              >
                <button className="flex h-[54px] w-full flex-row items-center justify-center px-[15px] py-2 font-semibold">
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
