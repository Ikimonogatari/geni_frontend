import Image from "next/image";
import HomeHero from "@/components/home/HomeHero";
import HomeCycle from "@/components/home/HomeCycle";
import HomeBecomeCreator from "@/components/home/HomeBecomeCreator";
import HomeBecomeGeniBrand from "@/components/home/HomeBecomeGeniBrand";
import HomeBecomeGeniSectionLayout from "@/components/home/layout/HomeBecomeGeniSectionLayout";
import HomeAlumniLayout from "@/components/home/layout/HomeAlumniLayout";
import HomeAlumniCreator from "@/components/home/HomeAlumniCreator";
import HomeAlumniBrand from "@/components/home/HomeAlumniBrand";

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
      </div>
    </main>
  );
}
