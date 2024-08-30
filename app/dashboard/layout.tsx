import SideBar from "../components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[1200px] w-full flex-row">
      <SideBar />
      <main className="mx-[30px] mt-8 flex w-full flex-col items-center justify-start rounded-[35px] bg-[#F5F5F5] p-[40px]">
        {children}
      </main>
    </div>
  );
}
