import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMeetings } from "../actions/dashboard/praktikum/[classId]/actions";
import { Meeting } from "../types/meeting";

interface MeetingsDropDownProps {
  classId?: string;
  onMeetingDataRetrieved?: (meetingData: Meeting[]) => void;
  onMeetingSelected?: (meetingId: string) => void;
}

export default function MeetingsDropDown({
  classId,
  onMeetingDataRetrieved,
  onMeetingSelected,
}: MeetingsDropDownProps) {
  const [loadingMeetingData, setLoadingMeetingData] = useState<boolean>(false);
  const [meetingData, setMeetingData] = useState<Meeting[]>();
  const [selectedMeeting, setSelectedMeeting] = useState<string>();

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        setLoadingMeetingData(true);

        const responseData = await getMeetings(classId);
        if (responseData["status"] === "success") {
          setMeetingData(responseData["data"]);
          if (onMeetingDataRetrieved)
            onMeetingDataRetrieved(responseData["data"]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMeetingData(false);
      }
    };

    fetchMeetingData();
  }, [classId, onMeetingDataRetrieved]);

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
            meetingData?.find((meeting) => meeting.id === selectedMeeting)
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
        {meetingData &&
          meetingData
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
