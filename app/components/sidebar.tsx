"use client";

import SideBarItem, { SideBarProps } from "./sidebar-item";
import SignOutButton from "./signout-button";
import PengumumanSidebarDisclosure from "./pengumuman-sidebar-disclosure";
import MasterDataSidebarDisclosure from "./master-data-sidebar-disclosure";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

const sideBarItems: SideBarProps[] = [
  { imageSrc: "/dashboard.png", route: "/dashboard", title: "Dashboard" },
  {
    imageSrc: "/bookmark.png",
    route: "/dashboard/praktikum",
    title: "Praktikum",
  },
];

export default function SideBar() {
  const { userData, me } = useAuthStore();

  useEffect(() => {
    me;
  }, [me]);

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
        {userData?.role === "LABORAN" && (
          <>
            <MasterDataSidebarDisclosure />
            <PengumumanSidebarDisclosure />
          </>
        )}
      </div>
      <SignOutButton />
    </div>
  );
}
