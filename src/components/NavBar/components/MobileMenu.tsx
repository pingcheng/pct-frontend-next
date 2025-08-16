"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../style.module.css";
import { forwardRef } from "react";

type MenuItem = {
  label: string;
  path: string;
  activePattern?: RegExp;
};

type MobileMenuProps = {
  menuItems: MenuItem[];
  isVisible: boolean;
  onItemClick: () => void;
};

function isActive(item: MenuItem, pathName: string): boolean {
  if (item.activePattern) {
    return item.activePattern.test(pathName);
  }
  return pathName === item.path;
}

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ menuItems, isVisible, onItemClick }, ref) => {
    const pathName = usePathname();

    return (
      <div
        id="mobile-menu"
        ref={ref}
        className={`sm:hidden ${styles.mobileMenu} ${
          isVisible ? styles.expanded : ""
        }`}
        aria-hidden={!isVisible}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${
                isActive(item, pathName) ? styles["active"] : ""
              }`}
              onClick={onItemClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";