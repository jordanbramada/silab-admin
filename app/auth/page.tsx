"use client";

import Image from "next/image";
import { useState } from "react";
import ErrorDialog from "../components/error-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/validation.schema";
import { ILoginRequestBody } from "../interfaces/auth/auth.interface";
import useAuthStore from "../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Authentication() {
  const router = useRouter();

  const [visible, setVisible] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { error, isLoading, login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILoginRequestBody>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const onSubmit = async () => {
    const body = watch();

    await login(body);
    router.replace("/dashboard");
  };

  return (
    <>
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
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center space-y-[20px]"
          >
            <label htmlFor="login" />
            <input
              type="nim"
              className="h-[56px] w-[400px] rounded-[30px] border border-[#E1E3EA] px-4 py-6 focus:outline-[#3272CA]"
              placeholder="NIM"
              {...register("nim")}
              required
            />
            {errors && <p>{errors.nim?.message}</p>}
            <div className="flex w-full flex-col items-center space-y-[16px]">
              <div>
                <label htmlFor="login" />
                <input
                  type={visible ? "text" : "password"}
                  className="relative h-[56px] w-[400px] rounded-[30px] border border-[#E1E3EA] px-4 py-6 focus:outline-[#3272CA]"
                  placeholder="Password"
                  {...register("password")}
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
              </div>
              {errors && <p>{errors.nim?.message}</p>}
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
      {error && (
        <ErrorDialog
          title={error}
          dialogOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
}
