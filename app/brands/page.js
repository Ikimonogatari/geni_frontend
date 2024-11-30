import React from "react";
import Brands from "./Brands";
import FreeContentWave from "./FreeContentWave";
import BrandCycle from "./BrandCycle";
import BrandHero from "./BrandHero";
import BrandAlumni from "./BrandAlumni";
import BecomeGeniBrand from "./BecomeGeniBrand";

export const metadata = {
  title: "Geni | Brands",
  description: "Geni Brands",
};

function page() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-[96px] sm:mt-[136px] md:mt-[152px]">
        <FreeContentWave />
        <BrandHero />
        <div className="container px-7 mx-auto mt-7">
          <BrandCycle />
        </div>
        <Brands />
        <BrandAlumni />
        <BecomeGeniBrand />
      </div>
    </div>
  );
}

export default page;
