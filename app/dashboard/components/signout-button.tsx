"use client";

import { signOut } from "@/app/lib/sessions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <div className="group/sidebaritem">
      <Link
        href={"/"}
        onClick={() => {
          signOut();
          router.push("/");
        }}
        className={`flex w-full flex-row space-x-3 rounded-full px-4 py-3 font-semibold text-[#FE2F60] transition-all duration-300 group-hover/sidebaritem:bg-[#FFD9D9] group-hover/sidebaritem:bg-opacity-10`}
      >
        <Image
          className="transition-all duration-300 group-hover/sidebaritem:translate-x-3"
          src={"/logout.png"}
          height={24}
          width={24}
          alt={"logout"}
        />
        <p className="transition-all duration-300 group-hover/sidebaritem:translate-x-3">
          Sign Out
        </p>
      </Link>
    </div>
  );
}
