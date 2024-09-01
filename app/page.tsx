import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full items-center space-y-[45px] py-4">
      <div className="w-[250px] h-[300px] relative">
        <Image
          alt="illustration"
          src={"illustration-1.svg"}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="w-[543px] text-center">
        <p className="text-[54px] font-bold text-[#1D1D1D]">
          Selamat datang di Dashboard{" "}
          <span className="text-[#3272CA] font-semibold">SILAB.</span>
        </p>
        <p className="font-semibold text-2xl text-[#5E6278]">
          Atur dan pantau semua informasi praktikum dengan mudah di sini.
        </p>
      </div>
      <div className="flex flex-col w-[300px] h-[112px] items-center justify-between">
        <p className="font-semibold text-base text-black">Log in sebagai</p>
        <div className="flex flex-row space-x-[30px]">
          <Link
            href={{
              pathname: "auth",
              query: { role: "laboran", auth: "login" },
            }}
            className="flex flex-row items-center justify-center bg-[#3272CA] w-[155px] h-[54px] rounded-full text-white text-[18px]"
          >
            Laboran
          </Link>
          <Link
            href={{
              pathname: "auth",
              query: { role: "dosen", auth: "login" },
            }}
            className="flex flex-row items-center justify-center bg-[#BFD9EF] w-[155px] h-[54px] rounded-full text-[#3272CA] text-[18px]"
          >
            Dosen
          </Link>
          <Link
            href={{
              pathname: "auth",
              query: { role: "asisten", auth: "login" },
            }}
            className="flex flex-row items-center justify-center bg-[#BFD9EF] w-[155px] h-[54px] rounded-full text-[#3272CA] text-[18px]"
          >
            Asisten
          </Link>
        </div>
      </div>
    </div>
  );
}
