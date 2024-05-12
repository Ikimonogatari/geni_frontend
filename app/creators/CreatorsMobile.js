"use client";
import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { Autoplay, EffectCards } from "swiper/modules";
import Image from "next/image";
import GraphCMSImageLoader from "../components/GraphCMSImageLoader";

function CreatorsMobile() {
  const [creators, setCreators] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/Items/creator?sort=sort,-date_created&fields=*,Category.*.*,brand.*.*,content.*.*&filter=%7B%22status%22:%7B%22_eq%22:%22published%22%7D%7D`
        );
        console.log(r);
        const d = await r.json();
        setCreators(d.data);
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
          Бүтээгчид / {creators.length}
        </span>
        <button className="rounded-full bg-[#CA7FFE] text-white py-2 px-6">
          Бүгд
        </button>
      </div>
      <div className="mt-9 px-7">
        {creators ? (
          <Swiper
            effect={"cards"}
            grabCursor={true}
            slidesPerView={"1"}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            modules={[EffectCards, Autoplay]}
            className=""
          >
            {creators.map((creator, id) => (
              <SwiperSlide key={id} className="">
                <a
                  href={`/profile/${creator.id}`}
                  className="bg-[#F5F4F0] rounded-2xl p-4 text-[#2D262D] flex flex-col gap-2"
                >
                  <Image
                    src={"/verified-icon.png"}
                    width={24}
                    height={24}
                    alt="verified-icon"
                    className="absolute right-6 top-6 w-6 h-6"
                  />
                  <Image
                    loader={GraphCMSImageLoader}
                    src={creator.image ? creator.image : ""}
                    width={179}
                    height={101}
                    alt="creator-image"
                    className="w-full rounded-2xl"
                  />

                  <p className="text-base mt-3">{creator.name}</p>
                  <p className="text-[#6F6F6F] text-sm mt-1">
                    Created content: {creator.content.length}
                  </p>
                  <p className="text-[#6F6F6F] text-sm mt-1">
                    Collab brands: {creator.brand.length}
                  </p>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default CreatorsMobile;
