"use client";

import { profile } from "@/data/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";
import { useState } from "react";

type MenuItem = {
  label: string;
  path: string;
  activePattern?: RegExp;
};

const menuItems: MenuItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Portfolio",
    path: "/portfolio",
    activePattern: /\/portfolio.*/,
  },
  {
    label: "About me",
    path: "/about",
  },
];

export function NavBar() {
  const pathName = usePathname();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  return (
    <>
      <nav>
        <div className="fixed-container relative flex items-center justify-between h-16">
          {/* Mobile nav bar*/}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
              role="mobile-toggle"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className={`block h-6 w-6 ${isMobileMenuVisible ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className={`block h-6 w-6 ${isMobileMenuVisible ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Desktop nav bar */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="shrink-0 flex items-center">
              <div
                className="font-bold text-primary"
                style={
                  {
                    borderTop: "3px solid var(--logo-line-color)",
                    borderBottom: "3px solid var(--logo-line-color)",
                  } as React.CSSProperties
                }
              >
                {profile.fullName}
              </div>

              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {menuItems.map((item) => {
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`${styles.navItem} ${
                          isActive(item, pathName) ? styles["active"] : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile nav bar */}
        <div
          className={`sm:hidden ${isMobileMenuVisible ? "block" : "hidden"}`}
          role="mobile-nav-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${styles.navItem} ${
                    isActive(item, pathName) ? styles["active"] : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

function isActive(item: MenuItem, pathName: string): boolean {
  if (item.activePattern) {
    return item.activePattern.test(pathName);
  }
  return pathName === item.path;
}
