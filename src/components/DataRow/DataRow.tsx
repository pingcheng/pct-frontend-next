import { ReactNode } from "react";

type DataRowProps = {
  label: string;
  children?: ReactNode;
};

export function DataRow({ label, children }: DataRowProps) {
  return (
    <div className="flex mb-4">
      <div className="text-gray-400 w-1/4 text-right pr-2">
        {label.trim().toUpperCase()}
      </div>
      <div className="flex-1 pl-2">{children}</div>
    </div>
  );
}
