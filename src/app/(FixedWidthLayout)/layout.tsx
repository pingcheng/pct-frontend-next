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
      <div className="fixed-container pt-2">{children}</div>
    </>
  );
}
