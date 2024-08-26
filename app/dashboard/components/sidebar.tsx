import Link from "next/link";
import SideBarItem, { SideBarProps } from "./sidebar-item";
import Image from "next/image";
import { signOut } from "@/app/lib/sessions";
import SignOutButton from "./signout-button";

const sideBarItems: SideBarProps[] = [
  { imageSrc: "/dashboard.svg", route: "/dashboard", title: "Dashboard" },
  {
    imageSrc: "/praktikum.svg",
    route: "/dashboard/praktikum",
    title: "Praktikum",
  },
  {
    imageSrc: "/presensi.svg",
    route: "/dashboard/presensi-praktikan",
    title: "Presensi Praktikan",
  },
  {
    imageSrc: "/presensi.svg",
    route: "/dashboard/presensi-asisten",
    title: "Presensi Asisten",
  },
  {
    imageSrc: "/master-data.svg",
    route: "/dashboard/master-data",
    title: "Master Data",
  },
];

export default function SideBar() {
  return (
    <div className="mt-8 flex h-screen w-[350px] flex-col justify-between px-8 pb-4">
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
