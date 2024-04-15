"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

function Brands() {
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
          Брэндүүд / 25
        </span>
        <button className="rounded-full bg-[#4D55F5] text-white py-2 px-6">
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
          {brands.map((brand, id) => (
            <SwiperSlide
              key={id}
              className="rounded-2xl text-[#2D262D] flex flex-col gap-2"
            >
              <button className="bg-[#CA7FFE] absolute right-3 top-3 rounded-full px-4 py-2">
                {brand.category}
              </button>
              <Image
                src={brand.image}
                width={179}
                height={101}
                alt="creator-image"
                className="w-full"
              />
              <div className="absolute bottom-4 left-4 flex flex-row items-center gap-5">
                <Image
                  src={brand.logo}
                  width={56}
                  height={56}
                  alt="lhamour"
                  className="min-w-[56px]"
                />
                <span className="text-base text-white">{brand.name}</span>
              </div>
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

export default Brands;

const brands = [
  {
    image: "/dummy-brand.png",
    logo: "/lhamour.png",
    name: "lhamour",
    category: "Beauty",
  },
  {
    image: "/dummy-brand.png",
    logo: "/lhamour.png",
    name: "lhamour",
    category: "Beauty",
  },
  {
    image: "/dummy-brand.png",
    logo: "/lhamour.png",
    name: "lhamour",
    category: "Beauty",
  },
  {
    image: "/dummy-brand.png",
    logo: "/lhamour.png",
    name: "lhamour",
    category: "Beauty",
  },
  {
    image: "/dummy-brand.png",
    logo: "/lhamour.png",
    name: "lhamour",
    category: "Beauty",
  },
  {
    image: "/dummy-brand.png",
    logo: "/lhamour.png",
    name: "lhamour",
    category: "Beauty",
  },
];
