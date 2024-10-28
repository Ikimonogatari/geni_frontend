"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useGetPublicCreatorListQuery } from "../services/service";

function Creators() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (s) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  const {
    data: getPublicCreatorListData,
    error: getPublicCreatorListError,
    isLoading: getPublicCreatorListLoading,
  } = useGetPublicCreatorListQuery();

  const [slidesPerView, setSlidesPerView] = useState(5);
  const [swiper, setSwiper] = useState(null);

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

  console.log(getPublicCreatorListData ? getPublicCreatorListData : "");
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
              // Find Instagram and Facebook links for each creator
              const instagramLink = creator?.SocialChannels?.find(
                (channel) => channel.PlatformName === "Instagram"
              )?.Link;

              const facebookLink = creator?.SocialChannels?.find(
                (channel) => channel.PlatformName === "Facebook"
              )?.Link;

              return (
                <SwiperSlide key={id} className="">
                  <div className="bg-[#F5F4F0] min-h-[340px] rounded-2xl p-4 text-[#2D262D] border border-[#000000] flex flex-col items-center gap-2 h-full">
                    <a
                    // href={`/public-profile/${creator.CreatorId}`}
                    >
                      <Image
                        src={
                          creator?.ProfileLink
                            ? creator?.ProfileLink
                            : "/dummy-profile.png"
                        }
                        width={194}
                        height={194}
                        alt=""
                        className="aspect-square w-[194px] h-[194px] rounded-full border border-[#000000] object-cover"
                      />
                    </a>
                    <div className="flex flex-row items-center gap-2">
                      <a
                        // href={`/public-profile/${creator.CreatorId}`}
                        className="hover:underline hover:underline-offset-3 text-lg font-semibold max-w-[150px] whitespace-nowrap overflow-hidden"
                      >
                        {creator?.Nickname ? creator?.Nickname : "Geni Бүтээгч"}
                      </a>
                      <Image
                        src={"/verified-icon.png"}
                        width={20}
                        height={20}
                        alt="verified-icon"
                        className="w-5 h-5"
                      />
                    </div>
                    {creator?.Point && creator?.ContentNumber ? (
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src={"/star.png"}
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                        <span className="text-lg">
                          {creator?.Point}/5 {creator?.ContentNumber} контент
                        </span>
                      </div>
                    ) : null}
                    <div className="flex flex-row gap-2 mt-3">
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
                    <p className="text-[#6F6F6F] text-xs line-clamp-3">
                      {creator?.Bio}
                    </p>
                  </div>
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
