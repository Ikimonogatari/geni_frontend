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
          className="rounded-full bg-[#4D55F5] text-white py-2 px-6"
        >
          Бүгд
        </a>
      </div>
      {getPublicBrandListData && (
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
                  <div className="bg-[#F5F4F0] min-h-[300px] rounded-2xl p-4 text-[#2D262D] border border-[#000000] flex flex-col items-center justify-center gap-2 h-full">
                    <Image
                      src={
                        brand?.ProfileLink
                          ? brand?.ProfileLink
                          : "/dummy-brand.png"
                      }
                      width={194}
                      height={194}
                      alt=""
                      className="aspect-square w-[194px] h-[194px] rounded-full border border-[#000000] object-cover"
                    />
                    <span className="hover:underline hover:underline-offset-3 text-lg font-semibold max-w-[150px] whitespace-nowrap overflow-hidden">
                      {brand?.Name ? brand?.Name : "Geni Брэнд"}
                    </span>
                    {brand?.BrandTypes && (
                      <div className="bg-[#CA7FFE] text-white rounded-full px-4 py-2">
                        {brand?.BrandTypes?.[0]?.TypeName}
                      </div>
                    )}

                    <div className="flex flex-row gap-2">
                      {instagramLink && (
                        <a
                          href={instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-75"
                        >
                          <Image
                            src="/Instagram.png"
                            width={24}
                            height={24}
                            alt=""
                            className="w-6 h-6"
                          />
                        </a>
                      )}
                      {facebookLink && (
                        <a
                          href={facebookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-75"
                        >
                          <Image
                            src="/Facebook.png"
                            width={24}
                            height={24}
                            alt=""
                            className="w-6 h-6"
                          />
                        </a>
                      )}
                    </div>
                  </div>
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
