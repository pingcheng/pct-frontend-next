import React from "react";
import { NavBar } from "@/components/NavBar/NavBar";
import { Footer } from "@/components/Footer";

export default function FixedWidthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="fixed-container pt-2">{children}</div>
      <Footer />
    </>
  );
}
