import Bentobox from "@/components/home/Bentobox";
import GeneralCallToAction from "@/components/home/call-to-action";
import Faq from "@/components/home/Faq";
import Hero from "@/components/landing/hero";
import Brands from "./Brands";
import BrandCycle from "./BrandCycle";

export const metadata = {
  title: "Geni | Бүтээгчид",
  description: "Geni Бүтээгчид",
};

const sections = [
  {
    title: "Бүтээгдэхүүнээ байршуул",
    context:
      "Контент бүтээгчдээс хүсэж буй контентийн мэдээллээ оруулан бүтээгдэхүүнээ нэмээрэй.",
    image: "/landing/brand/features/feature-1.png",
    colSpan: "col-span-full md:col-span-5",
    // px-6 md:px-12 md:pt-4
    imageClassName: "max-w-[140px] max-h-[140px]",
    contentClass: "pr-6 md:pr-10",
  },
  {
    title: "Хамтралын үе шатаа хяна",
    context: "Хамтран ажиллаж буй бүх явцыг хамтдаа хянана.",
    image: "/landing/brand/features/feature-2.png",
    colSpan: "col-span-full md:col-span-6",
    isReversed: true,
    imageClassName: "-mt-9 md:-mt-14",
    containerClass: "mt-4 md:mt-0",
    contentClass: "pr-6 md:pr-28 md:text-2xl md:pr-24 text-start",
  },
  {
    title: "Шинээр бүртгүүлээд үнэгүй контент ав",
    context:
      "Шинээр бүртгэл үүсгэсэн бүх брэнд үнэгүй нэг хамтрал хийн контент авах эрхтэй болно.",
    image: "/landing/brand/features/feature-3.png",
    colSpan: "col-span-full md:col-span-5",
    isReversed: true,
    imageClassName: "px-8 mt-1",
    contentClass: "pr-6 md:pr-28 md:pr-0",
  },
  {
    title: "Контент сантай болох",
    context: "Хүссэн үедээ контентуудаа татаж авч ашиглаж болно.",
    image: "/landing/brand/features/feature-4.png",
    colSpan: "col-span-full md:col-span-4",
    isReversed: true,
    imageClassName: "",
    containerClass: "px-9 pt-6",
    contentClass: "",
  },
  {
    context:
      "Хүссэн үедээ хүссэн хэмжээгээрээ хамтрал хийн контент авах боломжтой.",
    image: "/landing/brand/features/feature-5.png",
    colSpan: "col-span-full md:col-span-8",
    isReversed: true,
    imageClassName: "px-0 md:px-6",
    contentClass: "md:text-2xl text-center md:px-[10%]",
  },
  {
    title: "Контент үнэлгээ өг",
    titleClass: "pr-16 md:pr-0",
    context: "Контент бүтээгчдэд шудрага үнэглээ өгөн сайжрахад туслаарай.",
    image: "/landing/common/features/feature-3.png",
    colSpan: "col-span-full md:col-span-4",
    imageClassName: "",
    containerClass: "pt-8 pb-7",
    contentClass: "pr-16 md:pr-0",
  },
];

function Page() {
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
        logoImgSrc="/genibrand-logo.svg"
        heroImgSrc="/landing/brand/hero.png"
        title="Яг одоо үнэгүй контент авч үр дүнг бодитоор мэдрээрэй"
        description="80 гаруй бүтээгчдэд бүтээгдэхүүнээ санал болгоод хэрэглэсэн сэтгэгдэл суурьтай бүтээлч бичлэг контент хүлээн аваарай"
        btnText="Бүртгүүлэх"
        btnTheme="blue"
        path="/register/brand"
      />
      <div className="mt-24">
        <Brands />
      </div>

      <div className="mt-24">
        <BrandCycle />
      </div>
      <div className="mt-24">
        <Bentobox sections={sections} />
      </div>
      <div className="mt-24">
        <GeneralCallToAction
          headerImgSrc="/genibrand-logo.svg"
          imgSrc="/landing/brand/cta.png"
          imgClass="md:absolute md:bottom-[0.75rem] md:ml-2"
          mobileImgSrc="/landing/brand/mobile-cta.png"
          title="Тогтмол контент Тогтвортой өсөлт"
          description="Хэрэглэгчидтэйгээ бодит контентоор дамжуулан тогтвортой харилцаа үүсгэн брэндийн нэр хүнд, борлуулалтаа нэм"
          btnText="Geni Brand болох"
          btnColor="blue"
          descriptionRightPadding={-40}
          path="/register/brand"
        />
      </div>
      <div className="mt-24">
        <Faq
          title="Брэндийн түгээмэл асуултууд"
          list={[
            {
              q: "Контент хэр хугацаанд бэлэн болох вэ?",
              a: "Бүтээгдэхүүний онцлогоос хамааран тухайн бүтээгдэхүүн бүтээгчид хүргэгдсэнээс 7-10 хоногийн дотор бэлэн болно. Гоо сайхны бүтээгдэхүүнийг туршиж хэрэглэхэд харьцангуй удаан хугацаа хэрэг болдог тул дээд талдаа 10 хононо.",
            },
            {
              q: "Контент хаана байрших вэ?",
              a: "Та бүтээгчийн илгээсэн бүх контентыг чөлөөтэй татан авч өөрийн сошиал маркетингд ашиглах эрхтэй. Брэнд хүсэлтдээ тусгавал тухайн бүтээгч өөрийн хаяг дээр давхар оруулах боломжтой.",
            },
            {
              q: "Брэнд засвар хийлгэж болох уу?",
              a: "Бүтээгчийн илгээсэн бүх контентын ерөнхий чанар, аудио, текст зэрэгт платформоос 1 удаа шалгалт хийдэг бөгөөд үүний дараа брэндэд очдог. Брэнд контентыг үзээд 1 удаа, 1-3 тодорхой засвар хийлгэх хүсэлтийг бүтээгчид илгээн засуулах боломжтой.",
            },
            {
              q: "Бүтээгчид сошиал дунджаар хэр олон дагагчтай вэ?",
              a: "Geni нь influencer маркетинг харилцааг зохицуулдаггүй бөгөөд үнэн бодит хэрэглэгчидтэй холбон контент хамтрал хийдгээрээ онцлог. Тиймээс ихэнх бүтээгчид 300-1500 дагагчтай энгийн хэрэглэгчид байдаг.",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Page;
