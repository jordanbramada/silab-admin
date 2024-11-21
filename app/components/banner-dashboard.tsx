import Image from "next/image";

export default function BannerDashboard() {
  return (
    <div className="flex h-[300px] w-full flex-row items-start justify-between">
      <div className="flex w-[534px] flex-col space-y-4">
        <p className="text-[54px] font-bold leading-tight text-[#1d1d1d]">
          Selamat datang di Dashboard{" "}
          <span className="font-extrabold text-[#3272CA]">SILAB.</span>
        </p>
        <p className="text-[24px] font-semibold leading-tight text-[#5E6278]">
          Atur dan pantau semua informasi praktikum dengan mudah di sini.
        </p>
      </div>
      <Image
        src={"illustration-1.svg"}
        alt="illustration"
        width={222}
        height={300}
        priority
      />
    </div>
  );
}
