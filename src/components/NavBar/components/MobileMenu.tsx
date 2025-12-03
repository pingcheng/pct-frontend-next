"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
        className={`sm:hidden overflow-hidden max-h-0 opacity-0 invisible pointer-events-none ${isVisible ? "opacity-100 visible pointer-events-auto" : ""
          }`}
        style={{
          transition: isVisible
            ? "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease"
            : "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease, visibility 0s linear 0.3s",
        }}
        aria-hidden={!isVisible}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 relative ${isActive(item, pathName)
                ? "text-[var(--color-accent)] font-semibold bg-indigo-500/20 dark:bg-indigo-500/25"
                : "text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] hover:text-[var(--color-accent)] hover:bg-indigo-500/10 dark:hover:bg-indigo-500/15"
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