import React from "react";
import { NavBar } from "@/components/NavBar/NavBar";

export default function FixedWidthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
