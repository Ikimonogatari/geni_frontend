import React from "react";
import Image from "next/image";

function Navbar() {
  return (
    <div className="w-full bg-[#F5F4F0] top-0 absolute py-[52px] px-7 sm:px-20">
      <div className="relative flex flex-row w-full justify-between sm:justify-center items-center gap-12 text-base text-[#000000B8]">
        <Image
          src={"/geni-logo.png"}
          height={26}
          width={96.2}
          alt="logo"
          className="static sm:absolute left-0"
        />
        <a className="hidden sm:block">Geni Creators</a>
        <span className="font-bold hidden sm:block">·</span>
        <a className="hidden sm:block">Geni Brands</a>
        <button>
          <Image
            src={"/menu-icon.png"}
            width={24}
            height={24}
            alt="menu"
            className="block sm:hidden"
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
