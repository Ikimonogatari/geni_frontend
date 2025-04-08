"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

import PublicCreatorCard from "@/components/PublicCreatorCard";
import { useGetFeaturedProductListQuery } from "@/app/services/service";

function FeaturedProductList() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [swiper, setSwiper] = useState(null);

  const handleSlideChange = (s) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  const {
    data: listData,
    error: listError,
    isLoading: listLoading,
  } = useGetFeaturedProductListQuery({});

  const checkViewportSize = useCallback(() => {
    const width = window.screen.width;
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
  }, []);

  useEffect(() => {
    checkViewportSize();

    window.addEventListener("resize", checkViewportSize);

    return () => {
      window.removeEventListener("resize", checkViewportSize);
    };
  }, [checkViewportSize]);

  const goNext = () => {
    swiper.slideNext();
  };
  const goPrev = () => {
    swiper.slidePrev();
  };

  return (
    <div className="w-full pt-20">
      <div className="flex justify-between items-center">
        <span className="text-[#6F6F6F] text-base sm:text-2xl mb-4 lg:mb-10">
          Эрэлттэй бүтээгдэхүүнүүд
        </span>
      </div>
      {listData && (
        <div className="relative flex flex-row gap-3 justify-between items-center w-full">
          {!isBeginning && (
            <button onClick={goPrev} className="hidden lg:block">
              <Image
                src={"/creators-swipe-button.png"}
                width={42}
                height={42}
                alt="swipe-button"
                className="min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px] select-none"
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
            {listData?.Data.map((product) => {
              return (
                <SwiperSlide key={product?.ProductId}>
                  <div className="max-w-full md:max-w-xs rounded-[30px] bg-primary-bg border border-border-gray/60 overflow-hidden shadow-sm">
                    <div className="relative  p-6">
                      {/* <div className="absolute top-4 right-4">
                        <span className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full">
                          {badgeText}
                        </span>
                      </div> */}
                      <div className="flex justify-center items-center select-none">
                        <Image
                          src={product?.ProductPics?.[0]?.Url}
                          alt={product?.ProductName}
                          width={200}
                          height={200}
                          className="object-cover max-w-[200px] max-h-[200px]"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-white">
                      <h3 className="text-sm text-gray-600 font-medium">
                        {product?.BrandName}
                      </h3>

                      <h2 className="text-lg font-semibold mt-1 line-clamp-1">
                        {product?.ProductName}
                      </h2>

                      <div className="mt-2 flex flex-col space-y-1">
                        <p className="text-xs text-gray-500">
                          Хамтрах хүсэлт: {product?.ContentLeft}/
                          {product?.ContentLimit}
                        </p>
                        <p className="text-xs text-gray-500">
                          Үнэ: ₮{product?.ProductPrice?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {!isEnd && (
            <button onClick={goNext} className="hidden lg:block">
              <Image
                src={"/creators-swipe-button.png"}
                width={42}
                height={42}
                alt="swipe-button"
                className="rotate-180 min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px] select-none"
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FeaturedProductList;
