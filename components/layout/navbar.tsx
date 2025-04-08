"use client";

import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserButton from "./_components/user-button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Geni Student",
      info: "New",
      href: "/student",
      infoColor: "#4FB755",
      activeClass: "bg-geni-green",
    },
    { name: "Geni Creator", href: "/creator", activeClass: "bg-geni-pink" },
    { name: "Geni Brand", href: "/brand", activeClass: "bg-geni-blue" },
    {
      name: "Geni Mentor",
      info: "Coming soon",
      href: "/mentor",
      infoColor: "#F49D19",
      activeClass: "bg-geni-red",
    },
  ];

  const addNavItems = [
    {
      name: "About",
      href: "/about",
    },
    { name: "Terms & Condition", href: "/tos" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full rounded-b-[30px] bg-primary-bg">
      <div className="container flex py-10 px-16 items-center justify-between">
        <div className="flex items-start gap-2">
          <Link href="/">
            <Image
              src="/geni-logo.svg"
              alt="geni-logo"
              height={26}
              width={96}
            />
          </Link>
          <Badge className="text-primary-foreground text-xs font-normal py-0">
            beta
          </Badge>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => (
            <div key={item.name} className="flex items-center gap-6">
              {index !== 0 && (
                <div className="size-1 rounded-full bg-black/75" />
              )}
              <Link
                href={item.href}
                className={cn(
                  "text-base font-bold text-muted-foreground transition-colors hover:text-primary relative rounded-full py-1.5 px-6",
                  pathname.includes(item.href) &&
                    `${item.activeClass} text-white hover:text-white`
                )}
              >
                {item.name}
                {item?.info && (
                  <span
                    className={cn(
                      "text-nowrap absolute -top-1 -right-1 transform -translate-y-3 translate-x-4 rotate-[20deg] bg-red-500 text-white text-[10px] leading-none py-1 px-1 rounded-full",
                      `bg-[${item.infoColor}]`
                    )}
                  >
                    {item?.info}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden md:flex">
          <UserButton />
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button className="border-none">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full rounded-b-[30px]">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
              <div className="ml-2 size-1 rounded-full bg-primary" />
              {navItems.map((item) => (
                <div key={item.name} className="flex items-center gap-6">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium text-muted-foreground transition-colors hover:text-primary flex rounded-full py-1.5",
                      pathname.includes(item.href) &&
                        `${item.activeClass} text-white hover:text-white px-6`
                    )}
                  >
                    {item.name}
                    {pathname.includes(item.href)
                      ? null
                      : item?.info && (
                          <span
                            className={cn(
                              "text-nowrap transform -translate-y-4 translate-x-2 translate- rotate-[20deg] bg-red-500 text-white text-[10px] leading-[2.5] px-3 rounded-full",
                              `bg-[${item.infoColor}]`
                            )}
                          >
                            {item?.info}
                          </span>
                        )}
                  </Link>
                </div>
              ))}
              <div className="ml-2 size-1 rounded-full bg-primary" />
              {addNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-4">
                <UserButton />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
