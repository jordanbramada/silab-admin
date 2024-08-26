"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Appbar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const breadcrumbPath = isDashboard
    ? pathname
        .replace(/^\/dashboard\/?/, "") // Remove "/dashboard" from the start
        .split("/")
        .filter(Boolean) // Remove empty segments
    : [];

  return (
    <div className="flex w-full flex-row justify-between px-8 pt-2">
      <div className="relative h-[60px] w-[60px]">
        <Image
          alt="logo"
          src={"logo.svg"}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        className={`flex-row align-middle ${isDashboard ? "flex" : "hidden"}`}
      >
        <Image
          alt="bookmark"
          src={"bookmark.svg"}
          height={24}
          width={24}
          className="mr-2"
        />
        <p className="self-center text-[#5E6278]">
          {pathname == "/dashboard" ? "dashboard" : breadcrumbPath.join(" / ")}
        </p>
      </div>
      <div
        className={`flex flex-row space-x-8 ${isDashboard ? "flex" : "hidden"}`}
      >
        <div className="flex h-[60px] w-[400px] flex-row rounded-[90px] bg-[#F5F5F5]">
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
            className="h-full w-full rounded-[90px] bg-[#F5F5F5] placeholder-[#5E6278] placeholder:font-semibold focus:outline-none"
          />
        </div>
        <div className="flex flex-col text-end">
          <p className="text-[16px] font-semibold text-[#5E6278] text-opacity-50">
            You logged in as a
          </p>
          <p className="text-[24px] font-bold text-[#3272CA]">Laboran</p>
        </div>
      </div>
    </div>
  );
}
