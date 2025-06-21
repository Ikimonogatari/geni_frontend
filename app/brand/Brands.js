"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useGetPublicBrandListQuery } from "../services/service";
import PublicBrandCard from "@/components/PublicBrandCard";

function Brands() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [swiper, setSwiper] = useState(null);

  const handleSlideChange = (s) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  const {
    data: getPublicBrandListData,
    error: getPublicBrandListError,
    isLoading: getPublicBrandListLoading,
  } = useGetPublicBrandListQuery();

  const checkViewportSize = () => {
    // TODO use breakpoints of Swiper
    const width = window.innerWidth;
    if (width <= 480) {
      // Mobile: display 1 slide
      setSlidesPerView(1);
    } else if (width > 480 && width <= 768) {
      // Small to Medium devices: display 2 slides
      setSlidesPerView(2);
    } else if (width > 768 && width <= 1024) {
      // Medium to Large devices: display 3 slides
      setSlidesPerView(3);
    } else {
      // Large devices and wider: display 4 slides
      setSlidesPerView(4);
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
          Брэндүүд / {getPublicBrandListData?.Data?.length}
        </span>
        <a
          href="/all-brands"
          className="rounded-full bg-[#4D55F5] text-white py-1 lg:py-2 px-3 lg:px-6"
        >
          Бүгд
        </a>
      </div>
      {getPublicBrandListData && (
        <div className="relative flex flex-row gap-3 items-center mt-4 lg:mt-9">
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
            spaceBetween={20}
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
            {getPublicBrandListData?.Data?.map((brand, id) => {
              const instagramLink = brand?.Socials?.find(
                (channel) => channel.Name === "Instagram"
              )?.SocialAddress;

              const facebookLink = brand?.Socials?.find(
                (channel) => channel.Name === "Facebook"
              )?.SocialAddress;
              return (
                <SwiperSlide key={id} className="">
                  <PublicBrandCard
                    id={id}
                    brand={brand}
                    instagramLink={instagramLink}
                    facebookLink={facebookLink}
                    isSwiper={true}
                    size="h-[332px] sm:h-auto"
                  />
                </SwiperSlide>
              );
            })}
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
      )}
    </div>
  );
}

export default Brands;
