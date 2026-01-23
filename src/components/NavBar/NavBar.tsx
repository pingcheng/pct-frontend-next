"use client";

import { profile } from "@/data/profile";
import Link from "next/link";
import styles from "./style.module.css";
import { MenuIcon } from "../icons/MenuIcon";
import { CloseIcon } from "../icons/CloseIcon";
import { useNavigation } from "./hooks/useNavigation";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { MobileMenu } from "./components/MobileMenu";

export function NavBar() {
  const { menuItems, logoStyles, isActive } = useNavigation();
  const {
    isMobileMenuVisible,
    mobileMenuRef,
    handleKeyDown,
    toggleMobileMenu,
    closeMobileMenu,
  } = useMobileMenu();

  return (
    <>
      <nav role="navigation" aria-label="Main navigation">
        <div className="page-container relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-4 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
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
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`${styles.navItem} ${
                        isActive(item) ? styles["active"] : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <MobileMenu
          ref={mobileMenuRef}
          menuItems={menuItems}
          isVisible={isMobileMenuVisible}
          onItemClick={closeMobileMenu}
        />
      </nav>
    </>
  );
}

