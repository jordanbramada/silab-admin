"use client";

import ClassMeetingsContent from "@/app/components/praktikum/class-meetings-content";
import { useEffect } from "react";
import ClassTitleHeader from "@/app/components/praktikum/class-title-header";
import ClassDetailsBox from "@/app/components/praktikum/class-details-box";
import useClassStore from "@/app/store/useClassStore";
import { useParams } from "next/navigation";
import useMeetingStore from "@/app/store/useMeetingStore";
import useCollaboratorStore from "@/app/store/useCollaboratorStore";

const ClassDetails: React.FC = () => {
  const params = useParams<{ classId: string }>();

  const { getClassById, classData, isLoading } = useClassStore();
  const { getMeetings, meetingsData } = useMeetingStore();
  const { getClassCollaborators, collaboratorsData } = useCollaboratorStore();

  useEffect(() => {
    getClassCollaborators(params.classId);
    getClassById(params.classId);
    getMeetings(params.classId);
  }, [getClassById, getMeetings, params.classId, getClassCollaborators]);

  return (
    <div className="flex h-full w-full flex-col space-y-10 overflow-auto overscroll-contain">
      {!isLoading && classData && (
        <>
          <ClassTitleHeader data={classData} />
          <ClassDetailsBox data={classData} assistant={collaboratorsData} />
          <ClassMeetingsContent classId={classData.id} meetingData={meetingsData} />
        </>
      )}
    </div>
  );
};

export default ClassDetails;
