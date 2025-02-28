import Image from "next/image";
import HomeHero from "@/components/home/HomeHero";
import HomeCycle from "@/components/home/HomeCycle";
import HomeBecomeCreator from "@/components/home/HomeBecomeCreator";
import HomeBecomeGeniBrand from "@/components/home/HomeBecomeGeniBrand";
import HomeBecomeGeniSectionLayout from "@/components/home/layout/HomeBecomeGeniSectionLayout";
import HomeAlumniLayout from "@/components/home/layout/HomeAlumniLayout";
import HomeAlumniCreator from "@/components/home/HomeAlumniCreator";
import HomeAlumniBrand from "@/components/home/HomeAlumniBrand";
import GridContainer from "@/components/layout/grid-container";
import BecomeGeniButton from "@/components/common/BecomeGeniButton";
import { ArrowRight, ChevronRight, ChevronRightSquare } from "lucide-react";
import { ElevatedButton } from "@/components/common/elevated-button";
import { StatsCard } from "@/components/landing/stats-card";

export default function Home() {
  return (
    <div className="mt-16 grid grid-cols-[repeat(16,_1fr)] gap-4">
      <GridContainer className="mb-4">
        <div className="col-span-8 flex flex-col space-y-6 mt-6">
          <h1 className="text-[2.5rem] font-black tracking-tight leading-none">
            <div>КОНТЕНТ БҮТЭЭГЧИД БОЛОН</div>
            <div>БРЭНДҮҮДИЙН ХАМТРАН</div>
            <div>ХАМТДАА ӨСӨХ ШИЙДЭЛ</div>
          </h1>
          <p className="text-lg leading-5">
            Хэрэглэгчдийн бодит туршлага дээр суурилсан бүтээлч контент
            Хэрэглэгчдийн бодит туршлага дээр суурилсан бүтээлч контент
          </p>
        </div>
        <div className="col-span-6 -col-end-1 bg-background rounded-[30px] p-8 pt-0">
          <Image
            src="/landing/image-1.png"
            alt="hero-image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
          />
        </div>
      </GridContainer>
      <GridContainer>
        <div className="col-span-4  rounded-[30px]">
          <ElevatedButton className="py-5 px-9 bg-geni-pink text-base leading-5 rounded-[30px]">
            <div className="flex gap-3 items-center justify-center">
              Платформд нэгдэх
              <ArrowRight size={24} />
            </div>
          </ElevatedButton>
        </div>
        <div className="col-span-10 -col-end-1 bg-background rounded-[30px] p-8 pt-0">
          <Image
            src="/landing/image-1.png"
            alt="hero-image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
          />
        </div>
      </GridContainer>
      <GridContainer className="mb-5">
        <div className="col-span-4">
          <StatsCard
            count={120}
            subtitle="Geni Student"
            className="text-geni-green"
            imgSrc="/landing/student-stats.png"
          />
        </div>
        <div className="col-span-4">
          <StatsCard
            count={80}
            subtitle="Geni Creator"
            className="text-geni-pink"
            imgSrc="/landing/creator-stats.png"
          />
        </div>
        <div className="col-span-4">
          <StatsCard
            count={60}
            subtitle="Geni Brand"
            className="text-geni-blue"
            imgSrc="/landing/brand-stats.png"
          />
        </div>
      </GridContainer>
    </div>
  );
}
