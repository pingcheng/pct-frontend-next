import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Gtag from "@/components/Gtag/Gtag";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  keywords: "ping,cheng,software,developer,high,passionate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Gtag />
        <Analytics />
      </body>
    </html>
  );
}
