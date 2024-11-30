import React from "react";
import Image from "next/image";

function BrandHero() {
  return (
    <div className="container text-[#2D262D] max-w-7xl mx-auto pb-4 pt-14 sm:py-28 px-7 flex flex-col md:flex-row gap-8 lg:items-center">
      <div className="flex flex-col gap-12 w-full md:w-1/2">
        <Image
          src={"/genibrand-logo.svg"}
          width={160}
          height={2}
          alt="genibrand-logo"
          className="w-[160px] h-[29px] sm:w-[256px] sm:h-[47px]"
        />
        <span className="text-xl sm:text-2xl xl:text-3xl font-bold mt-0 sm:mt-3">
          Бүтээгдэхүүнээ Geni бүтээгчдэд санал болгоод контент авч эхлээрэй.
        </span>
        <div className="flex md:hidden flex-row items-center">
          <Image
            src={"/brands-image.png"}
            width={561}
            height={269}
            alt="brands"
            className="aspect-[561/269] w-full"
          />
        </div>
        <div className="relative w-full max-w-[364px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#131aaf]">
          <a
            target="_blank"
            href="https://forms.gle/snf9FWo5WKXaqb2C8"
            className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full max-w-[364px] h-[90px] rounded-xl border-[1px] border-[#2D262D] bg-[#4D55F5] flex flex-row gap-2 items-center justify-center"
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
      <div className="hidden md:flex flex-row items-center">
        <Image
          src={"/brands-image.png"}
          width={561}
          height={269}
          alt="brands"
          className="aspect-[561/269] w-full"
        />
      </div>
    </div>
  );
}

export default BrandHero;
