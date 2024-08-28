"use client";

import Image from "next/image";
import ButtonGroup from "./components/button-group";
import { useEffect, useState } from "react";
import { SubjectBySemester } from "./actions/actions";
import fetchSubjectData from "./actions/actions";
import SubjectList from "./components/subject-list";

export type query = {
  query: string;
  value: string;
};

export default function Praktikum() {
  const [query, setQuery] = useState<query[]>([]);
  const [subjectData, setSubjectData] = useState<SubjectBySemester[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleQueryChanges = (query: query[]) => {
    setQuery(query);
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
          <button className="h-[54px] w-[200px] rounded-[30px] bg-[#3272CA] text-white">
            Tambah Praktikum
          </button>
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
      <ButtonGroup onQueryChanges={handleQueryChanges} />
      <SubjectList
        isLoading={loading}
        query={query}
        subjectData={subjectData}
      />
    </div>
  );
}
