import React from "react";
import ContainerLayout from "../ui/container-layout";
import Image from "next/image";

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

const Bentobox: React.FC<BentoBoxProps> = ({ sections }) => {
  return (
    <ContainerLayout className="grid grid-cols-[repeat(14,_minmax(0,_1fr))] items-stretch gap-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`${section.colSpan} ${section.colLayoutClassName} flex ${
            section.isReversed ? "flex-col-reverse" : "flex-col"
          } items-center justify-between p-10 rounded-3xl bg-primary-bg border border-primary`}
        >
          {section.context && (
            <div className="flex flex-col gap-2">
              {section.title && (
                <span className="text-3xl font-bold">{section.title}</span>
              )}
              <span className="text-lg">{section.context}</span>
            </div>
          )}
          <Image
            src={section.image}
            alt=""
            width={220}
            height={164}
            className={section.imageClassName}
          />
        </div>
      ))}
    </ContainerLayout>
  );
};

export default Bentobox;
