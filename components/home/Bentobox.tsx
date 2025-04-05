import React from "react";
import ContainerLayout from "../ui/container-layout";
import Image from "next/image";
import clsx from "clsx";
import { cn } from "@/lib/utils";

const Bentobox = ({ sections }: any) => {
  return (
    <ContainerLayout className="grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-y-6 md:gap-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-center justify-between gap-4 p-6 md:p-10 rounded-3xl bg-primary-bg border border-border-gray/60 relative",
            section.colSpan,
            section.isReversed ? "flex-col-reverse" : "flex-col",
            section.containerClass
          )}
        >
          {section.context && (
            <div className="flex flex-col gap-2">
              {section.title && (
                <h2 className={cn("text-3xl font-bold", section?.titleClass)}>
                  {section.title}
                </h2>
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
