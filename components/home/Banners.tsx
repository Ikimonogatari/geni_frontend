import ContainerLayout from "../ui/container-layout";
import CallToAction from "./call-to-action";

function Banners() {
  return (
    <ContainerLayout className="flex flex-col gap-5">
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
  offset: number;
  descriptionRightPadding: number;
  imgWidth?: number | string;
  imgLeftMargin?: number | string;
}[] = [
  {
    headerImgSrc: "/genicreator-logo.svg",
    imgSrc: "/landing/creator/cta.png",
    title: "Чадвараа сорь",
    description:
      "Шууд брэндтэй хамтрах эрхтэй Geni certified creator болж хамтрал бүрээс нэмэлт урамшуулал авч эхэл.",
    btnText: "Geni Creator болох",
    btnColor: "pink",
    offset: 0,
    descriptionRightPadding: 0,
  },
  {
    headerImgSrc: "/genibrand-logo.svg",
    imgSrc: "/landing/brand/cta.png",
    title: "Бүтээгдэхүүнээ илгээ",
    description:
      "Бүтээгчидтэй тогтмол хамтрал хийж илүү хялбар, үр дүнтэй маркетинг хийж эхэл.",
    btnText: "Geni Brand болох",
    btnColor: "blue",
    offset: -27,
    descriptionRightPadding: 112,
    imgLeftMargin: "0.5rem",
  },
  {
    headerImgSrc: "/genistudent-logo.svg",
    imgSrc: "/landing/student/cta.png",
    title: "Контент бүтээх чадварт суралц",
    description:
      "Өөрийн хурдаар онлайнаар суралцангаа хамтрал хийн туршлага хуримтлуулж, Geni Certified Creator болоорой.",
    btnText: "Geni Student болох",
    btnColor: "green",
    offset: -5,
    descriptionRightPadding: 32,
    imgWidth: "75%",
  },

  {
    headerImgSrc: "/genimentor-logo.svg",
    imgSrc: "/landing/mentor/cta.png",
    title: "Чадварлаг бүтээгчдээс суралц",
    description:
      "Чадварлаг бүтээгдчийн онлайн хичээлээс суралцан илүү өндөр үнэлгээтэй бүтээгч болоорой.",
    btnText: "Geni Mentor тухай",
    btnColor: "orange",
    offset: -15,
    descriptionRightPadding: 64,
    imgWidth: "75%",
  },
];
