import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import SideBarItem, { SideBarProps } from "./sidebar-item";
import SignOutButton from "./signout-button";
import Image from "next/image";
import Link from "next/link";
import PengumumanSidebarDisclosure from "./pengumuman-sidebar-disclosure";
import MasterDataSidebarDisclosure from "./master-data-sidebar-disclosure";

const sideBarItems: SideBarProps[] = [
  { imageSrc: "/dashboard.png", route: "/dashboard", title: "Dashboard" },
  {
    imageSrc: "/bookmark.png",
    route: "/dashboard/praktikum",
    title: "Praktikum",
  },
  {
    imageSrc: "/presensi.png",
    route: "/dashboard/presensi-praktikan",
    title: "Presensi Praktikan",
  },
  {
    imageSrc: "/presensi.png",
    route: "/dashboard/presensi-asisten",
    title: "Presensi Asisten",
  },
];

export default function SideBar() {
  return (
    <div className="mt-8 flex h-full w-1/4 flex-col justify-between px-8 py-4">
      <div className="flex h-full w-full flex-col space-y-5">
        {sideBarItems.map((item) => {
          return (
            <SideBarItem
              imageSrc={item.imageSrc}
              route={item.route}
              title={item.title}
              key={item.title}
            />
          );
        })}
        <MasterDataSidebarDisclosure />
        <PengumumanSidebarDisclosure />
      </div>
      <SignOutButton />
    </div>
  );
}
