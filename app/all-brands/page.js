import React from "react";
import AllBrands from "./AllBrands";

export const metadata = {
  title: "Geni | Бүх брэндүүд",
  description: "Бүх Geni бүтээгчид",
};

function page() {
  return (
    <div className="min-h-screen w-full bg-white text-[#2D262D]">
      <div className="my-16 lg:my-28">
        <div className="pt-20 container max-w-7xl mx-auto px-7">
          <AllBrands />
        </div>
      </div>
    </div>
  );
}

export default page;
