"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavButtons from "../NavButtons";
import { useGetUserInfoQuery } from "@/app/services/service";
import Cookies from "js-cookie";
import { useUserInfo } from "@/app/context/UserInfoContext";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { shouldRefetchUserInfo, setShouldRefetchUserInfo } =
    useUserInfo(false);

  useEffect(() => {
    const userInfo = Cookies.get("user-info");
    if (!userInfo) {
      setShouldRefetchUserInfo(true); // Set global state to trigger refetch
    }
  }, []);
  console.log(shouldRefetchUserInfo, "SHoULD WE REFETCH ?");
  const {
    data: getUserInfoData,
    error: getUserInfoError,
    isLoading: getUserInfoLoading,
  } = useGetUserInfoQuery(undefined, {
    skip: !shouldRefetchUserInfo, // Use global state to control skipping
  });

  useEffect(() => {
    if (getUserInfoData) {
      Cookies.set("user-info", JSON.stringify(getUserInfoData), { expires: 7 }); // Set the cookie with a 7-day expiration
    }
  }, [getUserInfoData]);

  useEffect(() => {
    if (getUserInfoError) {
      console.error("Failed to fetch user info:", getUserInfoError);
    }
  }, [getUserInfoError]);

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
          {/* <a
            href="/profile"
            className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
          >
            Profile
          </a> */}
        </div>
        <div className="relative flex flex-row w-full justify-between md:justify-center items-center gap-12 text-base text-[#000000B8]">
          <a href="/">
            <Image
              src={"/geni-logo.svg"}
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
