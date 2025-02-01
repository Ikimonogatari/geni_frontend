import HomeAlumniBrand from "@/components/home/HomeAlumniBrand";
import HomeAlumniCreator from "@/components/home/HomeAlumniCreator";
import HomeBecomeCreator from "@/components/home/HomeBecomeCreator";
import HomeBecomeGeniBrand from "@/components/home/HomeBecomeGeniBrand";
import HomeCycle from "@/components/home/HomeCycle";
import HomeHero from "@/components/home/HomeHero";
import HomeAlumniLayout from "@/components/home/layout/HomeAlumniLayout";
import HomeBecomeGeniSectionLayout from "@/components/home/layout/HomeBecomeGeniSectionLayout";

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
