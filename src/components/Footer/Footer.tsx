import { FaHeart } from "react-icons/fa6";
import { profile } from "@/data/profile";
import React from "react";

export function Footer() {
  return (
    <footer className="text-center mb-4 text-gray-400 pt-4 pb-4">
      Hand crafted with{" "}
      <span className="text-red-400">
        <FaHeart />
      </span>{" "}
      by {profile.fullName}
    </footer>
  );
}
