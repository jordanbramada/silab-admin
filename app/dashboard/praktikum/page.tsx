import SubjectList from "@/app/components/subject-list";
import AddPracticumBanner from "@/app/components/add-practicum-banner";
import SubjectsList from "@/app/components/subjects-list";

export default async function Praktikum() {
  return (
    <div className="h-full w-full space-y-10 overflow-auto overscroll-contain">
      {/* <div className="flex h-[215px] w-full flex-row justify-between rounded-3xl bg-white p-5">
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
      </div> */}
      <AddPracticumBanner />
      <SubjectsList />
    </div>
  );
}
