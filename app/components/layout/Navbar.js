import React from "react";
import Image from "next/image";

function Navbar() {
  return (
    <div className="w-full bg-[#F5F4F0] top-0 absolute py-[52px]">
      <div className="relative flex flex-row w-full justify-center items-center gap-12 text-base text-[#000000B8]">
        <Image
          src={"/geni-logo.png"}
          height={26}
          width={96.2}
          alt="logo"
          className="absolute left-[84px]"
        />
        <a>Geni Creators</a>
        <span className="font-bold">·</span>
        <a>Geni Brands</a>
      </div>
    </div>
  );
}

export default Navbar;
