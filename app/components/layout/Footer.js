import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <div className="bg-[#F5F4F0] w-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <Image />
        <div className="flex flex-row items-center"></div>
      </div>
      <div className="flex flex-row justify-between items-center py-10 border-t-[1px] border-[#2D262D]"></div>
    </div>
  );
}

export default Footer;
