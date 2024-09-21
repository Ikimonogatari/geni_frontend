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
  const {
    data: getUserInfoData,
    error: getUserInfoError,
    isLoading: getUserInfoLoading,
    refetch,
  } = useGetUserInfoQuery();

  useEffect(() => {
    if (shouldRefetchUserInfo) {
      refetch();
      setShouldRefetchUserInfo(false);
    }
  }, [shouldRefetchUserInfo, refetch, setShouldRefetchUserInfo]);
  useEffect(() => {
    if (getUserInfoData) {
      Cookies.set("user-info", JSON.stringify(getUserInfoData), {
        expires: 1 / 48,
      });
    }
  }, [getUserInfoData]);

  const userType = Cookies.get("userType");
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
          {userType && getUserInfoData ? (
            <a
              href={
                userType === "Creator" ? "/creator-profile" : "/brand-profile"
              }
              className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
            >
              Profile
            </a>
          ) : (
            <a
              href={"/login"}
              className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
            >
              Login
            </a>
          )}
        </div>
        <div className="w-full flex flex-row justify-between items-center gap-12 text-base text-[#000000B8]">
          <a
            href="/"
            className="flex flex-row items-start justify-center gap-2 w-auto"
          >
            <Image
              src={"/geni-logo.svg"}
              height={26}
              width={96.2}
              alt="logo"
              className=""
            />
            <span className="bg-[#2D262D] px-3 py-1 rounded-3xl text-xs text-white">
              beta
            </span>
          </a>
          <NavButtons />

          {!getUserInfoLoading && getUserInfoError && !userType ? (
            <a
              href={"/login"}
              className={`hidden md:flex flex-row items-center gap-1 bg-[#CA7FFE] rounded-xl text-white px-2 sm:px-6 py-2 border-[1px] border-[#2D262D]`}
            >
              Нэвтрэх
            </a>
          ) : (
            <></>
          )}

          {!getUserInfoError && getUserInfoData ? (
            <a
              href={
                userType === "Creator"
                  ? "/creator-profile"
                  : userType === "Brand"
                  ? "/brand-profile"
                  : "/student-profile"
              }
              className={`hidden md:flex flex-row items-center gap-[6px] ${
                userType === "Creator"
                  ? "bg-[#CA7FFE]"
                  : userType === "Brand"
                  ? "bg-[#4D55F5]"
                  : userType === "Student"
                  ? "bg-[#4FB755]"
                  : "opacity-0"
              } rounded-xl px-2 sm:px-6 py-2 border-[1px] border-[#2D262D]`}
            >
              <Image
                src={"/user-icon.png"}
                width={24}
                height={24}
                alt=""
                className="w-6 h-6"
              />
              <span className="text-white text-base font-semibold">
                {userType === "Creator"
                  ? getUserInfoData?.Nickname
                  : userType === "Brand"
                  ? getUserInfoData?.Name
                  : userType === "Student"
                  ? getUserInfoData?.Nickname
                  : ""}
              </span>
            </a>
          ) : getUserInfoLoading ? (
            <div className="w-[110.73px] h-[42px]"></div>
          ) : (
            <></>
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
