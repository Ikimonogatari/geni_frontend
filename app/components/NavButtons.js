"use client";
import { usePathname } from "next/navigation";
import React from "react";

function NavButtons() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row items-center gap-6 lg:gap-12">
      <a
        href="/creators"
        className={`${
          pathname === "/creators"
            ? "text-white  py-3 px-5 rounded-full bg-[#CA7FFE]"
            : "text-[#000000B8]"
        } hidden md:block`}
      >
        Geni Бүтээгчид
      </a>
      <span className={`font-bold hidden md:block`}>·</span>
      <a
        href="/brands"
        className={`${
          pathname === "/brands"
            ? "text-white  py-3 px-5 rounded-full bg-[#4D55F5]"
            : "text-[#000000B8]"
        } hidden md:block`}
      >
        Geni Брэндүүд
      </a>
    </div>
  );
}

export default NavButtons;
