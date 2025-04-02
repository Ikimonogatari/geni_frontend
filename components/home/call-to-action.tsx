import Image from "next/image";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";

type CallToActionProps = {
  headerImgSrc: string;
  imgSrc: string;
  title: string;
  description: string;
  btnText: string;
  btnColor: "pink" | "blue" | "green" | "orange";
  offset: number;
  descriptionRightPadding: number;
  imgWidth?: string | number;
  imgLeftMargin?: string | number;
};

export default function CallToAction({
  headerImgSrc,
  imgSrc,
  title,
  description,
  btnText,
  btnColor,
  offset,
  descriptionRightPadding = 0,
  imgWidth = "85%",
  imgLeftMargin = "2.5rem",
}: CallToActionProps) {
  return (
    <div className="flex w-full mt-6 relative" style={{ fontSize: 0 }}>
      <div className="flex flex-col m-0">
        <div className="flex">
          <div className="flex flex-grow bg-primary-bg">
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
          <div className="bg-primary-bg flex-[1] rounded-tl-[30px] p-4 m-0" />
        </div>
        <div className="flex flex-col pt-8 pr-0 pl-16 pb-10 bg-primary-bg flex-1 rounded-l-[30px] relative">
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
                bottom: 40 + offset,
                marginLeft: imgLeftMargin,
              }}
              className="absolute"
            />
          </div>
          <div className="border-t border-black" />
        </div>
      </div>
      <div className="flex-1 flex flex-col pb-10 bg-primary-bg">
        <div className="flex flex-col h-full gap-8 pt-12 pl-12 pb-12">
          <div className="h-[3rem]">
            <h2 className="font-extrabold text-5xl absolute">{title}</h2>
          </div>
          <p
            className="text-2xl"
            style={{ paddingRight: descriptionRightPadding }}
          >
            {description}
          </p>
        </div>
        <div className="border-t border-black mr-10" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-1">
          <div className="p-4 pl-0 bg-primary-bg flex-1 rounded-r-[30px]" />
        </div>
        <div className="flex">
          <div className="bg-primary-bg flex-[1] rounded-br-[30px] p-4 m-0" />
          <div className="flex flex-grow bg-primary-bg  ">
            <div className="flex-1 rounded-tl-[30px] bg-background p-6 pl-8 pb-0 pr-1">
              <ElevatedButton
                className="rounded-[30px] w-full border-black/55 pl-12"
                theme={btnColor}
              >
                <div className="flex gap-2 items-center justify-center whitespace-nowrap">
                  <span className="whitespace-nowrap text-2xl font-bold">
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
