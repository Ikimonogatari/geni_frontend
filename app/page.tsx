import Image from "next/image";
import HomeHero from "@/components/home/HomeHero";
import HomeCycle from "@/components/home/HomeCycle";
import HomeBecomeCreator from "@/components/home/HomeBecomeCreator";
import HomeBecomeGeniBrand from "@/components/home/HomeBecomeGeniBrand";
import HomeBecomeGeniSectionLayout from "@/components/home/layout/HomeBecomeGeniSectionLayout";
import HomeAlumniLayout from "@/components/home/layout/HomeAlumniLayout";
import HomeAlumniCreator from "@/components/home/HomeAlumniCreator";
import HomeAlumniBrand from "@/components/home/HomeAlumniBrand";
import BecomeGeniButton from "@/components/common/BecomeGeniButton";
import { ArrowRight, ChevronRight, ChevronRightSquare } from "lucide-react";
import ContainerLayout from "@/components/ui/container-layout";
import { StatsCard } from "@/components/home/stats-card";
import { ElevatedButton } from "@/components/common/ElevatedButton";
import ConcaveCard from "@/components/common/ConcaveCard";
import Banners from "@/components/home/Banners";
import Statistics from "@/components/home/Statistics";
import ShowCase from "@/components/home/ShowCase";

export default function Home() {
  return (
    <div className="container mt-10">
      <HomeHero />
      <ShowCase />
      <Statistics />
      <Banners />
    </div>
  );
}
