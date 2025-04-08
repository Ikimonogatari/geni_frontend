import React from "react";
import Image from "next/image";

function CreatorHero() {
  return (
    <div className="flex flex-col lg:flex-row gap-5 my-12">
      <div className="w-full lg:w-1/2 flex flex-col gap-6 p-8 rounded-2xl bg-[#F5F4F0]">
        <Image
          loading="lazy"
          src={"/creators-image1.png"}
          width={254}
          height={225}
          alt="creators-image"
          className="mx-auto"
        />
        <span className="text-2xl sm:text-4xl font-bold">
          Онлайнаар, хэн ч, хаанаас ч ажиллах боломжтой
        </span>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6 p-8 rounded-2xl bg-[#F5F4F0]">
        <Image
          loading="lazy"
          src={"/creators-image2.png"}
          width={258}
          height={236}
          alt="creators-image"
          className="mx-auto"
        />
        <span className="text-2xl sm:text-4xl font-bold">
          Их дагагч, хаяг хөгжүүлэлт шаардлагагүй
        </span>
      </div>
    </div>
  );
}

export default CreatorHero;
