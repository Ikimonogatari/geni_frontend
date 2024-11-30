import React from "react";

function HomeBecomeGeniSectionLayout({ children }) {
  return (
    <div className="w-full h-full px-7 border-t-[1px] border-b-[1px] border-[#2D262D] bg-[#F5F4F0]">
      <div className="mx-auto sm:container max-w-7xl w-full">{children}</div>
    </div>
  );
}

export default HomeBecomeGeniSectionLayout;
