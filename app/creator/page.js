import Bentobox from "@/components/home/Bentobox";
import GeneralCallToAction from "@/components/home/call-to-action";
import Faq from "@/components/home/Faq";
import Hero from "@/components/landing/hero";
import CompetitionBoard from "./_components/competition-board";
import CallToAction from "./_components/cta";
import FeaturedProductList from "./_components/featured-product-list";
import CreatorCycle from "./CreatorCycle";
import Creators from "./Creators";

export const metadata = {
  title: "Geni | Бүтээгчид",
  description: "Geni Бүтээгчид",
};

const sections = [
  {
    title: "Сар бүрийн уралдаан",
    context:
      "Сар бүр платформ дээр зохиогддог уралдаан оролцож шагналын эзэн болох боломж.",
    image: "/landing/common/competition/features/feature-1.png",
    colSpan: "col-span-full md:col-span-5",
    imageClassName: "px-6 md:px-12 md:pt-4",
    contentClass: "pr-6 md:pr-10",
  },
  {
    title: "Хамтралын үе шатаа хяна",
    context: "Хамтран ажиллаж буй бүх явцыг хамтдаа хянана.",
    image: "/landing/common/competition/features/feature-2.png",
    colSpan: "col-span-full md:col-span-6",
    isReversed: true,
    imageClassName: "-mt-9 md:-mt-14",
    containerClass: "mt-4 md:mt-0",
    contentClass: "pr-6 md:pr-28 md:text-2xl md:pr-24 text-start",
  },
  {
    title: "Контентоо илгээж үнэлгээ ав",
    context: "Брэнд контент бүтээгчийг үнэлэх систем.",
    image: "/landing/common/features/feature-3.png",
    colSpan: "col-span-full md:col-span-5",
    isReversed: true,
    imageClassName: "px-8 mt-1",
    contentClass: "pr-6 md:pr-28 md:pr-0",
  },
  {
    title: "Контент зөвлөгөө авах",
    context: "Платформоос зөвлөгөө авж контентоо сайжруулах боломж.",
    image: "/landing/common/features/feature-4.png",
    colSpan: "col-span-full md:col-span-4",
    isReversed: true,
    imageClassName: "",
    containerClass: "px-9 pt-6",
    contentClass: "",
  },
  {
    context:
      "Хамтрал бүрээсээ Контент бүтээгчид оноо цуглуулан түвшнээ ахиулж илүү их орлого олох систем.",
    image: "/landing/common/features/feature-5.png",
    colSpan: "col-span-full md:col-span-8",
    isReversed: true,
    imageClassName: "px-0 md:px-6",
    contentClass: "md:text-2xl text-center md:px-[10%]",
  },
  {
    title: "Мөнгөн орлогоо тат",
    titleClass: "pr-16 md:pr-0",
    context: "Контент бүтээгч өөрийн орлогоо хүссэн үедээ татан авч ашиглана.",
    image: "/landing/common/features/feature-6.png",
    colSpan: "col-span-full md:col-span-4",
    imageClassName: "",
    containerClass: "pt-8 pb-7",
    contentClass: "pr-16 md:pr-0",
  },
];

function creators() {
  return (
    // <div className="min-h-screen w-full bg-white text-[#2D262D]">
    //   <div className="mt-[96px] sm:mt-[136px] md:mt-[152px]">
    //     <div className="container px-7 max-w-7xl mx-auto pt-12 sm:pt-20">
    //       <CreatorLogo />
    //       <CreatorHero />
    //       <CreatorCycle />
    //       <Creators />
    //       <CreatorAlumni />
    //       <MonthlyCompetitionLayout />
    //       {/* <BecomeCreatorBanner /> */}
    //     </div>
    //     <BecomeCreatorSection />
    //     <CertifiedCreatorBenefits />
    //     <CreatorBenefits />
    //   </div>
    // </div>
    <div className="container my-16 lg:my-28 px-5 lg:px-8">
      <Hero
        logoImgSrc="/genicreator-logo.svg"
        heroImgSrc="/landing/creator/hero.png"
        title="Бүтээ, Хөгж, Орлогоо нэм"
        description="Хөтөлбөрт хамрагдахгүйгээр контент бүтээх чадвараа сориод платформ дээрх брэндүүдтэй шууд хамтрах эрхтэй Geni Certfied Creator бол"
        btnText="Өргөдөл илгээх"
        btnTheme="pink"
        path="/apply"
      />
      <div className="mt-24">
        <Creators />
      </div>
      <div className="mt-24">
        <FeaturedProductList />
      </div>
      <div className="mt-24">
        <CallToAction />
      </div>
      <div className="mt-24">
        <CreatorCycle />
      </div>
      <div className="mt-40">
        <CompetitionBoard />
      </div>
      <div className="mt-24">
        <Bentobox sections={sections} />
      </div>
      <div className="mt-24">
        <GeneralCallToAction
          headerImgSrc="/genicreator-logo.svg"
          imgSrc="/landing/creator/cta.png"
          mobileImgSrc="/landing/creator/mobile-cta.png"
          title="Чадвараа сориод"
          description="Шууд брэндтэй хамтрах эрхтэй Geni certified creator болж хамтрал бүрээс нэмэлт урамшуулал авч эхэл."
          btnText="Өргөдөл илгээх"
          btnColor="pink"
          descriptionRightPadding={0}
          path="/apply"
        />
      </div>
      <div className="mt-24">
        <Faq
          title="Бүтээгчдийн түгээмэл асуултууд"
          list={[
            {
              q: "Брэндтэй ямар нөхцөлөөр, яаж хамтардаг вэ?",
              a: "Certified бүтээгчид брэндийн санал болгосон бүтээгдэхүүнээс үнэгүй сонгон авч хэрэглэсэн сэтгэгдлээ контентоор дамжуулан илгээдэг. Олон брэндтэй хамтран тодорхой оноо цуглуулж туршлагатай болсон бүтээгчид Pro түвшинд шилждэг бөгөөд цаашид хамтрал болгоны чанараас хамааран нэмэлт мөнгөн урамшуулал авдаг.",
            },
            {
              q: "Pro бүтээгч болохын давуу тал юу вэ?",
              a: "Certified бүтээгч нэг дор 1 хамтрал хийн түүнийгээ амжилттай дуусгасны дараа ахин хамтрал хийх эрх нээгддэг бол Pro бүтээгчид зэрэг 2 ба түүнээс хамтрал хийх боломжтой байдаг. Мөн PRO түвшин ахих тусам хамтралын онооноос авах мөнгөн урамшуулал өснө.",
            },
            {
              q: "Яаж Pro бүтээгч болдог вэ?",
              a: "Брэнд бүтээгчийн илгээсэн контентыг үзээд 0-100н хооронд сэтгэл ханамжийн үнэлгээ өгдөг. Энэхүү үнэлгээ нь XP оноо болж бүтээгчид хуримтлагддаг бөгөөд 1000 XP оноо цуглуулан эхний түвшний Pro бүтээгч болно.",
            },
            {
              q: "Хэзээнээс мөнгөн урамшуулал авч эхлэх боломжтой вэ?",
              a: "Бүтээгч Pro түвшинтэй болсноос эхлэн хамтрал бүрийн оноод харгалзах мөнгөн урамшууллыг өөрийн дижитал хэтэвчинд авдаг. Та урамшууллаа өөрийн хэтэвчнээс сар болгоны эхний 7 хоногт  өөрийн данс руу татах боломжтой.",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default creators;
