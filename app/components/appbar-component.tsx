"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserDetails } from "../types/user-details";

interface AppbarComponentProps {
  role: string;
  data: UserDetails;
}

export default function AppbarComponent({ role, data }: AppbarComponentProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const breadcrumbPath = isDashboard
    ? pathname
        .replace(/^\/dashboard\/?/, "")
        .split("/")
        .filter(Boolean)
    : [];
  return (
    <>
      <div
        className={`flex-row align-middle ${isDashboard ? "flex" : "hidden"}`}
      >
        <div className="relative mr-2 w-[24px]">
          <Image
            alt="bookmark"
            src={"/bookmark.png"}
            fill
            style={{ objectFit: "contain" }}
            className="static"
            priority
          />
        </div>
        <p className="self-center text-[#5E6278]">
          {pathname == "/dashboard" ? "dashboard" : breadcrumbPath.join(" / ")}
        </p>
      </div>
      <div
        className={`flex flex-col text-end ${isDashboard ? "flex" : "hidden"}`}
      >
        <p className="text-[16px] font-semibold text-[#5E6278] text-opacity-50">
          You logged in as a
        </p>
        <p className="text-[24px] font-bold text-[#3272CA]">
          {data ? data.fullname.split(" ").slice(0, 2).join(" ") : ""} - {role === "student" ? "Assistant" : "Laborant"}
        </p>
      </div>
    </>
  );
}
