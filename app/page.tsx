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
      <div className="container mt-10 px-5 md:px-10">
        <HomeHero />
        <ShowCase />
        <Statistics />
        <Events />
        <Banners />
        <Bentobox
          sections={[
            {
              title: "Хамтрал эхлүүл",
              context:
                "Брэнд болон контент бүтээгчид хүссэн үедээ хамгийн хялбараар хамтрана.",
              image: "/landing/common/features/feature-1.png",
              colSpan: "col-span-full md:col-span-5",
              imageClassName: "px-6 md:px-12 md:pt-4",
              contentClass: "pr-6 md:pr-10",
            },
            {
              title: "Хамтралын үе шатаа хяна",
              context: "Хамтран ажиллаж буй бүх явцыг хамтдаа хянана.",
              image: "/landing/common/features/feature-2.png",
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
              context:
                "Контент бүтээгч өөрийн орлогоо хүссэн үедээ татан авч ашиглана.",
              image: "/landing/common/features/feature-6.png",
              colSpan: "col-span-full md:col-span-4",
              imageClassName: "",
              containerClass: "pt-8 pb-7",
              contentClass: "pr-16 md:pr-0",
            },
          ]}
        />
        <Testimonials
          testimonials={[
            {
              text: "“Жаахан хүүхдээ харангаа гэрээсээ онлайнаар, дуртай бүтээгдэхүүнээ үнэгүй авч, контентоор хуваалцаад тухайн брэндээ дэмжиж, түгээж байгаагаа мэдэх урамтай байдаг.”",
              name: "Urtnasan Batsukh",
              position: "Geni Student",
              image: "/landing/common/testimonials/1.png",
            },
            {
              text: "“Ad creative-ийн хувьд худалдан авалтад хамгийн их нөлөөлдөг хэлбэр нь UGC гэж боддог. Монгол залуус маань энэ шинэ төрлийн ad creative-ийн онцгой ач холбогдлыг олж харж Монголынхоо бизнесүүдэд санал болгож, нэвтрүүлж байгаад нь үнэхээр сайшаалтай байгаа.”",
              name: "Erkhbayar M",
              position: "Founder of Titem brand",
              image: "/landing/common/testimonials/2.png",
              type: "brand",
            },
            {
              text: "“Сэтгэл шингээж хийсэн бүтээгдэхүүнийг маань бодит хэрэглэгчид бидний өмнөөс танилцуулж, хайрлаж байгаа бодит контентууд харах үнэхээр урамтай байдаг.”",
              name: "Khulan Davaadorj",
              position: "Founder of Lhamour brand",
              image: "/landing/common/testimonials/3.png",
              type: "brand",
            },
            {
              text: "“Та бүхэнтэй хамтран ажиллах хугацаанд үр дүн өндөр, хүлээлтээс давсан контентууд хүлээн авсан, урт хугацаанд хамтран ажиллах хүсэлтэй байна.”",
              name: "Saruul Ts",
              position: "Brand manager of eMonos",
              image: "/landing/common/testimonials/4.png",
              type: "brand",
            },
          ]}
        />
      </div>
    </>
  );
}
