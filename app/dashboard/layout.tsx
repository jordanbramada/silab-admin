import SideBar from "../components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full flex-row">
      <SideBar />
      <main className="mx-[30px] mt-8 flex h-full w-3/4 flex-col items-center justify-start rounded-[35px] bg-[#F5F5F5] p-[40px]">
        {children}
      </main>
    </div>
  );
}
