import React from "react";
import Image from "next/image";

function FreeContentWave() {
  return (
    <div className="w-full bg-[#F5F4F0] border-y-[1px] border-[#2D262D]">
      <div className="max-w-7xl container mx-auto py-14 sm:py-20 px-7 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex flex-col gap-4 sm:gap-8 items-center w-full lg:w-1/2">
          <Image
            src={"/freecontentwave.svg"}
            width={517}
            height={241}
            alt=""
            className="max-w-[517px] max-h-[241px] w-full h-full"
          />
          <span className="text-base sm:text-lg">
            Давалгаанд нэгдэх брэндүүдийн хүсэлт авах хугацаа:
          </span>
          <span className="text-xl sm:text-3xl font-bold">10.15 - 10.31</span>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <span className="text-3xl sm:text-4xl font-bold">
            ҮНЭГҮЙ КОНТЕНТ АВАХ УУ?
          </span>
          <p className="mt-4">
            Монгол дахь брэндүүдэд хэрэглэгчийн бүтээсэн контентын үр дүн, давуу
            талыг бодитоор мэдрүүлэх үүднээс бид зөвхөн бүтээгдэхүүнээ илгээгээд
            үнэгүй контент авах боломжийг нээж байна.
          </p>
          <div className="mt-8 relative w-full max-w-[364px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#131aaf]">
            <a
              target="_blank"
              href="https://forms.gle/EbjaLfTfRCzH4Acr8"
              className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full max-w-[364px] h-[90px] rounded-xl border-[1px] border-[#2D262D] bg-[#4D55F5] flex flex-row gap-2 items-center justify-center"
            >
              <span>Давалгаанд нэгдэх</span>
              <Image
                src={"/arrow-right-icon.png"}
                alt="arrow"
                width={16}
                height={16}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeContentWave;
