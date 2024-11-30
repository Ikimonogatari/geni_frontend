import React from "react";
import Image from "next/image";
import HomeBecomeGeniButton from "./common/HomeBecomeGeniButton";

function HomeBecomeGeniBrand() {
  return (
    <div className="py-12 lg:py-0 flex gap-6 lg:gap-0 flex-col lg:flex-row h-full">
      <div className="lg:py-24 flex flex-col gap-4 sm:gap-8 text-[#2D262D] lg:w-1/2 w-full">
        <Image
          src={"/genibrand-logo.svg"}
          width={154}
          height={28}
          alt=""
          className=""
        />
        <span className="mt-2 text-xl sm:text-4xl font-bold uppercase">
          Хэрэглэгчидтэй-гээ хамтран брэндийн Үнэ цэнээ өсгөөрэй
        </span>
        <span className="text-sm sm:text-base">
          Өндөр хийцлэлтэй, төлбөртэй зар суртчилгаанаас хүмүүс залхсан. Оронд
          нь хэрэглэгчдэд илүү ойр, хэрэглэгчээс хэрэглэгчид санал болгосон
          бодит контент илүү үр дүнтэй байна. <br /> <br />
          Таны хэрэглэгчдийн бүтээсэн контент 35%-р илүү их хүнд хүрэн, 24%-р их
          зарагддаг. Бодит хэрэглэгчидтэйгээ хамтран илүү үнэн, ойр, өндөр үр
          дүнтэй контент хүргээрэй.
        </span>
      </div>
      <div className="w-[1px] mx-4 bg-[#2D262D] hidden lg:block">&nbsp;</div>
      <div className="lg:px-7 flex flex-col justify-center items-center gap-4 sm:gap-8 lg:gap-10 lg:w-1/2">
        <Image
          src={"/home-brand-image.png"}
          width={625}
          height={347}
          alt="brand-image"
          className="w-full aspect-[635/347] max-w-[635px] max-h-[347px]"
        />
        <HomeBecomeGeniButton
          text={"Geni Brand болох"}
          link={"https://forms.gle/snf9FWo5WKXaqb2C8"}
          shadowbg={"#131aaf"}
          bg={"bg-[#4D55F5]"}
          width={"w-full max-w-[532px] max-h-[90px] aspect-[532/90]"}
        />
      </div>
    </div>
  );
}

export default HomeBecomeGeniBrand;
