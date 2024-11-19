import { SubjectBySemester } from "../types/subject-by-semester";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import SubjectDisclosureDetails from "./subject-disclosure-details";
import SubjectClassesCard from "./subject-classes";
import { getAccessToken } from "../lib/sessions";

export default async function SubjectsList() {
  const accessToken = await getAccessToken();
  const response = await fetch(`${process.env.BASE_URL}/subjects`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const responseData = await response.json();
  const subjectData: SubjectBySemester[] = responseData["data"];

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
