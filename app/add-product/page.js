import React from "react";
import Image from "next/image";
import Brands from "./Brands";
import BrandsMobile from "./BrandsMobile";

export const metadata = {
  title: "Geni | Brands",
  description: "Geni Brands",
};

function page() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32"></div>
    </div>
  );
}

export default page;
