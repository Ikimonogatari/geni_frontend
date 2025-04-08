import ContainerLayout from "../ui/container-layout";
import CallToAction from "./call-to-action";

function Banners() {
  return (
    <ContainerLayout className="flex flex-col gap-5 mb-28 md:mb-0">
      {banners.map((banner) => (
        <CallToAction key={banner.title} {...banner} />
      ))}
    </ContainerLayout>
  );
}

export default Banners;

const banners: {
  headerImgSrc: string;
  imgSrc: string;
  title: string;
  description: string;
  btnText: string;
  btnColor: "pink" | "blue" | "green" | "orange";
  descriptionRightPadding: number;
  imgWidth?: number | string;
  imgClass?: string;
  mobileImgSrc: string;
  path: string;
}[] = [
  {
    headerImgSrc: "/genicreator-logo.svg",
    imgSrc: "/landing/creator/cta.png",
    mobileImgSrc: "/landing/creator/mobile-cta.png",
    title: "Чадвараа сорь",
    description:
      "Шууд брэндтэй хамтрах эрхтэй Geni certified creator болж хамтрал бүрээс нэмэлт урамшуулал авч эхэл.",
    btnText: "Geni Creator болох",
    btnColor: "pink",
    descriptionRightPadding: 0,
    path: "/creator",
  },
  {
    headerImgSrc: "/genibrand-logo.svg",
    imgSrc: "/landing/brand/cta.png",
    mobileImgSrc: "/landing/brand/mobile-cta.png",
    title: "Бүтээгдэхүүнээ илгээ",
    description:
      "Бүтээгчидтэй тогтмол хамтрал хийж илүү хялбар, үр дүнтэй маркетинг хийж эхэл.",
    btnText: "Geni Brand болох",
    btnColor: "blue",
    descriptionRightPadding: 112,
    imgClass: "bottom-0 md:bottom-[13px] ml-0 md:ml-2",
    path: "/brand",
  },
  {
    headerImgSrc: "/genistudent-logo.svg",
    imgSrc: "/landing/student/cta.png",
    mobileImgSrc: "/landing/student/mobile-cta.png",
    title: "Контент бүтээх чадварт суралц",
    description:
      "Өөрийн хурдаар онлайнаар суралцангаа хамтрал хийн туршлага хуримтлуулж, Geni Certified Creator болоорой.",
    btnText: "Geni Student болох",
    btnColor: "green",
    descriptionRightPadding: 32,
    imgWidth: "75%",
    imgClass: "md:bottom-[35px]",
    path: "/student",
  },

  {
    headerImgSrc: "/genimentor-logo.svg",
    imgSrc: "/landing/mentor/cta.png",
    mobileImgSrc: "/landing/mentor/mobile-cta.png",
    title: "Чадварлаг бүтээгчдээс суралц",
    description:
      "Чадварлаг бүтээгдчийн онлайн хичээлээс суралцан илүү өндөр үнэлгээтэй бүтээгч болоорой.",
    btnText: "Geni Mentor тухай",
    btnColor: "orange",
    imgClass: "md:bottom-[25px]",
    descriptionRightPadding: 64,
    imgWidth: "75%",
    path: "/mentor",
  },
];
