import Image from "next/image";
import Link from "next/link";
import { getRole } from "../lib/sessions";

export default async function AddPracticumBanner() {
  const role = await getRole();

  if (role === "laborant") {
    return (
      <div className="flex h-[215px] w-full flex-row justify-between rounded-3xl bg-white p-5">
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
      </div>
    );
  } else {
    return (
      <div className="flex h-[215px] w-full flex-row justify-between rounded-3xl bg-white p-5">
        <div className="flex w-[593px] flex-col justify-between">
          <p className="text-[30px] font-bold text-black">
            Berikut adalah daftar kelas praktikum anda
          </p>
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
    );
  }
}
