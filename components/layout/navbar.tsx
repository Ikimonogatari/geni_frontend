"use client";

import Button from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CircuitBoard, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { info } from "console";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 w-full rounded-b-[30px] bg-primary-bg">
      <div className="container flex py-10 px-16 items-center justify-between">
        <div className="flex items-start">
          <Link href="/">
            <Image
              src="/geni-logo.png"
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
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <div className="flex items-center gap-6">
              {index !== 0 && (
                <div className="size-1 rounded-full bg-black/75" />
              )}
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-bold text-muted-foreground transition-colors hover:text-primary relative"
              >
                {item.name}
                {item?.info && (
                  <span
                    className={cn(
                      "absolute -top-1 -right-1 transform -translate-y-3 translate-x-4 rotate-[20deg] bg-red-500 text-white text-[10px] leading-none py-1 px-1 rounded-full",
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
          <Button className="px-14 py-2 h-11 flex items-center rounded-full sm:rounded-full bg-primary text-primary-foreground text-base font-bold">
            Нэвтрэх
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-4">
              {navItems.map((item) => (
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
                <Button className="w-full">Login</Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
