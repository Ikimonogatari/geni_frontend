"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import GraphCMSImageLoader from "../components/GraphCMSImageLoader";
import { useGetPublicCreatorListQuery } from "../services/service";

function Creators() {
  const [creators, setCreators] = useState([]);
  const {
    data: getPublicCreatorListData,
    error: getPublicCreatorListError,
    isLoading: getPublicCreatorListLoading,
  } = useGetPublicCreatorListQuery();

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
  console.log(getPublicCreatorListData ? getPublicCreatorListData : "");
  return (
    <div className="hidden sm:block container px-7 mx-auto max-w-7xl pt-20">
      <div className="flex flex-row justify-between items-center">
        <span className="text-[#6F6F6F] text-base sm:text-2xl">
          Бүтээгчид / {creators.length}
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
        {getPublicCreatorListData ? (
          <Swiper
            spaceBetween={18}
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
