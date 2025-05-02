import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import useMeetingStore from "../store/useMeetingStore";

interface MeetingsDropDownProps {
  onMeetingSelected?: (meetingId: string) => void;
}

export default function MeetingsDropDown({
  onMeetingSelected,
}: MeetingsDropDownProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<string>();

  const { meetingsData } = useMeetingStore();

  const handleSelectedMeeting = (meetingId: string) => {
    setSelectedMeeting(meetingId);
    if (onMeetingSelected) onMeetingSelected(meetingId);
  };

  return (
    <Listbox>
      <ListboxButton
        value={selectedMeeting}
        className={`flex h-fit flex-row content-center items-center space-x-4 rounded-full bg-[#D2E3F1] p-3 text-sm font-semibold text-[#3272CA]`}
      >
        <p>
          {selectedMeeting &&
            meetingsData?.find((meeting) => meeting.id === selectedMeeting)
              ?.meeting_name}
          {!selectedMeeting && "Pilih Pertemuan"}
        </p>
        <div className="relative size-[20px]">
          <Image
            src={"/down-blue.png"}
            alt="chevron down"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className={`mt-1 w-[var(--button-width)] rounded-2xl bg-[#D2E3F1] text-sm font-semibold text-[#3272CA]`}
      >
        {meetingsData &&
          meetingsData
            .map((meeting) => (
              <ListboxOption
                as="button"
                onClick={() => handleSelectedMeeting(meeting.id)}
                key={meeting.id}
                value={meeting.id}
                className={`w-full p-3 hover:bg-[#3272CA] hover:text-white`}
              >
                <p className="w-full items-center">{meeting.meeting_name}</p>
              </ListboxOption>
            ))
            .reverse()}
      </ListboxOptions>
    </Listbox>
  );
}
