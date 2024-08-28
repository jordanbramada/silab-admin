import { Subject, SubjectBySemester } from "../actions/actions";
import { query } from "../page";
import SubjectContainer from "./subject-container";
import SubjectDisclosure from "./subjects-disclosure";
import SubjectDetails from "./subject-details";

interface SubjectListProps {
  subjectData: SubjectBySemester[];
  subjectDetails: Subject | undefined;
  isLoading: boolean;
  query: query[];
  onSubjectSelected: (subject: Subject) => void;
}

export default function SubjectList({
  subjectData,
  query,
  isLoading,
  subjectDetails,
  onSubjectSelected,
}: SubjectListProps) {
  return (
    <div className="mt-[40px] flex w-full flex-col space-y-3">
      {subjectData.length === 0 && isLoading && (
        <span className="loading loading-dots loading-md h-full self-center" />
      )}
      {!subjectDetails &&
        subjectData &&
        query.length === 0 &&
        subjectData.map((subject) => {
          return (
            <SubjectDisclosure
              subjectSemesterId={subject._id}
              subjects={subject}
              onSubjectPanelClicked={onSubjectSelected}
            />
          );
        })}
      {!subjectDetails &&
        subjectData &&
        query.length !== 0 &&
        query[0].query === "semester" && (
          <div className="flex w-full flex-col items-start">
            <p className="text-[18px] font-semibold text-[#5E6278]">
              {isLoading ? "" : `Semester ${query[0].value}`}
            </p>

            <div className="mt-4 flex w-full flex-col space-y-2">
              {subjectData.map((subject) => {
                return subject.subjects.map((subject) => {
                  return (
                    <SubjectContainer
                      subject={subject}
                      onSubjectSelected={onSubjectSelected}
                    />
                  );
                });
              })}
            </div>
          </div>
        )}
      {subjectDetails && <SubjectDetails subjectDetails={subjectDetails} />}
    </div>
  );
}
