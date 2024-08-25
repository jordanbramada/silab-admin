"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Authentication() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const auth = searchParams.get("auth");
  const role = searchParams.get("role");

  const [visible, setVisible] = useState<boolean>(false);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("https://silab-dev.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const responseData = await response.json();
    const data = responseData["data"];
  }

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
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col w-full items-center space-y-[32px]"
        >
          <fieldset
            className={`${
              auth == "signup" && role == "dosen" ? "visible" : "hidden"
            }`}
          >
            <label htmlFor="login" />
            <input
              type="text"
              name="nama"
              className="border border-[#E1E3EA] focus:outline-none rounded-[30px] w-[400px] h-[56px] px-4 py-6"
              placeholder="Nama Lengkap"
              required={auth == "signup" && role == "dosen" ? true : false}
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
              name="nip"
              className="border border-[#E1E3EA] focus:outline-none rounded-[30px] w-[400px] h-[56px] px-4 py-6"
              placeholder="NIP"
              required={auth == "signup" && role == "dosen" ? true : false}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="login" />
            <input
              type="email"
              name="email"
              className="border border-[#E1E3EA] focus:outline-none rounded-[30px] w-[400px] h-[56px] px-4 py-6"
              placeholder="Email"
              required
            />
          </fieldset>
          <div className="flex flex-col w-full items-center space-y-[16px]">
            <fieldset>
              <label htmlFor="login" />
              <input
                name="password"
                type={visible ? "text" : "password"}
                className="border border-[#E1E3EA] focus:outline-none rounded-[30px] w-[400px] h-[56px] px-4 py-6 relative"
                placeholder="Password"
                required
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
          <button
            type="submit"
            className="w-[400px] h-[48px] bg-[#3272CA] rounded-[30px] text-white text-[18px] font-semibold"
          >
            {auth == "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
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
