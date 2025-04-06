"use client";

import Image from "next/image";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type CallToActionProps = {
  headerImgSrc: string;
  imgSrc: string;
  title: string;
  description: string;
  btnText: string;
  btnColor: "pink" | "blue" | "green" | "orange";
  descriptionRightPadding: number;
  imgWidth?: string | number;
  imgClass?: string;
  mobileImgSrc?: string;
  path: string;
};

export default function CallToAction({
  headerImgSrc,
  imgSrc,
  title,
  description,
  btnText,
  btnColor,
  descriptionRightPadding = 0,
  imgWidth = "85%",
  imgClass,
  mobileImgSrc,
  path,
}: CallToActionProps) {
  const router = useRouter();
  const handleRoute = () => {
    router.push(path);
  };
  return (
    <div
      className="flex flex-col md:flex-row w-full mt-6 relative"
      style={{ fontSize: 0 }}
    >
      <div className="flex flex-col m-0">
        <div className="flex">
          <div className="flex flex-[8] md:flex-[9] bg-primary-bg">
            <div className="flex-1 rounded-br-[30px] bg-background p-6 pr-4 pt-4">
              <Image
                src={headerImgSrc}
                alt="call-to-action"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "95%", height: "auto" }}
              />
            </div>
          </div>
          <div className="bg-primary-bg flex-[2] md:flex-[1] rounded-t-[30px] md:rounded-tr-none md:rounded-tl-[30px] p-4 m-0" />
        </div>
        <div className="hidden md:flex flex-col pt-8 pr-0 pl-16 pb-10 bg-primary-bg flex-1 rounded-tl-[30px] md:rounded-l-[30px] relative">
          <div className="h-full w-full pt-4">
            <Image
              src={imgSrc}
              alt="call-to-action"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: imgWidth,
                height: "auto",
              }}
              className={cn("absolute bottom-10 ml-10", imgClass)}
            />
          </div>
          <div className="border-t border-black" />
        </div>
      </div>
      <div className="flex-1 flex flex-col md:pb-10 bg-primary-bg rounded-tl-[30px] md:rounded-none">
        <div className="flex flex-col h-full gap-2 md:gap-8 px-6 py-8 md:py-12 md:pl-12">
          <h2 className="md:hidden font-extrabold text-4xl">{title}</h2>
          <div className="hidden md:block md:h-[3rem]">
            <h2 className="font-extrabold text-3xl md:text-5xl absolute">
              {title}
            </h2>
          </div>
          <p
            className={cn(
              "text-2xl md:text-2xl",
              descriptionRightPadding && `md:pr-[${descriptionRightPadding}px]`
            )}
            // style={{ paddingRight:  }}
          >
            {description}
          </p>
        </div>
        <div className="hidden md:block border-t border-black mr-10" />
      </div>
      <div className="md:hidden px-9 pb-8 rounded-b-[30px] bg-primary-bg">
        <div className="flex flex-col gap-12">
          <div className="h-full w-full pt-1">
            <Image
              src={mobileImgSrc || imgSrc}
              alt="call-to-action"
              width={0}
              height={0}
              sizes="100vw"
              className={cn("w-full h-auto", imgClass)}
            />
          </div>
          <ElevatedButton
            className="w-full border-black/55 px-3"
            theme={btnColor}
            onClick={handleRoute}
          >
            <div className="flex gap-2 items-center justify-center">
              <span className="whitespace-nowrap text-lg md:text-2xl font-bold">
                {btnText}
              </span>
              <ArrowRight size={24} />
            </div>
          </ElevatedButton>
        </div>
      </div>
      <div className="hidden md:flex flex-col">
        <div className="flex flex-1">
          <div className="p-4 pl-0 bg-primary-bg flex-1 rounded-r-[30px]" />
        </div>
        <div className="flex">
          <div className="bg-primary-bg flex-[1] rounded-br-[30px] p-4 m-0" />
          <div className="flex flex-grow bg-primary-bg  ">
            <div className="flex-1 rounded-tl-[30px] bg-background p-6 pl-8 pb-0 pr-1">
              <ElevatedButton
                className="w-full border-black/55 pl-12"
                theme={btnColor}
                onClick={handleRoute}
              >
                <div className="flex gap-2 items-center justify-center whitespace-nowrap">
                  <span className="whitespace-nowrap text-lg md:text-2xl font-bold">
                    {btnText}
                  </span>
                  <ArrowRight size={24} />
                </div>
              </ElevatedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
