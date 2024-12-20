"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PengumumanSidebarDisclosure() {
  const pathName = usePathname();

  return (
    <div className="group/sidebaritem w-full">
      <Disclosure>
        <DisclosureButton
          className={`group flex w-full flex-row items-center justify-between rounded-full py-3 pl-4 pr-6 transition-all duration-300 group-hover/sidebaritem:bg-[#3285CA] group-hover/sidebaritem:bg-opacity-10 ${pathName.match("/dashboard/pengumuman/") ? "bg-[#3285CA] bg-opacity-30" : ""}`}
        >
          <div className="flex flex-row space-x-3 transition-all duration-300 group-hover/sidebaritem:translate-x-3">
            <Image
              src={"/announcement.png"}
              alt="announcement"
              width={24}
              height={24}
            />
            <span className="font-semibold text-[#5E6278]">Pengumuman</span>
          </div>
          <div className="relative h-5 w-5">
            <Image
              src={"/down.png"}
              alt="chevron down"
              fill
              style={{ objectFit: "contain" }}
              className="duration-300 group-hover/sidebaritem:translate-x-3 group-data-[open]:rotate-180"
            />
          </div>
        </DisclosureButton>
        <DisclosurePanel className={`ml-8 mt-2 space-y-3`}>
          <Link
            href={"/dashboard/pengumuman/add-pengumuman"}
            className={`flex h-full w-full flex-row items-center space-x-2 rounded-full px-3 py-2 hover:bg-[#3285CA] hover:bg-opacity-10 ${pathName.match("/dashboard/pengumuman/add-pengumuman") ? "bg-[#3285CA] bg-opacity-30" : ""}`}
          >
            <div className="relative h-[20px] w-[20px]">
              <Image
                src={"/add-announcement.png"}
                alt="announcement"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-base font-medium text-[#5E6278]">
              Buat Pengumuman
            </p>
          </Link>
          <Link
            href={"/dashboard/pengumuman/list-pengumuman"}
            className={`flex h-full w-full flex-row items-center space-x-2 rounded-full px-3 py-2 hover:bg-[#3285CA] hover:bg-opacity-10 ${pathName.match("/dashboard/pengumuman/list-pengumuman") ? "bg-[#3285CA] bg-opacity-30" : ""}`}
          >
            <div className="relative h-[20px] w-[20px]">
              <Image
                src={"/announcement-list.png"}
                alt="announcement"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-base font-medium text-[#5E6278]">
              List Pengumuman
            </p>
          </Link>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
