import React from "react";
import Image from "next/image";
import BecomeGeniButton from "../components/common/BecomeGeniButton";

function CreatorBenefits() {
  return (
    <div className="border-y-[1px] border-[#2D262D] flex flex-col md:flex-row">
      <div className="w-full lg:w-1/2 py-8 sm:py-12 px-7 lg:px-10 bg-[#CA7FFE] text-white border-r-[1px] border-[#2D262D] flex flex-col gap-7 justify-center items-center">
        <span className="text-base sm:text-lg lg:text-xl xl:text-2xl w-full text-center lg:text-start">
          Geni Creator хөтөлбөрт сууснаар:
        </span>
        <ul className="pl-7 text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold list-disc flex flex-col gap-2 sm:gap-4 lg:gap-6 xl:gap-9">
          <li>Үр дүнтэй content агуулга бичих</li>
          <li>UGC зах зээлийн талаар мэдлэгтэй болох</li>
          <li>Хамгийн эхний 1-3 брэндтэй шууд хамтран ажиллах</li>
          <li>Чанартай богино бичлэг контент хийх</li>
          <li>Өөрийн гэсэн Geni creator portfolio-той болох</li>
        </ul>
      </div>
      <div className="bg-[#F5F4F0] px-7 py-8 sm:py-12 w-full lg:w-1/2 flex flex-col justify-center items-center">
        <div className="relative flex justify-center items-center">
          <Image
            loading="lazy"
            src={"/creators-pro-image.png"}
            width={598}
            height={433}
            alt=""
            className="aspect-[598/433]"
          />
        </div>
        <BecomeGeniButton
          width={
            "mt-6 sm:mt-10 w-full max-w-[371px] h-[84px] lg:max-w-[532px] lg:h-[90px]"
          }
          link={
            "https://docs.google.com/forms/d/e/1FAIpQLSdrBB6Hjs2cnrLWe4Z48HHCr56RcRFXvK8klYB5VifU-YckYw/viewform"
          }
          bg={"bg-[#CA7FFE]"}
          shadowbg={"#9c44da"}
          text={"Geni Creator болох"}
        />
      </div>
    </div>
  );
}

export default CreatorBenefits;
