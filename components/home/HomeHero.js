import React from "react";
import Image from "next/image";

function HomeHero() {
  return (
    <div className="container max-w-7xl mx-auto px-7 flex flex-col lg:flex-row justify-start items-start sm:justify-center sm:items-center gap-5 sm:gap-10 lg:gap-20 pt-14 lg:pt-[111px] sm:pb-20 md:pb-[158px]">
      <div className="flex flex-col relative text-[#2D262D] text-4xl sm:text-6xl font-bold">
        <Image
          src={"/hero-image2.png"}
          width={154}
          height={116}
          alt="hero-image"
          className="absolute -top-24 -right-10 xl:right-0 hidden lg:block"
        />
        <div className="flex flex-row">
          <span className="text-[#ca7ffe]">ХЭРЭГЛЭГЧ</span>
          <Image
            src={"/hero-image2.png"}
            width={96}
            height={73}
            alt="hero-image"
            className="absolute -top-8 sm:-top-4 -right-12 block lg:hidden"
          />
        </div>
        <div className="flex flex-row">
          БОЛОН&nbsp;<span className="text-[#4d55f5]">БРЭНД</span>
        </div>
        <div className="xl:flex flex-row hidden">ХАМТРАН ҮНЭ ЦЭН</div>
        <div className="xl:hidden flex flex-row">ХАМТРАН ҮНЭ</div>
        <div className="xl:hidden flex flex-row">ЦЭН БҮТЭЭХ</div>
        <div className="flex flex-wrap">
          <span className="hidden xl:block">БҮТЭЭХ&nbsp;</span>
          <div className="flex flex-row">
            <span className="text-[#4fb755]">ОРОН ЗАЙ</span>
            <Image
              src={"/hero-image1.png"}
              width={80}
              height={64}
              alt="hero-image"
              className="absolute -bottom-5 sm:-bottom-2 -right-8 block lg:hidden"
            />
          </div>
        </div>
        <Image
          src={"/hero-image1.png"}
          width={139}
          height={111}
          alt="hero-image"
          className="absolute -bottom-32 left-24 hidden lg:block"
        />
      </div>
      <Image
        src={"/hero-image.png"}
        width={502}
        height={378}
        alt="hero-image"
        className=""
      />
    </div>
  );
}

export default HomeHero;
