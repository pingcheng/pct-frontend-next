"use client";

import { profile } from "@/data/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";

type MenuItem = {
  label: string;
  path: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Portfolio",
    path: "/portfolio",
  },
  {
    label: "About me",
    path: "/about",
  },
];

export function NavBar() {
  const pathName = usePathname();
  return (
    <>
      <nav className="bg-gray-700">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile nav bar*/}
          <></>

          {/* Desktop nav bar */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <div
                className="font-bold text-white"
                style={{
                  borderTop: "3px solid white",
                  borderBottom: "3px solid white",
                }}
              >
                {profile.fullName}
              </div>

              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {menuItems.map((item) => {
                    const isActive = pathName === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`${styles.navItem} ${
                          isActive ? styles["active"] : ""
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
      </nav>
    </>
  );
}
