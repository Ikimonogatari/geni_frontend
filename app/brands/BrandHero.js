import React from "react";
import Image from "next/image";
import BecomeGeniButton from "../components/common/BecomeGeniButton";

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
        <BecomeGeniButton
          width={"aspect-[371/84] max-w-[320px] lg:max-w-[371px]"}
          link={"https://forms.gle/snf9FWo5WKXaqb2C8"}
          text={"Geni Brand болох"}
          bg={"bg-[#4D55F5]"}
          shadowbg={"shadow-[0.25rem_0.25rem_#131aaf]"}
        />
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
