"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

function Contents({ creatorData }) {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [swiper, setSwiper] = useState(null);

  const checkViewportSize = () => {
    const width = window.innerWidth;
    if (width <= 640) {
      // Mobile
      setSlidesPerView(1);
    } else if (width >= 640 && width <= 1068) {
      // Tablet or medium devices
      setSlidesPerView(2);
    } else if (width >= 1068 && width <= 1300) {
      // Tablet or medium devices
      setSlidesPerView(3);
    } else {
      // Larger devices
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
    <div className="container max-w-7xl px-7 mx-auto mt-10 sm:mt-7">
      <span className="text-[#6F6F6F] text-[18px]">
        Created content: {creatorData?.content?.length}
      </span>
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
          {contents.map((content, id) => (
            <SwiperSlide key={id} className="">
              <Image
                src={content.image}
                width={260}
                height={462}
                alt="creator-image"
                className=" min-w-[260px] mih-h-[462px] w-full"
              />
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

export default Contents;

const contents = [
  {
    image: "/dummy-content.png",
  },
  {
    image: "/dummy-content.png",
  },
  {
    image: "/dummy-content.png",
  },
  {
    image: "/dummy-content.png",
  },
  {
    image: "/dummy-content.png",
  },
  {
    image: "/dummy-content.png",
  },
];
