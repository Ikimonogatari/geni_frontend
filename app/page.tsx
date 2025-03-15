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
import Events from "@/components/home/Events";
import Bentobox from "@/components/home/Bentobox";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <div className="container mt-10">
        <HomeHero />
        <ShowCase />
        <Statistics />
        <Events />
        <Banners />
        <Bentobox sections={bentoboxes} />
      </div>
      <Testimonials />
    </>
  );
}

const bentoboxes = [
  {
    title: "Контент зөвлөгөө авах",
    context: "Платформоос зөвлөгөө авж контентоо сайжруулах боломж.",
    image: "/hero-image1.png",
    colSpan: "col-span-4",
    isReversed: true,
  },
  {
    title: "Хамтрал бүрээсээ оноо цуглуулан түвшнээ ахиул",
    context:
      "Контент бүтээгчид оноо цуглуулан түвшнээ ахиулж илүү их орлого олох систем.",
    image: "/hero-image1.png",
    colSpan: "col-span-6",
    isReversed: true,
  },
  {
    title: "Мөнгөн орлогоо тат",
    context: "Контент бүтээгч өөрийн орлогоо хүссэн үедээ татан авч ашиглана.",
    image: "/hero-image1.png",
    colSpan: "col-span-4",
  },
  {
    title: "Контент зөвлөгөө авах",
    context: "Платформоос зөвлөгөө авж контентоо сайжруулах боломж.",
    image: "/hero-image1.png",
    colSpan: "col-span-3",
    isReversed: true,
  },
  {
    context:
      "Контент бүтээгчид оноо цуглуулан түвшнээ ахиулж илүү их орлого олох систем.",
    image: "/hero-image1.png",
    colSpan: "col-span-8",
    isReversed: true,
  },
  {
    title: "Мөнгөн орлогоо тат",
    context: "Контент бүтээгч өөрийн орлогоо хүссэн үедээ татан авч ашиглана.",
    image: "/hero-image1.png",
    colSpan: "col-span-3",
  },
];
