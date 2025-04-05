"use client";

import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    href: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }[];
  activeSection?: string;
  className?: string;
}

export function Sidebar({
  className,
  items,
  activeSection,
  ...props
}: SidebarProps) {
  const pathname = usePathname();
  console.log(className);
  const linkStyles = (isActive: boolean) =>
    cn(
      "flex items-center gap-2 px-4 py-2 text-sm sm:text-lg font-medium transition-colors rounded-lg",
      isActive
        ? "text-black sm:border-[1px] sm:border-primary font-medium"
        : "text-[#6F6F6F] hover:text-black sm:hover:bg-[#F5F4F0]"
    );

  return (
    <div className={cn("flex h-full", className)}>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger
          asChild
          className="min-w-12 min-h-12 aspect-square flex items-center justify-center"
        >
          <Button
            themeType="ghost"
            className="px-2 py-2 aspect-square text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        {/* @ts-ignore */}
        <SheetContent side="left" className="w-[240px] pr-0">
          <nav className="flex flex-col gap-4">
            {items.map((item, index) =>
              item.onClick ? (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={linkStyles(
                    activeSection === item.href.replace("#", "")
                  )}
                >
                  {item.icon}
                  {item.title}
                </button>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={linkStyles(false)}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )
            )}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <nav
        className={cn(
          "hidden md:flex flex-col gap-4 min-w-max pr-10 py-3",
          className
        )}
        {...props}
      >
        {items.map((item, index) =>
          item.onClick ? (
            <button
              key={index}
              onClick={item.onClick}
              className={linkStyles(
                activeSection === item.href.replace("#", "")
              )}
            >
              {item.icon}
              {item.title}
            </button>
          ) : (
            <Link key={index} href={item.href} className={linkStyles(false)}>
              {item.icon}
              {item.title}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
