"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

function Creators() {
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [swiper, setSwiper] = useState(null);

  const checkViewportSize = () => {
    const width = window.innerWidth;
    if (width <= 640) {
      // Mobile
      setSlidesPerView(1);
    } else if (width >= 640 && width <= 1068) {
      // Tablet or medium devices
      setSlidesPerView(3);
    } else {
      // Larger devices
      setSlidesPerView(5);
    }
  };
  useEffect(() => {
    checkViewportSize();

    window.addEventListener("resize", checkViewportSize);

    return () => {
      window.removeEventListener("resize", checkViewportSize);
    };
  }, []);
  const goNext = () => {
    swiper.slideNext();
  };
  const goPrev = () => {
    swiper.slidePrev();
  };

  return (
    <div className="container px-7 mx-auto max-w-7xl pt-20">
      <div className="flex flex-row justify-between items-center">
        <span className="text-[#6F6F6F] text-base sm:text-2xl">
          Бүтээгчид / 25
        </span>
        <button className="rounded-full bg-[#CA7FFE] text-white py-2 px-6">
          Бүгд
        </button>
      </div>
      <div className="relative flex flex-row gap-3 items-center mt-9">
        <button onClick={goPrev}>
          <Image
            src={"/creators-swipe-button.png"}
            width={42}
            height={42}
            alt="swipe-button"
            className="hidden sm:block min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px]"
          />
        </button>
        <Swiper
          spaceBetween={30}
          slidesPerView={slidesPerView}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          onSwiper={(s) => {
            setSwiper(s);
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className=""
        >
          {creators.map((creator, id) => (
            <SwiperSlide
              key={id}
              className="bg-[#F5F4F0] rounded-2xl p-4 text-[#2D262D] flex flex-col gap-2"
            >
              <Image
                src={"/verified-icon.png"}
                width={24}
                height={24}
                alt="verified-icon"
                className="absolute right-6 top-6"
              />
              <Image
                src={creator.image}
                width={179}
                height={101}
                alt="creator-image"
                className="w-full"
              />
              <p className="text-base mt-3">{creator.name}</p>
              <p className="text-[#6F6F6F] text-sm mt-1">
                Created content: {creator.created_content}
              </p>
              <p className="text-[#6F6F6F] text-sm mt-1">
                Collab brands: {creator.collab_brand}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={goNext}>
          <Image
            src={"/creators-swipe-button.png"}
            width={42}
            height={42}
            alt="swipe-button"
            className="hidden sm:block rotate-180 min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px]"
          />
        </button>
      </div>
    </div>
  );
}

export default Creators;

const creators = [
  {
    image: "/dummy-creator.png",
    name: "Davaa",
    created_content: "12",
    collab_brand: "3",
  },
  {
    image: "/dummy-creator.png",
    name: "Davaa",
    created_content: "12",
    collab_brand: "3",
  },
  {
    image: "/dummy-creator.png",
    name: "Davaa",
    created_content: "12",
    collab_brand: "3",
  },
  {
    image: "/dummy-creator.png",
    name: "Davaa",
    created_content: "12",
    collab_brand: "3",
  },
  {
    image: "/dummy-creator.png",
    name: "Davaa",
    created_content: "12",
    collab_brand: "3",
  },
  {
    image: "/dummy-creator.png",
    name: "Davaa",
    created_content: "12",
    collab_brand: "3",
  },
];
