"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Authentication() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const auth = searchParams.get("auth");
  const role = searchParams.get("role");

  const [visible, setVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [nip, setNip] = useState<string>("");

  return (
    <div className="flex flex-row px-[60px] justify-between  pb-4">
      <div className="flex flex-col justify-center items-center w-1/2">
        <div className="w-[250px] h-[300px] relative">
          <Image
            alt="illustration"
            src={"illustration-1.svg"}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="w-[543px] text-center">
          <p className="text-[54px] font-bold text-[#1D1D1D]">
            Selamat datang di Dashboard{" "}
            <span className="text-[#3272CA] font-semibold">SILAB.</span>
          </p>
          <p className="font-semibold text-2xl text-[#5E6278]">
            Atur dan pantau semua informasi praktikum dengan mudah di sini.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-1/2 items-center space-y-[60px]">
        <div className="flex flex-col items-center">
          <p className="text-[#3272CA] text-[42px] font-extrabold">
            {auth == "login" ? "Log In" : "Sign Up"}
          </p>
          <p className="text-[#5E6278] text-[24px] font-semibold">
            Sebagai
            <span className="font-extrabold">
              {role == "laboran"
                ? " Laboran"
                : role == "dosen"
                ? " Dosen"
                : " Asisten"}
            </span>
          </p>
        </div>
        <div className="flex flex-col w-full items-center space-y-[40px]">
          <fieldset
            className={`${
              auth == "signup" && role == "dosen" ? "visible" : "hidden"
            }`}
          >
            <label htmlFor="login" />
            <input
              type="text"
              value={nama}
              onChange={(value) => setNama(value.target.value)}
              className="border border-[#E1E3EA] focus:outline-none rounded-[30px] w-[400px] h-[56px] px-4 py-6"
              placeholder="Nama Lengkap"
            />
          </fieldset>
          <fieldset
            className={`${
              auth == "signup" && role == "dosen" ? "visible" : "hidden"
            }`}
          >
            <label htmlFor="login" />
            <input
              type="text"
              value={nip}
              onChange={(value) => setNip(value.target.value)}
              className="border border-[#E1E3EA] focus:outline-none rounded-[30px] w-[400px] h-[56px] px-4 py-6"
              placeholder="NIP"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="login" />
            <input
              type="email"
              value={email}
              onChange={(value) => setEmail(value.target.value)}
              className="border border-[#E1E3EA] focus:outline-none rounded-[30px] w-[400px] h-[56px] px-4 py-6"
              placeholder="Email"
            />
          </fieldset>
          <div className="flex flex-col w-full items-center space-y-[16px]">
            <fieldset>
              <label htmlFor="login" />
              <input
                value={password}
                onChange={(value) => setPassword(value.target.value)}
                type={visible ? "text" : "password"}
                className="border border-[#E1E3EA] focus:outline-none rounded-[30px] w-[400px] h-[56px] px-4 py-6 relative"
                placeholder="Password"
              />
              <span className="absolute -translate-x-10 translate-y-4">
                <Image
                  alt="password hide toggler"
                  src={visible ? "/eye-slash.svg" : "/eye.svg"}
                  onClick={() => setVisible(!visible)}
                  width={24}
                  height={24}
                />
              </span>
            </fieldset>
            <Link
              href={""}
              className="text-end w-1/2 text-[#3272CA] font-semibold"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <button
          onClick={() => {}}
          className="w-[400px] h-[48px] bg-[#3272CA] rounded-[30px] text-white text-[18px] font-semibold"
        >
          {auth == "login" ? "Log In" : "Sign Up"}
        </button>
        <div
          className={`flex flex-row space-x-1 ${
            role == "laboran" || role == "asisten" ? "hidden" : "visible"
          }`}
        >
          <p className="text-[#5E6278] font-semibold text-[18px]">
            {auth == "login" ? "Belum punya akun?" : "Sudah punya akun?"}
          </p>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("auth", auth == "login" ? "signup" : "login");
              replace(`${pathname}?${params.toString()}`);
            }}
            className="text-[#3272CA] font-extrabold text-[18px]"
          >
            {auth == "login" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}
