import Link from "next/link";
import SideBarItem, { SideBarProps } from "./sidebar-item";
import Image from "next/image";
import { signOut } from "@/app/lib/sessions";
import SignOutButton from "./signout-button";

const sideBarItems: SideBarProps[] = [
  { imageSrc: "/dashboard.svg", route: "/dashboard", title: "Dashboard" },
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
  {
    imageSrc: "/master-data.png",
    route: "/dashboard/master-data",
    title: "Master Data",
  },
];

export default function SideBar() {
  return (
    <div className="mt-8 flex w-[350px] flex-col justify-between px-8 pb-4">
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
      </div>
      <SignOutButton />
    </div>
  );
}
