import React from "react";
import Image from "next/image";

function BecomeGeniBrand() {
  return (
    <div className="max-w-7xl mx-auto px-7 container pt-4 pb-12">
      <div className="rounded-2xl p-8 sm:p-10 xl:p-14 border-[1px] border-[#2D262D] bg-[#F5F4F0] flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div className="flex flex-col gap-6 md:gap-4 w-full md:w-1/2">
          <Image
            src={"/genibrand-logo.svg"}
            width={160}
            height={29}
            alt="geni-brand-logo"
          />
          <span className="text-lg md:text-xl 2xl:text-2xl font-bold text-[#6F6F6F]">
            Та Geni Brand болох хүсэлтээ дараах холбоосоор нэвтрэн хүсэлтээ
            илгээгээрэй.
          </span>
        </div>
        <div className="relative w-full aspect-[371/84] sm:max-w-[320px] lg:max-w-[371px] lg:max-h-[84px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#131aaf]">
          <a
            target="_blank"
            href="https://forms.gle/snf9FWo5WKXaqb2C8"
            className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full aspect-[371/84] sm:max-w-[320px] lg:max-w-[371px] lg:max-h-[84px] rounded-xl border-[1px] border-[#2D262D] bg-[#4D55F5] flex flex-row gap-2 items-center justify-center"
          >
            <span>Geni Brand болох</span>
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
  );
}

export default BecomeGeniBrand;
