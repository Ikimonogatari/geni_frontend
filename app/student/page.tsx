import Bentobox from "@/components/home/Bentobox";
import GeneralCallToAction from "@/components/home/call-to-action";
import Faq from "@/components/home/Faq";
import Hero from "@/components/landing/hero";
import Features from "./_components/features";
import Testimonials from "@/components/home/Testimonials";
import Cycle from "./_components/cycle";

export const metadata = {
  title: "Geni | Бүтээгчид",
  description: "Geni Бүтээгчид",
};

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
        logoImgSrc="/genistudent-logo.svg"
        heroImgSrc="/landing/student/hero.png"
        title="Өөрийн хурдаар онлайнаар контент бүтээх чадварт суралц"
        description="UGC контент бүтээх чадварт суралцангаа эхний брэнд хамтралаа хийж төгсөөд Geni certified бүтээгч болоорой."
        btnText="Бүртгүүлэх"
        btnTheme="green"
        path="/register/student"
      />

      <div className="mt-24">
        <Features />
      </div>
      <div className="mt-24">
        <Testimonials
          testimonials={[
            {
              text: "“Geni бол үнэхээр цаг үеэ олсон сургалтын платформ. Контент бүтээгчдийн хувьд сурч хөгжих, олон олон шинэ хамтралуудыг бий болгоход туслах цогц систем, маш гоё боломжийг олгож байгаа орон зай гэж харж байгаа.”",
              name: "Ugc_ukana",
              position: "Geni Student",
              image: "/landing/common/testimonials/5.png",
            },
            {
              text: "“Би цаашид UGC контент бүтээгчээрээ тогтмол ажиллаж зах зээлд influencer хүмүүсээс илүү үнэ цэнтэй ашигтай маркетинг хийхийг хүсэж байгаа.”",
              name: "Lkhamaa",
              position: "Geni Student",
              image: "/landing/common/testimonials/6.png",
            },
            {
              text: "“Geni Creator Program cуурыг маань маш зөв цэгцтэй ойлгомжтой тавьж өгсөн, мөн цаашид сайт нь улам өргөжиж, олон байгууллагуудтай хамтарaхад тусална гэдэгт итгэлтэй байна.”",
              name: "Oyu",
              position: "Geni Student",
              image: "/landing/common/testimonials/7.png",
            },
            {
              text: "“Geni хөтөлбөрийн ачаар өөрийн тухтай зоноосоо гарч чадсан. Контент хийх хүслийг минь улам дүрэлзүүлсэн.”",
              name: "Purevjav",
              position: "Geni Student",
              image: "/landing/common/testimonials/8.png",
            },
            {
              text: "“Контент хийхийн хэцүү талуудыг мэдэрч байгаа ч миний бичлэгийг үзээд хүмүүст ямар санагдах бол гэсэн догдлол, нэг хийгээд суухаар цаг өнгөрч байгааг мэдрэхгүй орчноосоо тасрах нь нэг төрлийн бясалгал шиг санагддаг.”",
              name: "Нүргүл",
              position: "Geni Student",
              image: "/landing/common/testimonials/9.png",
            },
          ]}
        />
      </div>
      <div className="mt-24">
        <Cycle />
      </div>
      <div className="mt-24">
        <GeneralCallToAction
          headerImgSrc="/genistudent-logo.svg"
          imgSrc="/landing/student/cta.png"
          imgClass="lg:absolute lg:bottom-[2.125rem] lg:ml-2"
          mobileImgSrc="/landing/student/mobile-cta.png"
          title="Контент бүтээх чадварт суралц "
          description="Өөрийн хурдаар онлайнаар суралцангаа хамтрал хийн туршлага хуримтлуулж, Geni Certified Creator болоорой."
          btnText="Geni Student болох"
          btnColor="green"
          descriptionRightPadding={-40}
          path="/register/student"
        />
      </div>
      <div className="mt-24">
        <Faq
          title="Сурагчдын түгээмэл асуултууд"
          list={[
            {
              q: "Хөтөлбөрт юу юу заах вэ?",
              a: "Хөтөлбөр энгийн хэрэглэгчийг платформ дээр брэндтэй хамтрах эрхтэй бүтээгч болгон бэлтгэх зорилготой. Онлайн хичээлүүдэд UGC зах зээлийн танилцуулга, UGC бүтээгч болоход хэрэгтэй ойлголт заавар мэдээллүүд, UGC контентын төрлүүд, контент агуулга гаргах, бүтээх үе шат, контент эдит хийх Capcut, Canva платформ ашиглах дунд түвшний заавар, сошиал хаягаа эхлүүлэн амжилттай хөтлөх зөвлөгөө болон нэмэлт бонус хичээлүүд багтсан. Бүх хичээл бэлэн, онлайнаар өөрийн хурдаар үзэж дуусгах зориулалттай.",
            },
            {
              q: "Сурах явцдаа брэндтэй хамтрах уу?",
              a: "Хамтарна. Онлайн хичээлээ үзээд 1 даалгавар контент хийн илгээж, платформоос зөвлөгөө авч засаж, сайжруулсны дараа эхний брэндтэй хамтрах эрх шууд нээгдэнэ. Та эхний брэндтэйгээ хамтран брэндээс 80с дээш оноо авсан тохиолдолд certified хаягтай бүтээгч болно.",
            },
            {
              q: "Certified бүтээгч болох шалгуур юу вэ?",
              a: "Та хөтөлбөрт хамрагдах хугацаандаа 1 даалгавар амжилттай илгээн, 1 брэндтэй хамтран 80с дээш оноо авах хэрэгтэй. Ингэснээр таны сурагчийн хаяг certified хаяг болно.",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Page;
