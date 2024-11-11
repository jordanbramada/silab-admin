"use client";

import { useEffect, useState } from "react";
import { fetchSubjectData } from "../actions/dashboard/praktikum/actions";
import { SubjectBySemester } from "../types/subject-by-semester";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import SubjectDisclosureDetails from "./subject-disclosure-details";
import SubjectClassesCard from "./subject-classes";

export default function SubjectsList() {
  const [subjectData, setSubjectData] = useState<SubjectBySemester[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setSubjectData([]);
      setLoading(true);
      try {
        const response = await fetchSubjectData();

        setSubjectData(response["data"]);
      } catch (error) {
        console.error("Error fetching subject data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-start space-y-4">
      {subjectData &&
        subjectData.map((subject) => (
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
}
