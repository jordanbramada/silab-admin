"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonGroup from "@/app/components/button-group";
import SubjectList from "@/app/components/subject-list";
import { fetchSubjectData } from "@/app/actions/dashboard/praktikum/actions";
import { SubjectBySemester } from "@/app/types/subject-by-semester";
import { Subject } from "@/app/types/subject";
import Link from "next/link";

export type query = {
  query: string;
  value: string;
};

export default function Praktikum() {
  const [query, setQuery] = useState<query[]>([]);
  const [subjectData, setSubjectData] = useState<SubjectBySemester[]>([]);
  const [subjectDetails, setSubjectDetails] = useState<Subject>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleQueryChanges = (query: query[]) => {
    setQuery(query);
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
        const data = await fetchSubjectData(query);
        setSubjectData(data.data);
      } catch (error) {
        console.error("Error fetching subject data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="h-full w-full">
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
      <ButtonGroup
        onQueryChanges={handleQueryChanges}
        onSubjectQueryChanges={handleSubjectChanges}
      />
      <SubjectList
        isLoading={loading}
        query={query}
        subjectData={subjectData}
        subjectDetails={subjectDetails}
        onSubjectSelected={handleSubjectChanges}
      />
    </div>
  );
}
