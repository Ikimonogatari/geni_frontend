"use client";

import { useUserInfo } from "@/app/context/UserInfoContext";
import { USER_COLOR } from "@/lib/ui";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavButtons from "../NavButtons";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    userInfo,
    isError: userInfoError,
    isLoading: userInfoLoading,
  } = useUserInfo();

  return (
    <div className="w-full bg-primary-bg top-0 absolute">
      <div className="w-full py-8 sm:py-[52px] shadow-sm px-7 lg:px-20">
        <DropdownMenu isOpen={dropdownOpen} />
        <div className="w-full flex flex-row justify-between items-center lg:gap-12 text-base text-[#000000B8]">
          <a
            href="/"
            className="flex flex-row items-start justify-center gap-2 w-auto"
          >
            <Image
              src={"/geni-logo.svg"}
              height={26}
              width={96.2}
              alt="geni logo"
            />
            <span className="bg-primary px-3 py-1 rounded-3xl text-xs text-white">
              beta
            </span>
          </a>
          <NavButtons />

          {userInfo ? (
            <a
              href="/profile"
              className={clsx(
                `hidden md:flex flex-row items-center gap-[6px] 
      rounded-xl px-2 sm:px-6 py-2 border-[1px] border-primary 
      max-w-[220px] whitespace-nowrap max-h-[42px] opacity-0`,
                USER_COLOR[userInfo?.UserType] &&
                  `bg-${USER_COLOR[userInfo?.UserType]} opacity-100`
              )}
            >
              <Image
                src={"/user-icon.png"}
                width={24}
                height={24}
                alt=""
                className="w-6 h-6"
              />
              <span className="text-white text-base font-semibold line-clamp-1">
                {userInfo?.UserType === "Creator"
                  ? userInfo?.Nickname
                  : userInfo?.UserType === "Brand"
                  ? userInfo?.Name
                  : userInfo?.UserType === "Student"
                  ? userInfo?.Nickname
                  : ""}
              </span>
            </a>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex flex-row items-center gap-1 bg-secondary rounded-xl text-white
        px-2 sm:px-6 py-2 border border-primary"
            >
              Нэвтрэх
            </Link>
          )}

          <button
            className="block md:hidden"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Image src={"/menu-icon.png"} width={32} height={32} alt="menu" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
