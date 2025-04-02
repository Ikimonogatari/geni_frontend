import Banners from "@/components/home/Banners";
import Bentobox from "@/components/home/Bentobox";
import Events from "@/components/home/Events";
import Faq from "@/components/home/Faq";
import HomeHero from "@/components/home/HomeHero";
import ShowCase from "@/components/home/ShowCase";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <div className="container mt-10 px-10">
        <HomeHero />
        <ShowCase />
        <Statistics />
        <Events />
        <Banners />
        <Bentobox />
        {/* <Faq /> */}
        <Testimonials />
      </div>
    </>
  );
}
