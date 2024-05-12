"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

import Image from "next/image";
import GraphCMSImageLoader from "../components/GraphCMSImageLoader";

function BrandsMobile() {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/Items/brand?sort=sort,-date_created&fields=*,Category.*.*,creators.*.*,content.*.*&filter=%7B%22status%22:%7B%22_eq%22:%22published%22%7D%7D`
        );
        console.log(r);
        const d = await r.json();
        setBrands(d.data);
        console.log(d.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="block sm:hidden container px-7 mx-auto max-w-7xl pt-20">
      <div className="flex flex-row justify-between items-center">
        <span className="text-[#6F6F6F] text-base sm:text-2xl">
          Брэндүүд / {brands.length}
        </span>
        <button className="rounded-full bg-[#4D55F5] text-white py-2 px-6">
          Бүгд
        </button>
      </div>
      <div className="px-10 mt-9">
        <Swiper
          effect={"cards"}
          slidesPerView={"1"}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          modules={[EffectCards, Autoplay]}
          className=""
        >
          {brands?.map((brand, id) => (
            <SwiperSlide
              key={id}
              className="rounded-2xl 2xl:max-w-[267px] text-[#2D262D] flex flex-col gap-2"
            >
              <button className="bg-[#CA7FFE] absolute right-3 top-3 rounded-full px-4 py-2">
                {brand.Category ? brand.Category[0]?.Category_id.name : <></>}
              </button>
              <Image
                loader={GraphCMSImageLoader}
                src={brand.image ? brand.image : ""}
                width={267}
                height={267}
                alt="creator-image"
                className="w-full rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 flex flex-row items-center gap-5">
                <Image
                  loader={GraphCMSImageLoader}
                  src={brand.logo ? brand.logo : ""}
                  width={56}
                  height={56}
                  alt="lhamour"
                  className="min-w-[56px] rounded-full"
                />
                <span className="text-base text-white font-bold">
                  {brand.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BrandsMobile;
