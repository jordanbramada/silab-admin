import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Image from "next/image";
import { Subject, SubjectBySemester } from "../actions/actions";

interface SubjectDiscolureProps {
  subjectSemesterId: string;
  subjects: SubjectBySemester;
  onSubjectPanelClicked: (subject: Subject) => void;
}

export default function SubjectDisclosure({
  subjectSemesterId,
  subjects,
  onSubjectPanelClicked,
}: SubjectDiscolureProps) {
  return (
    <div className="w-full rounded-xl bg-white p-5" key={subjectSemesterId}>
      <Disclosure>
        <DisclosureButton
          className={`group flex w-full flex-row items-center justify-between p-0 text-[16px] font-semibold`}
        >
          <span>Semester {subjectSemesterId}</span>
          <div className="relative h-5 w-5">
            <Image
              src={"/down.png"}
              alt="chevron down"
              fill
              style={{ objectFit: "contain" }}
              className="group-data-[open]:rotate-180"
            />
          </div>
        </DisclosureButton>
        <DisclosurePanel
          className={`mt-5 flex flex-col space-y-2 text-[14px] font-medium`}
        >
          {subjects.subjects.map((subject) => {
            return (
              <button
                onClick={() => onSubjectPanelClicked(subject)}
                className="flex flex-row items-center justify-between rounded-lg px-4 py-4 hover:bg-[#BFD9EF] hover:text-[#3272CA]"
              >
                <p>{subject.name}</p>
                <div className="relative h-4 w-4">
                  <Image
                    src={"/down.png"}
                    alt="chevron down"
                    fill
                    style={{ objectFit: "contain" }}
                    className="-rotate-90"
                  />
                </div>
              </button>
            );
          })}
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
