import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Appbar from "./appbar";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SILAB Admin",
  description:
    "Practicum Management Web Application used in Information System of Universitas Ahmad Dahlan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Appbar />
        {children}
      </body>
    </html>
  );
}
