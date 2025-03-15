import React from "react";
import ContainerLayout from "../ui/container-layout";
import ConcaveCard from "../common/ConcaveCard";
import Image from "next/image";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";

function Banners() {
  return (
    <ContainerLayout className="flex flex-col gap-5">
      {banners.map((banner, index) => (
        <ConcaveCard
          key={index}
          layoutHorizontally="left"
          layoutVertically="top"
          context={
            <div className="flex flex-col gap-10">
              <h1 className="font-extrabold text-5xl">{banner.title}</h1>
              <span className="text-xl">{banner.content}</span>
            </div>
          }
          image={banner.image}
          addImage={banner.addImage}
        >
          <Image
            src={banner.logo}
            alt=""
            width={317}
            height={44}
            className="w-[317px] h-[44px]"
          />
          <ElevatedButton
            className="rounded-[30px] w-full"
            theme={banner.theme as "pink" | "orange" | "blue" | "green"}
          >
            <div className="flex gap-2 items-center justify-center whitespace-nowrap">
              <span className="whitespace-nowrap">Платформд нэгдэх</span>
              <ArrowRight size={20} />
            </div>
          </ElevatedButton>
        </ConcaveCard>
      ))}
    </ContainerLayout>
  );
}

export default Banners;

const banners = [
  {
    image: {
      src: `/landing/banner-creator-image.png`,
      size: "w-[241px] h-[165px]",
    },
    addImage: { src: `/landing/banner-image1.png`, size: "w-[50px] h-[30px]" },
    logo: "/genicreator-logo.svg",
    title: "Чадвараа сорь",
    content:
      "Шууд брэндтэй хамтрах эрхтэй Geni certified creator болж хамтрал бүрээс нэмэлт урамшуулал авч эхэл.",
    theme: "pink",
  },
  {
    image: {
      src: `/landing/banner-brand-image.png`,
      size: "w-[281px] h-[229px]",
    },
    addImage: { src: `/landing/banner-image2.png`, size: "w-[50px] h-[58px]" },
    logo: "/genibrand-logo.svg",
    title: "Бүтээгдэхүүнээ илгээ",
    content:
      "Бүтээгчидтэй тогтмол хамтрал хийж илүү хялбар, үр дүнтэй маркетинг хийж эхэл.",
    theme: "blue",
  },
  {
    image: {
      src: `/landing/banner-student-image.png`,
      size: "w-[302px] h-[194px]",
    },
    logo: "/genistudent-logo.svg",
    title: "Контент бүтээх чадварт суралц ",
    content:
      "Өөрийн хурдаар онлайнаар суралцангаа хамтрал хийн туршлага хуримтлуулж, Geni Certified Creator болоорой.",
    theme: "green",
  },
  {
    image: {
      src: `/landing/banner-mentor-image.png`,
      size: "w-[191px] h-[196px]",
    },
    addImage: { src: `/landing/banner-image4.png`, size: "w-[34px] h-[143px]" },
    logo: "/genimentor-logo.svg",
    title: "Чадварлаг бүтээгчдээс суралц",
    content:
      "Чадварлаг бүтээгдчийн онлайн хичээлээс суралцан илүү өндөр үнэлгээтэй бүтээгч болоорой.",
    theme: "orange",
  },
];
