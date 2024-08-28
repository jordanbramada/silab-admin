import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { SubjectBySemester } from "../actions/actions";
import { query } from "../page";
import Image from "next/image";

interface SubjectListProps {
  subjectData: SubjectBySemester[];
  isLoading: boolean;
  query: query[];
}

export default function SubjectList({
  subjectData,
  query,
  isLoading,
}: SubjectListProps) {
  return (
    <div className="mt-[40px] flex w-full flex-col space-y-6">
      {subjectData.length === 0 && isLoading && (
        <span className="loading loading-dots loading-md h-full self-center" />
      )}
      {subjectData &&
        query.length === 0 &&
        subjectData.map((subject) => {
          return (
            <div
              className="w-full rounded-[24px] bg-white p-5"
              key={subject._id}
            >
              <Disclosure>
                <DisclosureButton
                  className={`group flex w-full flex-row items-center justify-between text-[22px] font-semibold`}
                >
                  <span>Semester {subject._id}</span>
                  <div className="relative h-6 w-6">
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
                  className={`mt-3 flex flex-col space-y-2 text-[16px] font-medium`}
                >
                  {subject.subjects.map((subject) => {
                    return (
                      <p className="rounded-lg px-4 py-4 hover:bg-[#BFD9EF] hover:text-[#3272CA]">
                        {subject.name}
                      </p>
                    );
                  })}
                </DisclosurePanel>
              </Disclosure>
            </div>
          );
        })}
      {subjectData && query.length !== 0 && query[0].query === "semester" && (
        <div className="flex w-full flex-col items-start">
          <p className="text-[18px] font-semibold text-[#5E6278]">
            {isLoading ? "" : `Semester ${query[0].value}`}
          </p>

          {subjectData.map((subject) => {
            return subject.subjects.map((subject) => {
              return (
                <div className="flex w-full flex-col">
                  <p className="text-2xl font-bold">{subject.name}</p>
                  <div className="my-[40px] grid h-full w-full grid-cols-3 gap-5">
                    {subject.classes.length === 0 && (
                      <p>Kelas belum tersedia</p>
                    )}
                    {subject.classes.length !== 0 &&
                      subject.classes.map((classItem) => {
                        return (
                          <div className="flex h-[300px] w-full flex-col items-start justify-between rounded-3xl bg-[#3272CA] p-[20px]">
                            <p className="text-[64px] font-bold leading-none text-[#FFBF01]">
                              {classItem.name}
                            </p>
                            <div className="flex flex-col">
                              <p className="text-[24px] font-bold text-white">
                                {subject.name}
                              </p>
                              <p className="text-[18px] font-semibold text-white">
                                {classItem.day}, {classItem.startAt} -{" "}
                                {classItem.endAt}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            });
          })}
        </div>
      )}
    </div>
  );
}
