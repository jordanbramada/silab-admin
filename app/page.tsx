import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center space-y-[45px] py-4">
      <div className="relative h-[300px] w-[250px]">
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
          <span className="font-semibold text-[#3272CA]">SILAB.</span>
        </p>
        <p className="text-2xl font-semibold text-[#5E6278]">
          Atur dan pantau semua informasi praktikum dengan mudah di sini.
        </p>
      </div>
      <div className="flex h-[112px] w-[300px] flex-col items-center justify-between">
        <Link
          href={{
            pathname: "auth",
          }}
          className="flex h-[54px] w-[155px] flex-row items-center justify-center rounded-full bg-[#3272CA] text-[18px] text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
