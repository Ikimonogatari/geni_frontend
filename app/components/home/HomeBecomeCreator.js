import React from "react";
import Image from "next/image";
import HomeBecomeGeniButton from "./common/HomeBecomeGeniButton";

function HomeBecomeCreator() {
  return (
    <div className="py-12 lg:py-0 flex gap-6 lg:gap-0 flex-col lg:flex-row h-full">
      <div className="lg:py-24 flex flex-col gap-4 sm:gap-8 text-[#2D262D] lg:w-1/2 w-full">
        <Image
          src={"/genicreator-logo.svg"}
          width={154}
          height={28}
          alt=""
          className=""
        />
        <span className="mt-2 text-xl sm:text-4xl font-bold uppercase">
          Хэрэглэгчээс бүтээгч болж орлогоо нэмээрэй
        </span>
        <span className="text-sm sm:text-base">
          Инфлүүнсэр болж брэндүүдийн санал хүлээлгүйгээр дуртай брэндүүдтэйгээ
          шууд контент хийн хамтран ажиллаж орлого олж эхлээрэй. Хэн ч хаанаас ч
          ажиллах боломжтой.
        </span>
      </div>
      <div className="w-[1px] mx-4 bg-[#2D262D] hidden lg:block">&nbsp;</div>
      <div className="lg:px-7 flex flex-col justify-center items-center gap-4 sm:gap-8 lg:gap-10 lg:w-1/2">
        <Image
          src={"/home-creator-image.png"}
          alt="creator-image"
          width={746}
          height={327}
          className="w-full aspect-[746/335]"
        />
        <HomeBecomeGeniButton
          text={"Geni Creator болох"}
          link={
            "https://docs.google.com/forms/d/e/1FAIpQLSdrBB6Hjs2cnrLWe4Z48HHCr56RcRFXvK8klYB5VifU-YckYw/viewform"
          }
          shadowbg={"#9c44da"}
          bg={"bg-[#CA7FFE]"}
          width={"w-full max-w-[532px] max-h-[90px] aspect-[532/90]"}
        />
      </div>
    </div>
  );
}

export default HomeBecomeCreator;
