import { ReactNode } from "react";

type DataRowProps = {
  label: string;
  children?: ReactNode;
};

export function DataRow({ label, children }: DataRowProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-baseline py-3 border-b border-dashed border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0">
      <div className="text-gray-500 dark:text-gray-400 w-full sm:w-1/4 text-left sm:text-right pr-2 sm:pr-3 font-semibold tracking-wide uppercase text-xs pt-0 sm:pt-1">
        {label.trim()}
      </div>
      <div className="flex-1 pl-0 sm:pl-3 w-full">{children}</div>
    </div>
  );
}
