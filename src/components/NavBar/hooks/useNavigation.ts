import { usePathname } from "next/navigation";
import { useMemo } from "react";

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

function isActive(item: MenuItem, pathName: string): boolean {
  if (item.activePattern) {
    return item.activePattern.test(pathName);
  }
  return pathName === item.path;
}

export function useNavigation() {
  const pathName = usePathname();

  const logoStyles = useMemo(() => ({
    borderTop: "3px solid var(--logo-line-color)",
    borderBottom: "3px solid var(--logo-line-color)",
  }), []);

  return {
    menuItems,
    pathName,
    logoStyles,
    isActive: (item: MenuItem) => isActive(item, pathName),
  };
}