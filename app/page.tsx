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

export default function Home() {
  return (
    <div className="container mt-10">
      <ContainerLayout>
        <div className="w-full flex flex-row items-center justify-between">
          <div className="col-span-8 flex flex-col space-y-6 mt-6 max-w-2xl">
            <h1 className="text-[2.5rem] font-black tracking-tight leading-none">
              КОНТЕНТ БҮТЭЭГЧИД БОЛОН БРЭНДҮҮДИЙН ХАМТРАН ХАМТДАА ӨСӨХ ШИЙДЭЛ
            </h1>
            <p className="text-lg leading-5">
              Хэрэглэгчдийн бодит туршлага дээр суурилсан бүтээлч контент
              Хэрэглэгчдийн бодит туршлага дээр суурилсан бүтээлч контент
            </p>
          </div>
          <Image
            src="/landing/image-1.png"
            alt=""
            width={421}
            height={229}
            // sizes="100vw"
            // style={{ width: "100%", height: "auto" }}
          />
        </div>
      </ContainerLayout>

      <ContainerLayout className="flex flex-row gap-5">
        <div className="flex flex-col w-full h-full max-w-xl">
          <div className="w-full flex flex-row items-stretch">
            <div className="h-full bg-primary-bg">
              <div className="bg-white rounded-br-[30px] p-6 w-full h-full">
                <ElevatedButton
                  className="rounded-[30px] whitespace-nowrap"
                  theme="pink"
                >
                  <div className="flex gap-2 items-center justify-center">
                    Платформд нэгдэх
                    <ArrowRight size={20} />
                  </div>
                </ElevatedButton>
              </div>
            </div>
            <div className="rounded-t-[30px] h-auto w-full bg-primary-bg"></div>
          </div>
          <div className="bg-primary-bg h-[200px] rounded-b-[30px] rounded-tl-[30px]"></div>
        </div>
        <ConcaveCard layoutHorizontally="left" layoutVertically="top">
          <ElevatedButton className="rounded-[30px] w-full" theme="pink">
            <div className="flex gap-2 items-center justify-center whitespace-nowrap">
              <span className="whitespace-nowrap">Платформд нэгдэх</span>
              <ArrowRight size={20} />
            </div>
          </ElevatedButton>
        </ConcaveCard>
        <ConcaveCard layoutHorizontally="left" layoutVertically="bottom">
          <ElevatedButton className="rounded-[30px] w-full" theme="pink">
            <div className="flex gap-2 items-center justify-center whitespace-nowrap">
              <span className="whitespace-nowrap">Платформд нэгдэх</span>
              <ArrowRight size={20} />
            </div>
          </ElevatedButton>
        </ConcaveCard>
      </ContainerLayout>
      <ContainerLayout className="mt-20">
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
      </ContainerLayout>
    </div>
  );
}
