import React from "react";
import ContainerLayout from "../ui/container-layout";
import Image from "next/image";
import clsx from "clsx";
import { cn } from "@/lib/utils";

interface BentoBoxProps {
  sections: {
    title?: string;
    context?: string;
    image: string;
    colSpan: string;
    colLayoutClassName?: string;
    imageClassName?: string;
    isReversed?: boolean;
  }[];
}

const sections = [
  {
    title: "Хамтрал эхлүүл",
    context:
      "Брэнд болон контент бүтээгчид хүссэн үедээ хамгийн хялбараар хамтрана.",
    image: "/landing/common/features/feature-1.png",
    colSpan: "col-span-5",
    imageClassName: "px-12 pt-4",
    contentClass: "pr-10",
  },
  {
    title: "Хамтралын үе шатаа хяна",
    context: "Хамтран ажиллаж буй бүх явцыг хамтдаа хянана.",
    image: "/landing/common/features/feature-2.png",
    colSpan: "col-span-6",
    isReversed: true,
    imageClassName: "-mt-14",
    contentClass: "text-2xl pr-24 text-start",
  },
  {
    title: "Контентоо илгээж үнэлгээ ав",
    context: "Брэнд контент бүтээгчийг үнэлэх систем",
    image: "/landing/common/features/feature-3.png",
    colSpan: "col-span-5",
    isReversed: true,
    imageClassName: "px-8 mt-1",
  },
  {
    title: "Контент зөвлөгөө авах",
    context: "Платформоос зөвлөгөө авж контентоо сайжруулах боломж.",
    image: "/landing/common/features/feature-4.png",
    colSpan: "col-span-4",
    isReversed: true,
    imageClassName: "",
    containerClass: "px-9 pt-6",
    contentClass: "",
  },
  {
    context:
      "Хамтрал бүрээсээ Контент бүтээгчид оноо цуглуулан түвшнээ ахиулж илүү их орлого олох систем.",
    image: "/landing/common/features/feature-5.png",
    colSpan: "col-span-8",
    isReversed: true,
    imageClassName: "px-6",
    contentClass: "text-2xl text-center px-[10%]",
  },
  {
    title: "Мөнгөн орлогоо тат",
    context: "Контент бүтээгч өөрийн орлогоо хүссэн үедээ татан авч ашиглана.",
    image: "/landing/common/features/feature-6.png",
    colSpan: "col-span-4",
    imageClassName: "",
    containerClass: "pt-8 pb-7",
  },
];

const Bentobox = () => {
  return (
    <ContainerLayout className="grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-center justify-between gap-4 p-10 rounded-3xl bg-primary-bg border border-border-gray/60 relative",
            section.colSpan,
            section.isReversed ? "flex-col-reverse" : "flex-col",
            section.containerClass
          )}
        >
          {section.context && (
            <div className="flex flex-col gap-2">
              {section.title && (
                <h2 className="text-3xl font-bold">{section.title}</h2>
              )}
              <p className={cn("text-lg leading-none", section?.contentClass)}>
                {section.context}
              </p>
            </div>
          )}
          <Image
            src={section.image}
            alt="img"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className={clsx("", section.imageClassName)}
          />
        </div>
      ))}
    </ContainerLayout>
  );
};

export default Bentobox;
