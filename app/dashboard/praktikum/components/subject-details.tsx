import { Subject } from "../actions/actions";

interface SubjectDetailsProps {
  subjectDetails: Subject;
}

export default function SubjectDetails({
  subjectDetails,
}: SubjectDetailsProps) {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full flex-col items-start">
        <p className="text-[32px] font-bold text-black">
          {subjectDetails.name}
        </p>
        <div className="mt-10 grid h-full w-full grid-cols-3 gap-5">
          {subjectDetails.classes.map((classItem) => {
            return (
              <button
                key={classItem.id}
                className="flex h-[280px] flex-col items-start justify-between rounded-[24px] bg-[#3272CA] p-5"
              >
                <p className="text-[64px] font-bold leading-none text-[#FFBF01]">
                  {classItem.name}
                </p>
                <div className="flex flex-col items-start">
                  <p className="text-[24px] font-bold text-white">
                    {subjectDetails.name}
                  </p>
                  <p className="text-[18px] font-semibold text-white">
                    {classItem.day}, {classItem.startAt} - {classItem.endAt}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
