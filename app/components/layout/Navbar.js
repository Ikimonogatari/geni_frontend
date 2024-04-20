"use client";
import React, { useState } from "react";
import Image from "next/image";
import NavButtons from "../NavButtons";

function Navbar() {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  return (
    <div className="w-full bg-[#F5F4F0] top-0 absolute">
      <div className="w-full py-[52px] px-7 sm:px-20">
        <div
          className={`${
            dropdownOpen
              ? `top-full opacity-100 visible`
              : "top-[110%] invisible opacity-0"
          } absolute left-0 z-40 w-full rounded border-[.5px] border-light bg-[#F8F8FA] py-5 shadow-card transition-all text-[#273266]`}
        >
          <a
            href="/"
            className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
          >
            Home
          </a>
          <a
            href="/creators"
            className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
          >
            Creators
          </a>
          <a
            href="/brands"
            className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
          >
            Brands
          </a>
          <a
            href="/profile"
            className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
          >
            Profile
          </a>
        </div>
        <div className="relative flex flex-row w-full justify-between md:justify-center items-center gap-12 text-base text-[#000000B8]">
          <a href="/">
            <Image
              src={"/geni-logo.png"}
              height={26}
              width={96.2}
              alt="logo"
              className="static md:absolute left-0"
            />
          </a>
          <NavButtons />
          <button onClick={() => setdropdownOpen(!dropdownOpen)}>
            <Image
              src={"/menu-icon.png"}
              width={24}
              height={24}
              alt="menu"
              className="block md:hidden"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
