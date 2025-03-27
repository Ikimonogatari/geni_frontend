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
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full">
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            themeType="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] pr-0">
          <nav className="flex flex-col gap-4">
            {items.map((item, index) =>
              item.onClick ? (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary text-left",
                    "hover:bg-muted"
                  )}
                >
                  {item.icon}
                  {item.title}
                </button>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "bg-muted" : "hover:bg-muted"
                  )}
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
          "hidden lg:flex flex-col gap-4 w-[240px] border-r px-4 py-8",
          className
        )}
        {...props}
      >
        {items.map((item, index) =>
          item.onClick ? (
            <button
              key={index}
              onClick={item.onClick}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary text-left",
                "hover:bg-muted"
              )}
            >
              {item.icon}
              {item.title}
            </button>
          ) : (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "bg-muted" : "hover:bg-muted"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
