import Image from "next/image";
import HomeHero from "./components/home/HomeHero";
import HomeCycle from "./components/home/HomeCycle";
import HomeBecomeCreator from "./components/home/HomeBecomeCreator";
import HomeBecomeGeniBrand from "./components/home/HomeBecomeGeniBrand";
import HomeBecomeGeniSectionLayout from "./components/home/layout/HomeBecomeGeniSectionLayout";
import HomeAlumniLayout from "./components/home/layout/HomeAlumniLayout";
import HomeAlumniCreator from "./components/home/HomeAlumniCreator";
import HomeAlumniBrand from "./components/home/HomeAlumniBrand";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="mt-32">
        <HomeHero />
        <HomeCycle />
        <HomeBecomeGeniSectionLayout>
          <HomeBecomeCreator />
        </HomeBecomeGeniSectionLayout>
        <HomeAlumniLayout>
          <HomeAlumniCreator />
        </HomeAlumniLayout>
        <HomeBecomeGeniSectionLayout>
          <HomeBecomeGeniBrand />
        </HomeBecomeGeniSectionLayout>
        <HomeAlumniLayout>
          <HomeAlumniBrand />
        </HomeAlumniLayout>
        <div className="w-full px-7 py-6 sm:py-10 lg:py-20 flex flex-row justify-center items-center gap-3 sm:gap-8 bg-[#2D262D]">
          <Image
            src={"/comingsoon-icon.png"}
            width={151}
            height={152}
            alt="coming-soon"
            className="max-w-[54px] max-h-[54px] sm:max-w-[151px] sm:max-h-[152px]"
          />
          <span className="text-sm sm:text-xl lg:text-3xl font-normal sm:font-bold text-white">
            Платформ Тун Удахгүй...
          </span>
        </div>
      </div>
    </main>
  );
}
