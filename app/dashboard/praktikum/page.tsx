"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonGroup from "@/app/components/button-group";
import SubjectList from "@/app/components/subject-list";
import { fetchSubjectData } from "@/app/actions/dashboard/praktikum/actions";
import { SubjectBySemester } from "@/app/types/subject-by-semester";
import { Subject } from "@/app/types/subject";
import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import SubjectDisclosureDetails from "@/app/components/subject-disclosure-details";
import SubjectClassesCard from "@/app/components/subject-classes";

export type query = {
  query: string;
  value: string;
};

const semester: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function Praktikum() {
  const [semester, setSemester] = useState<string>();
  const [subjectData, setSubjectData] = useState<SubjectBySemester[]>([]);
  const [subjectDetails, setSubjectDetails] = useState<Subject>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleQueryChanges = (semester: string) => {
    setSemester(semester);
    setSubjectDetails(undefined);
  };

  const handleSubjectChanges = (subject: Subject | undefined) => {
    setSubjectDetails(subject);
  };

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
    <div className="h-full w-full space-y-10 overflow-auto overscroll-contain">
      <div className="flex h-[215px] w-full flex-row justify-between rounded-3xl bg-white p-5">
        <div className="flex w-[593px] flex-col justify-between">
          <p className="text-[30px] font-bold text-black">
            Ingin menambahkan praktikum baru? Klik tombol di bawah ini untuk
            memulai.
          </p>
          <Link
            href={"praktikum/tambah-praktikum"}
            className="flex h-[54px] w-[200px] flex-row items-center justify-center rounded-[30px] bg-[#3272CA] text-white"
          >
            Tambah Praktikum
          </Link>
        </div>
        <div className="relative h-[170px] w-[300px]">
          <Image
            src={"/praktikum.png"}
            alt="illustration"
            fill
            style={{ objectFit: "contain" }}
            className="bg-re self-end"
          />
        </div>
      </div>
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
    </div>
  );
}
