"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SideBarProps {
  imageSrc: string;
  title: string;
  route: string;
}

export default function SideBarItem({ route, imageSrc, title }: SideBarProps) {
  const pathName = usePathname();

  return (
    <div className="group/sidebaritem">
      <Link
        href={route}
        className={`flex w-full flex-row space-x-3 rounded-full px-4 py-3 font-semibold text-[#5E6278] ${(route !== "/dashboard" && pathName.match(route)) || (route === "/dashboard" && pathName === "/dashboard") ? "bg-[#3285CA] bg-opacity-30" : ""} transition-all duration-300 group-hover/sidebaritem:bg-[#3285CA] group-hover/sidebaritem:bg-opacity-10`}
      >
        <Image
          className="transition-all duration-300 group-hover/sidebaritem:translate-x-3"
          src={imageSrc}
          height={24}
          width={24}
          alt={title}
          priority
        />
        <p className="transition-all duration-300 group-hover/sidebaritem:translate-x-3">
          {title}
        </p>
      </Link>
    </div>
  );
}
