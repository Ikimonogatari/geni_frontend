import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <div className="bg-[#F5F4F0] w-full pt-28 px-7 sm:px-20">
      <div className="mx-auto rounded-t-3xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 justify-between items-start lg:items-center container">
          <a href="/">
            <Image src={"/geni-logo.png"} width={96} height={26} alt="logo" />
          </a>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-40 text-[#2D262D]">
            <div className="flex flex-row items-center gap-24">
              <a href="/creators">Geni Creators</a>
              <a href="/brands">Geni Brands</a>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <a target="_blank" href="https://www.instagram.com/geni.ugc/">
                <Image src={"/ig-icon.png"} width={40} height={40} alt="logo" />
              </a>
              <a target="_blank" href="mailto:geni.ugc@gmail.com">
                <Image
                  src={"/mail-icon.png"}
                  width={40}
                  height={40}
                  alt="logo"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-24 font-mabry flex flex-row text-sm text-[#2D262D] w-full justify-between items-center py-10 border-t-[1px] border-[#2D262D]">
          <span>Terms and conditions</span>
          <span>2024 - All rights reserved</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
