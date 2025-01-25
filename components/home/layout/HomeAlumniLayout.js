import React from "react";

function HomeAlumniLayout({ children }) {
  return (
    <div className="w-full h-full px-7 text-[#2D262D] border-[#2D262D]">
      <div className="max-w-7xl mx-auto sm:container">{children}</div>
    </div>
  );
}

export default HomeAlumniLayout;
