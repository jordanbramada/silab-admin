"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Appbar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row w-full px-8 pt-2 justify-between">
      <div className="w-[60px] h-[60px] relative">
        <Image
          alt="logo"
          src={"logo.svg"}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        className={` flex-row align-middle ${
          pathname != "/dashboard" ? "hidden" : "flex"
        }`}
      >
        <Image
          alt="bookmark"
          src={"bookmark.svg"}
          height={24}
          width={24}
          className="mr-2"
        />
        <p className="self-center text-[#5E6278]">Praktikum</p>
      </div>
      <div
        className={`flex flex-row space-x-8 ${
          pathname != "/dashboard" ? "hidden" : "flex"
        }`}
      >
        <div className="w-[400px] h-[60px] rounded-[90px] bg-[#F5F5F5] flex flex-row">
          <Image
            alt="search"
            src={"search.svg"}
            height={24}
            width={24}
            className="ml-5 mr-3"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full rounded-[90px] bg-[#F5F5F5] focus:outline-none placeholder-[#5E6278] placeholder:font-semibold"
          />
        </div>
        <div className="flex flex-col text-end">
          <p className="font-semibold text-[16px] text-[#5E6278] text-opacity-50">
            You logged in as a
          </p>
          <p className="font-bold text-[#3272CA] text-[24px]">Laboran</p>
        </div>
      </div>
    </div>
  );
}
