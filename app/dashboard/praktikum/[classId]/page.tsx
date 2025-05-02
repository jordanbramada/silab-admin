"use client";

import ClassMeetingsContent from "@/app/components/praktikum/class-meetings-content";
import { useEffect } from "react";
import ClassTitleHeader from "@/app/components/praktikum/class-title-header";
import ClassDetailsBox from "@/app/components/praktikum/class-details-box";
import useClassStore from "@/app/store/useClassStore";
import { useParams } from "next/navigation";
import useMeetingStore from "@/app/store/useMeetingStore";

const ClassDetails: React.FC = () => {
  const params = useParams<{ classId: string }>();

  const { getClassById, classData, isLoading } = useClassStore();
  const { getMeetings } = useMeetingStore();

  useEffect(() => {
    getClassById(params.classId);
    getMeetings(params.classId);
  }, [getClassById, getMeetings, params.classId]);

  return (
    <div className="flex h-full w-full flex-col space-y-10 overflow-auto overscroll-contain">
      {!isLoading && classData && (
        <>
          <ClassTitleHeader data={classData} />
          <ClassDetailsBox data={classData} />
          <ClassMeetingsContent classId={classData.id} />
        </>
      )}
    </div>
  );
};

export default ClassDetails;
