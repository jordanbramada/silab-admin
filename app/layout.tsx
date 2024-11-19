import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Appbar from "./appbar";
import { UserDetails } from "./types/user-details";
import { getAccessToken, getRole } from "./lib/sessions";

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
  const accessToken = await getAccessToken();
  const res = await fetch(`${process.env.BASE_URL}/user-profiles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const responseData = await res.json();
  const data: UserDetails = responseData["data"] as UserDetails;
  const role = await getRole();

  return (
    <html lang="en">
      <body className={manrope.className}>
        {role && <Appbar role={role} data={data} />}
        {children}
      </body>
    </html>
  );
}
