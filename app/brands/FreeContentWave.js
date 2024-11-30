import React from "react";
import Image from "next/image";
import BecomeGeniButton from "../components/common/BecomeGeniButton";

function FreeContentWave() {
  return (
    <div className="w-full bg-[#F5F4F0] border-y-[1px] border-[#2D262D]">
      <div className="max-w-7xl container mx-auto py-14 sm:py-20 px-7 flex flex-col md:flex-row items-center gap-8">
        <div className="flex flex-col gap-4 xl:gap-8 items-center w-full md:w-1/2">
          <Image
            src={"/freecontentwave.svg"}
            width={517}
            height={241}
            alt=""
            className="max-w-[517px] max-h-[241px] w-full h-full"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 gap-4 sm:gap-5">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            ҮНЭГҮЙ КОНТЕНТ АВАХ УУ?
          </span>
          <p className="text-sm lg:text-base">
            Монгол дахь брэндүүдэд хэрэглэгчийн бүтээсэн контентын үр дүн, давуу
            талыг бодитоор мэдрүүлэх үүднээс бид зөвхөн бүтээгдэхүүнээ илгээгээд
            үнэгүй контент авах боломжийг нээж байна.
          </p>
          <BecomeGeniButton
            width={
              "aspect-[371/84] max-w-[320px] lg:max-w-[371px] lg:max-h-[84px]"
            }
            link={"https://forms.gle/EbjaLfTfRCzH4Acr8"}
            text={"Давалгаанд нэгдэх"}
            bg={"bg-[#4D55F5]"}
            framebg={"bg-[#131aaf]"}
          />
        </div>
      </div>
    </div>
  );
}

export default FreeContentWave;
