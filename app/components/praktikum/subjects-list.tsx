"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import SubjectDisclosureDetails from "../subject-disclosure-details";
import SubjectClassesCard from "../subject-classes";
import useSubjectStore from "@/app/store/useSubjectStore";
import { useEffect } from "react";

const SubjectsList = () => {
  const { subjectsData, getAllSubjects } = useSubjectStore();

  useEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  return (
    <div className="flex h-full w-full flex-col items-start space-y-4">
      {subjectsData &&
        subjectsData.map((subject) => (
          <Disclosure
            key={subject.id}
            as={`div`}
            className={`w-full rounded-2xl bg-white p-4`}
          >
            <DisclosureButton
              className={`flex h-fit w-full flex-row items-start`}
            >
              <p className="text-xl font-bold text-[#1d1d1d]">
                {subject.subject_name}
              </p>
            </DisclosureButton>
            <DisclosurePanel className={`w-full bg-white`}>
              <SubjectDisclosureDetails subjectId={subject.id} />
              <SubjectClassesCard subject_name={subject.subject_name} />
            </DisclosurePanel>
          </Disclosure>
        ))}
    </div>
  );
};

export default SubjectsList;
