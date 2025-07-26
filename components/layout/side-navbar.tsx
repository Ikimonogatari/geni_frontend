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
import {
  Menu,
  Home,
  Check,
  Handshake,
  Package,
  Play,
  PieChart,
  CreditCard,
  Link as LinkIcon,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SideNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems: { name: string; href: string; icon: any; badge?: string }[] =
    [
      {
        name: "Нүүр хуудас",
        href: "/home",
        icon: Home,
        // isActive: pathname === "/dashboard",
      },
      {
        name: "Хамтралууд",
        href: "/collaboration",
        icon: Handshake,
        // badge: "3",
      },
      {
        name: "Бүтээгдэхүүн",
        href: "/products",
        icon: Package,
      },
      {
        name: "Контентууд",
        href: "/content",
        icon: Play,
      },
      {
        name: "Хянах самбар",
        href: "/dashboard",
        icon: PieChart,
      },
      {
        name: "Төлбөр",
        href: "/payment",
        icon: CreditCard,
      },
      {
        name: "API",
        href: "/api",
        icon: LinkIcon,
      },
    ];

  return (
    <>
      {/* Desktop Side Navigation */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-white rounded-r-2xl shadow-lg flex-col">
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 flex justify-center">
            <div className="text-2xl font-bold text-black">Geni</div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-6">
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 text-gray-600 transition-colors hover:text-gray-800",
                    item.href === pathname &&
                      "bg-gray-100 border border-gray-300 rounded-xl px-4 py-3"
                  )}
                >
                  <div className="relative">
                    <item.icon className="h-5 w-5" />
                    {item.href === pathname && (
                      <Check className="h-3 w-3 absolute -top-1 -right-1 text-green-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Settings Section */}
          <div className="px-6 pb-6">
            <Link
              href="/settings"
              className="flex items-center gap-4 text-gray-600 transition-colors hover:text-gray-800 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3"
            >
              <Settings className="h-5 w-5" />
              <span className="text-sm font-medium">Тохиргоо</span>
            </Link>
          </div>

          {/* Lhamour Branding */}
          <div className="px-6 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xs font-medium">l</span>
              </div>
              <span className="text-black font-bold text-sm">Lhamour</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden fixed top-4 left-4 z-50">
          <Button className="border-none">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 bg-white">
          <SheetHeader className="p-8 border-b border-gray-200">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex justify-center">
              <div className="text-2xl font-bold text-black">Geni</div>
            </div>
          </SheetHeader>
          <nav className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 text-gray-600 transition-colors hover:text-gray-800",
                    item.href === pathname &&
                      "bg-gray-100 border border-gray-300 rounded-xl px-4 py-3"
                  )}
                >
                  <div className="relative">
                    <item.icon className="h-5 w-5" />
                    {item.href === pathname && (
                      <Check className="h-3 w-3 absolute -top-1 -right-1 text-green-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Settings Section */}
          <div className="px-6 pb-6">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 text-gray-600 transition-colors hover:text-gray-800 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3"
            >
              <Settings className="h-5 w-5" />
              <span className="text-sm font-medium">Тохиргоо</span>
            </Link>
          </div>

          {/* Lhamour Branding */}
          <div className="px-6 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xs font-medium">l</span>
              </div>
              <span className="text-black font-bold text-sm">Lhamour</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
