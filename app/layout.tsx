import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { getUserData } from "./utils/cookie";
import Appbar from "./appbar";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SILAB Admin",
  description:
    "Practicum Management Web Application used in Information System of Universitas Ahmad Dahlan.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getUserData();

  return (
    <html lang="en">
      <body className={manrope.className}>
        {userData && (
          <Appbar
            role={userData.role}
            data={{
              fullname: userData.fullname,
              email: userData.email,
              nim: userData.nim,
            }}
          />
        )}
        {children}
      </body>
    </html>
  );
}
