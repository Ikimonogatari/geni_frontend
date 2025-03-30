import React, { ReactNode } from "react";

interface ListRowLayoutProps {
  layout: string;
  children: ReactNode;
}

const ListRowLayout: React.FC<ListRowLayoutProps> = ({ layout, children }) => {
  return (
    <div
      className={`text-[10px] sm:text-base px-5 py-1 sm:p-5 ${layout} gap-3 sm:gap-6 w-full items-center border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl`}
    >
      {children}
    </div>
  );
};

export default ListRowLayout;
