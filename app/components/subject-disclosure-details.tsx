"use client";

import { useEffect, useState } from "react";
import { fetchSubjectById } from "../actions/dashboard/praktikum/actions";
import { SubjectDetails } from "../types/subject-details";

interface SubjectDisclosureDetailsProps {
  subjectId: string;
}

export default function SubjectDisclosureDetails({
  subjectId,
}: SubjectDisclosureDetailsProps) {
  const [subjectDetails, setSubjectDetails] = useState<SubjectDetails | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSubjectById(subjectId);

        if (response["status"] === "Success retreived data") {
          setSubjectDetails(response["data"][0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [subjectId]);

  return (
    <div className="flex flex-col">
      <p className="text-base text-[#1d1d1d]/70">{subjectDetails?.lecturer}</p>
    </div>
  );
}
