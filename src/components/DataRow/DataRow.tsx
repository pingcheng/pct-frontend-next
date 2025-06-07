import { ReactNode } from "react";

type DataRowProps = {
  label: string;
  children?: ReactNode;
};

export function DataRow({ label, children }: DataRowProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-baseline mb-6 pb-4 border-b border-dashed border-gray-200 dark:border-gray-700 last:border-b-0 last:mb-0 last:pb-0">
      <div className="text-gray-500 dark:text-gray-400 w-full sm:w-1/4 text-left sm:text-right pr-2 font-semibold tracking-wide uppercase text-xs mb-1 sm:mb-0 pt-0 sm:pt-1">
        {label.trim()}
      </div>
      <div className="flex-1 pl-0 sm:pl-2 w-full">{children}</div>
    </div>
  );
}
