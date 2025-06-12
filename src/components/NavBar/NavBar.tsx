"use client";

import { profile } from "@/data/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";
import { useState, useRef, useEffect, useMemo, KeyboardEvent } from "react";
import { MenuIcon } from "../icons/MenuIcon";
import { CloseIcon } from "../icons/CloseIcon";

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
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const logoStyles = useMemo(() => ({
    borderTop: "3px solid var(--logo-line-color)",
    borderBottom: "3px solid var(--logo-line-color)",
  }), []);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsMobileMenuVisible(!isMobileMenuVisible);
    }
  };

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (isMobileMenuVisible) {
      menu.style.maxHeight = menu.scrollHeight + "px";
    } else {
      menu.style.maxHeight = "0px";
    }
  }, [isMobileMenuVisible]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuVisible) {
        setIsMobileMenuVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscape as any);
    return () => document.removeEventListener('keydown', handleEscape as any);
  }, [isMobileMenuVisible]);

  return (
    <>
      <nav role="navigation" aria-label="Main navigation">
        <div className="page-container relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-4 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
              onKeyDown={handleKeyDown}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuVisible}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuVisible ? "Close main menu" : "Open main menu"}
            >
              <MenuIcon 
                className={isMobileMenuVisible ? "hidden" : "block"} 
                aria-hidden="true"
              />
              <CloseIcon 
                className={isMobileMenuVisible ? "block" : "hidden"} 
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="shrink-0 flex items-center">
              <div
                className="font-bold text-primary"
                style={logoStyles}
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

        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`sm:hidden ${styles.mobileMenu} ${
            isMobileMenuVisible ? styles.expanded : ""
          }`}
          aria-hidden={!isMobileMenuVisible}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${styles.navItem} ${
                    isActive(item, pathName) ? styles["active"] : ""
                  }`}
                  onClick={() => setIsMobileMenuVisible(false)}
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
