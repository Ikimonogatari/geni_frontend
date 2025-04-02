import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function Footer() {
  const navItems = [
    {
      name: "Geni Student",
      info: "New",
      href: "/student",
      infoColor: "#4FB755",
    },
    { name: "Geni Creator", href: "/creator" },
    { name: "Geni Brand", href: "/brand" },
    {
      name: "Geni Mentor",
      info: "Coming soon",
      href: "/mentor",
      infoColor: "#F49D19",
    },
  ];
  const addNavItems = [
    {
      name: "About",
      href: "/about",
    },
    { name: "Terms & Condition", href: "/term&condition" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <footer className="bg-[#F5F4F0] w-full rounded-t-[30px] pt-16 sm:pt-28 px-7 sm:px-20">
      <div className="mx-auto rounded-t-3xl">
        <div className="flex flex-row gap-16 lg:gap-0 justify-between items-start lg:items-center px-0">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-start">
              <Link href="/">
                <Image
                  src="/geni-logo.png"
                  alt="geni-logo"
                  height={26}
                  width={96}
                />
              </Link>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <a target="_blank" href="https://www.instagram.com/geni.ugc/">
                <Image
                  src={"/ig-icon.png"}
                  width={24}
                  height={24}
                  alt="logo"
                  className="w-6 h-6"
                />
              </a>
              <a target="_blank" href="mailto:geni.ugc@gmail.com">
                <Image
                  src={"/mail-icon.png"}
                  width={24}
                  height={24}
                  alt="logo"
                  className="w-7 h-7"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-40 text-[#2D262D]">
            <nav className="hidden md:flex flex-col gap-1 sm:gap-3">
              {navItems.map((item, index) => (
                <div key={item.name} className="flex items-center gap-6">
                  <Link href={item.href} className="">
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
            <nav className="flex flex-col gap-1 sm:gap-3">
              {addNavItems.map((item, index) => (
                <Link key={item.name} href={item.href}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-8 lg:mt-24 text-xs sm:text-sm text-[#2D262D] w-full text-center py-4 sm:py-10 border-t-[1px] border-[#2D262D]">
          <span>Copyright 2025 Geni Platform - All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
