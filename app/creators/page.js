import React from "react";
import Creators from "./Creators";
import MonthlyCompetition from "./MonthlyCompetition";
import Leaderboard from "./Leaderboard";
import BecomeCreatorBanner from "./BecomeCreatorBanner";
import BecomeCreatorSection from "./BecomeCreatorSection";
import CreatorBenefits from "./CreatorBenefits";
import CertifiedCreatorBenefits from "./CertifiedCreatorBenefits";
import CreatorAlumni from "./CreatorAlumni";
import CreatorCycle from "./CreatorCycle";
import CreatorHero from "./CreatorHero";
import CreatorLogo from "./CreatorLogo";

export const metadata = {
  title: "Geni | Бүтээгчид",
  description: "Geni Бүтээгчид",
};

function creators() {
  return (
    <div className="min-h-screen w-full bg-white text-[#2D262D]">
      <div className="mt-[96px] sm:mt-[136px] md:mt-[152px]">
        <div className="container px-7 max-w-7xl mx-auto pt-12 sm:pt-20">
          <CreatorLogo />
          <CreatorHero />
          <CreatorCycle />
          <Creators />
          <CreatorAlumni />
          {/* <MonthlyCompetition />
          <Leaderboard /> */}
          <BecomeCreatorBanner />
        </div>
        <BecomeCreatorSection />
        <CertifiedCreatorBenefits />
        <CreatorBenefits />
      </div>
    </div>
  );
}

export default creators;
