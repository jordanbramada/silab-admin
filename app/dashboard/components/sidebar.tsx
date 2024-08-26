import SideBarItem, { SideBarProps } from "./sidebar-item";

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
    <div className="mt-8 flex h-full w-[350px] flex-col space-y-5 px-8">
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
  );
}
