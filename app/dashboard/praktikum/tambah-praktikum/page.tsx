"use client";

import SubjectDropdownMenu from "@/app/components/praktikum/subject-dropdown-menu";
import { Subject } from "@/app/types/subject";
import { useState } from "react";
import { Class } from "@/app/types/add-class";
import ClassNameField from "@/app/components/praktikum/class-name-field";
import ClassQuotaField from "@/app/components/praktikum/class-quota-field";
import ClassDayDropdown from "@/app/components/praktikum/class-day-dropdown";
import {
  addClasses,
  getSubjectClasses,
} from "@/app/actions/dashboard/praktikum/tambah-praktikum/actions";
import SuccessDialog from "@/app/components/success-dialog";
import ClassSessionListbox from "@/app/components/praktikum/class-sessions-listbox";
import { SubjectBySemester } from "@/app/types/subject-by-semester";
import ErrorDialog from "@/app/components/error-dialog";
import ClassesPreview from "./components/classes-preview";

export default function TambahPraktikum() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectBySemester>();
  const [newClass, setNewClass] = useState<Class>({
    day: "",
    quota: 0,
    session: "",
    subject_class: "",
    subject_id: "",
  });
  const [addClassDisabled, setAddClassDisabled] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<Sessions | null>(null);
  const [subjectClasses, setSubjectClasses] = useState<SubjectClass[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const open = () => {
    setDialogOpen(true);
  };

  const close = () => {
    setDialogOpen(false);
  };

  const handleAddNewClass = async () => {
    try {
      setLoading(true);
      const response = await addClasses(newClass);

      if (response["status"] === "success") {
        setError(false);
        setMessage(response["message"]);
        open();
        setNewClass({
          day: "",
          quota: 0,
          session: "",
          subject_class: "",
          subject_id: "",
        });

        await handleSubjectClass(selectedSubject);
      } else {
        setError(true);
        setMessage(response["message"]);
        open();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (value: Subject | undefined) => {
    if (value !== undefined) {
      setSelectedSubject(value);
      setAddClassDisabled(false);
    } else {
      setSelectedSubject(undefined);
      setAddClassDisabled(true);
    }
  };

  const handleClassChange = (key: string, value: any) => {
    setNewClass((prev) => ({ ...prev, [key]: value }));
  };

  const handleSessionChange = (value: Sessions | null) => {
    setSelectedSession(value);
  };

  const handleSubjectClass = async (subject: SubjectBySemester | undefined) => {
    try {
      const response = await getSubjectClasses();

      if (response["status"] === "success") {
        const subjectClasses = response["data"] as SubjectClass[];
        const filteredSubjectClasses = subjectClasses.filter(
          (value) => value.subject_name === subject?.subject_name
        );
        setSubjectClasses(filteredSubjectClasses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-x-auto overflow-y-auto overscroll-contain">
      <div className="flex h-[82px] w-full flex-row space-x-4">
        <div className="flex h-full flex-col space-y-3">
          <p>Mata Kuliah</p>
          <SubjectDropdownMenu
            isDisabled={false}
            onSubjectChange={(value) => {
              handleClassChange("subject_id", value?.id);
              setSelectedSubject(value);
              handleSubjectClass(value);
            }}
          />
        </div>
      </div>
      <ClassesPreview subjectClasses={subjectClasses} />
      <div
        className={`mt-10 w-full flex-col space-y-6 rounded-[20px] bg-[#FFFFFF] p-5 ${selectedSubject !== undefined ? "flex" : "hidden"}`}
      >
        <div className="mt-5 flex h-[90px] w-full flex-row space-x-8">
          <ClassNameField
            value={newClass?.subject_class}
            onClassNameChange={(value) =>
              handleClassChange("subject_class", value)
            }
          />
          <ClassQuotaField
            value={
              newClass?.quota !== undefined ? newClass?.quota.toString() : "0"
            }
            onClassQuotaChange={(value) => {
              if (Number.parseInt(value) > 0) {
                handleClassChange("quota", Number.parseInt(value));
              } else {
                handleClassChange("quota", 0);
              }
            }}
          />
          <ClassDayDropdown
            value={newClass?.day}
            onDayChange={(value) => handleClassChange("day", value)}
          />
          <ClassSessionListbox
            value={selectedSession}
            onClassSessionChange={(value) => {
              handleClassChange("session", value.id);
              handleSessionChange(value);
            }}
          />
        </div>
        <div className="mt-14 flex w-full flex-row justify-end space-x-4">
          <button
            onClick={() => {
              setNewClass({
                subject_id: "",
                subject_class: "",
                day: "",
                session: "",
                quota: 0,
              });
              handleSessionChange(null);
              handleSubjectChange(undefined);
            }}
            className="rounded-full bg-[#FFD9D9] px-[16px] py-[8px] text-[16px] font-semibold text-[#FE2F60]"
          >
            Hapus
          </button>
          <button
            onClick={() => {
              handleAddNewClass();
            }}
            className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA]"
          >
            {!loading ? (
              "Simpan"
            ) : (
              <span className="loading loading-dots loading-sm" />
            )}
          </button>
          {!error && (
            <SuccessDialog
              dialogOpen={dialogOpen}
              onClose={close}
              title={message}
            />
          )}
          {error && (
            <ErrorDialog
              dialogOpen={dialogOpen}
              onClose={close}
              title={message}
            />
          )}
        </div>
      </div>
    </div>
  );
}
