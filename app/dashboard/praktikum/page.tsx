"use client";

import AddPracticumBanner from "@/app/components/praktikum/add-practicum-banner";
import ClassCard from "@/app/components/praktikum/class-card";
import SubjectsList from "@/app/components/praktikum/subjects-list";
import useAuthStore from "@/app/store/useAuthStore";
import useClassStore from "@/app/store/useClassStore";
import { useEffect } from "react";

export default function Praktikum() {
  const { userData, me } = useAuthStore();
  const { classesData, getAllClass } = useClassStore();

  useEffect(() => {
    getAllClass();
    me();
  }, [getAllClass, me]);

  return (
    <div className="h-full w-full space-y-10 overflow-auto overscroll-contain">
      <AddPracticumBanner />
      {userData?.role === "LABORAN" && <SubjectsList />}
      {userData?.role === "MAHASISWA" &&
        classesData &&
        classesData.map((subjectClass) => (
          <ClassCard subjectClass={subjectClass} key={subjectClass.id} />
        ))}
    </div>
  );
}
