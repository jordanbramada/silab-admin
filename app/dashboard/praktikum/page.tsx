import AddPracticumBanner from "@/app/components/add-practicum-banner";
import SubjectsList from "@/app/components/subjects-list";

export default async function Praktikum() {
  return (
    <div className="h-full w-full space-y-10 overflow-auto overscroll-contain">
      <AddPracticumBanner />
      <SubjectsList />
    </div>
  );
}
