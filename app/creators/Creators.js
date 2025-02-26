"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import PublicCreatorCard from "@/components/PublicCreatorCard";
import { useGetPublicCreatorList } from "@/hooks/react-queries";

function Creators() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [swiper, setSwiper] = useState(null);

  const handleSlideChange = (s) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  const {
    data: getPublicCreatorListData,
    error: getPublicCreatorListError,
    isLoading: getPublicCreatorListLoading,
  } = useGetPublicCreatorList();

  const checkViewportSize = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      // Mobile: display 1 slide
      setSlidesPerView(1);
    } else if (width > 576 && width <= 924) {
      // Small to Medium devices: display 2 slides
      setSlidesPerView(2);
    } else if (width > 924 && width <= 1124) {
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
    <div className="w-full pt-20">
      <div className="flex flex-row justify-between items-center">
        <span className="text-[#6F6F6F] text-base sm:text-2xl">
          Geni Бүтээгчид / {getPublicCreatorListData?.Data?.length}
        </span>
        <a
          href="/all-creators"
          className="rounded-full bg-[#CA7FFE] text-white py-2 px-6"
        >
          Бүгд
        </a>
      </div>
      {getPublicCreatorListData && (
        <div className="relative flex flex-row gap-3 justify-between items-center mt-10 w-full">
          {!isBeginning && (
            <button onClick={goPrev}>
              <Image
                src={"/creators-swipe-button.png"}
                width={42}
                height={42}
                alt="swipe-button"
                className="min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px]"
              />
            </button>
          )}
          <Swiper
            spaceBetween={18}
            slidesPerView={slidesPerView}
            onSlideChange={handleSlideChange}
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
            {getPublicCreatorListData?.Data.map((creator, id) => {
              const instagramLink = creator?.Socials?.find(
                (channel) => channel.Name === "Instagram"
              )?.SocialAddress;
              const facebookLink = creator?.Socials?.find(
                (channel) => channel.Name === "Facebook"
              )?.SocialAddress;
              return (
                <SwiperSlide key={id} className="">
                  <PublicCreatorCard
                    isSwiper={true}
                    size={"h-[332px] sm:h-auto"}
                    id={id}
                    creator={creator}
                    instagramLink={instagramLink}
                    facebookLink={facebookLink}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          {!isEnd && (
            <button onClick={goNext}>
              <Image
                src={"/creators-swipe-button.png"}
                width={42}
                height={42}
                alt="swipe-button"
                className="rotate-180 min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px]"
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Creators;
