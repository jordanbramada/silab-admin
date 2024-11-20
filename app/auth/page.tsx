"use client";

import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useSearchParams,
  useRouter,
  redirect,
} from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { handleFormSubmitLogin } from "../actions/auth/actions";
import ErrorDialog from "../components/error-dialog";

export default function Authentication() {
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const responseData = await handleFormSubmitLogin(
        new FormData(event.currentTarget),
      );

      if (responseData["status"] !== "success") {
        setError(true);
        setMessage(responseData["message"]);
        setDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Suspense>
        <div className="flex w-full flex-row items-center justify-between px-[60px] pb-4">
          <div className="flex w-2/3 flex-col items-center justify-center">
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
          <div className="flex w-1/3 flex-col items-center space-y-[32px] rounded-2xl border border-[#1d1d1d]/30 p-6">
            <p className="text-[42px] font-extrabold text-[#3272CA]">Log In</p>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center space-y-[20px]"
            >
              <fieldset>
                <label htmlFor="login" />
                <input
                  type="nim"
                  name="nim"
                  className="h-[56px] w-[400px] rounded-[30px] border border-[#E1E3EA] px-4 py-6 focus:outline-[#3272CA]"
                  placeholder="NIM"
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
              </div>
              <button
                type="submit"
                className="h-[48px] w-[400px] rounded-[30px] bg-[#3272CA] text-[18px] font-semibold text-white"
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-md" />
                ) : (
                  "Log In"
                )}
              </button>
            </form>
          </div>
        </div>
      </Suspense>
      <ErrorDialog
        title={message}
        dialogOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}
