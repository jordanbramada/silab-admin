"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { handleFormSubmitLogin } from "../actions/auth/actions";

export default function Authentication() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { replace } = useRouter();

  const auth = searchParams.get("auth");
  const role = searchParams.get("role");

  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await handleFormSubmitLogin(new FormData(event.currentTarget));

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row justify-between px-[60px] pb-4">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <div className="relative h-[300px] w-[250px]">
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
            <span className="font-semibold text-[#3272CA]">SILAB.</span>
          </p>
          <p className="text-2xl font-semibold text-[#5E6278]">
            Atur dan pantau semua informasi praktikum dengan mudah di sini.
          </p>
        </div>
      </div>
      <div className="flex w-1/2 flex-col items-center space-y-[60px]">
        <div className="flex flex-col items-center">
          <p className="text-[42px] font-extrabold text-[#3272CA]">
            {auth == "login" ? "Log In" : "Sign Up"}
          </p>
          <p className="text-[24px] font-semibold text-[#5E6278]">
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
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center space-y-[32px]"
        >
          <fieldset
            className={`${
              auth != "signup" && role != "dosen" ? "hidden" : "visible"
            }`}
          >
            <label htmlFor="login" />
            <input
              type="text"
              name="nama"
              className="h-[56px] w-[400px] rounded-[30px] border border-[#E1E3EA] px-4 py-6 focus:outline-[#3272CA]"
              placeholder="Nama Lengkap"
              required={auth == "signup" && role == "dosen" ? true : false}
            />
          </fieldset>
          <fieldset
            className={`${
              auth != "signup" && role != "dosen" ? "hidden" : "visible"
            }`}
          >
            <label htmlFor="login" />
            <input
              type="text"
              name="nip"
              className="h-[56px] w-[400px] rounded-[30px] border border-[#E1E3EA] px-4 py-6 focus:outline-[#3272CA]"
              placeholder="NIP"
              required={auth == "signup" && role == "dosen" ? true : false}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="login" />
            <input
              type="email"
              name="email"
              className="h-[56px] w-[400px] rounded-[30px] border border-[#E1E3EA] px-4 py-6 focus:outline-[#3272CA]"
              placeholder="Email"
              required
            />
          </fieldset>
          <div className="flex w-full flex-col items-center space-y-[16px]">
            <fieldset>
              <label htmlFor="login" />
              <input
                name="password"
                type={visible ? "text" : "password"}
                className="relative h-[56px] w-[400px] rounded-[30px] border border-[#E1E3EA] px-4 py-6 focus:outline-[#3272CA]"
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
              className="w-1/2 text-end font-semibold text-[#3272CA]"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="h-[48px] w-[400px] rounded-[30px] bg-[#3272CA] text-[18px] font-semibold text-white"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-md" />
            ) : auth == "login" ? (
              "Log In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div
          className={`flex flex-row space-x-1 ${
            role == "laboran" || role == "asisten" ? "hidden" : "visible"
          }`}
        >
          <p className="text-[18px] font-semibold text-[#5E6278]">
            {auth == "login" ? "Belum punya akun?" : "Sudah punya akun?"}
          </p>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("auth", auth == "login" ? "signup" : "login");
              replace(`${pathname}?${params.toString()}`);
            }}
            className="text-[18px] font-extrabold text-[#3272CA]"
          >
            {auth == "login" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}
