import React from "react";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ children, className = "" }) => {
  return (
    <span
      className={`bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded-full transition-colors cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 ${className}`}
    >
      {children}
    </span>
  );
};
