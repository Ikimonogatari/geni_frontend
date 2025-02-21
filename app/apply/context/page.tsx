import React from "react";
import Image from "next/image";
import BecomeGeniButton from "@/components/common/BecomeGeniButton";

function page() {
  return (
    <div className="mt-[96px] sm:mt-[136px] md:mt-[152px] container text-[#2D262D] max-w-6xl mx-auto pb-4 pt-14 sm:py-28 px-7 flex flex-col md:flex-row gap-8 lg:items-center">
      <div className="flex flex-col gap-5 sm:gap-12 w-full md:w-1/2">
        <span className="text-2xl sm:text-3xl xl:text-4xl font-bold mt-0 sm:mt-3">
          Чадвараа сориод шууд брэндүүдтэй хамтарч эхлэх үү?
        </span>
        <p className="text-base sm:text-xl">
          Тэнцээд шууд брэндүүдтэй хамтран контент бүтээж эхлэх боломж нээгдлээ.
          Та зааврын дагуу өөрийн бүтээсэн контентоо илгээн дараах асуултад
          хариулаад Geni Creator болж нэгдээрэй.
          <br />
          <br />
          Тэнцсэн бүтээгчид Geni creator онлайн хичээлийг үнэгүй үзэх эрх
          дагалдана
        </p>
        <div className="flex md:hidden flex-row items-center">
          <Image
            src={"/become-creator-image.png"}
            width={428}
            height={402}
            alt=""
            className="aspect-[428/402] w-full"
          />
        </div>
        <BecomeGeniButton
          width={"aspect-[371/84] w-full lg:max-w-[371px]"}
          link={"/apply"}
          text={"Өргөдөл илгээх"}
          bg={"bg-geni-pink"}
          shadowbg={"shadow-[0.25rem_0.25rem_#9c44da]"}
        />
      </div>
      <div className="hidden md:flex flex-row items-center">
        <Image
          src={"/become-creator-image.png"}
          width={428}
          height={403}
          alt=""
          className="aspect-[428/402] w-full"
        />
      </div>
    </div>
  );
}

export default page;
