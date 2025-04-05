import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGuideCheckMutation } from "@/app/services/service";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import clsx from "clsx";

interface GuideModalProps {
  hasSeenGuide: boolean;
  slides: {
    image: string;
    text: string;
    title?: string;
  }[];
  theme?: "student" | "brand";
}

function GuideModal({
  hasSeenGuide,
  slides,
  theme = "brand",
}: GuideModalProps) {
  const [swiper, setSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(!hasSeenGuide);
  const [isChecked, setIsChecked] = useState(hasSeenGuide);

  const [
    guideCheck,
    {
      data: guideCheckData,
      error: guideCheckError,
      isLoading: guideCheckDataLoading,
      isSuccess: guideCheckDataSuccess,
    },
  ] = useGuideCheckMutation();

  const handleFinish = () => {
    setDialogOpen(false);
  };

  const handleGuideCheck = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);

    if (isChecked) {
      guideCheck(null);
    }
  };
  console.log(theme);
  const themeClasses = {
    student: {
      button: "bg-geni-green",
      border: "border-geni-green",
      text: "text-geni-green",
      paginationColor: "#4FB755",
    },
    brand: {
      button: "bg-geni-blue",
      border: "border-geni-blue",
      text: "text-geni-blue",
      paginationColor: "#4D55F5",
    },
  };
  console.log(themeClasses[theme]);

  const currentTheme =
    theme && themeClasses[theme] ? themeClasses[theme] : themeClasses.brand;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      {/*@ts-ignore*/}
      <DialogContent className="overflow-y-auto flex flex-col items-center lg:items-start gap-4 sm:gap-2 max-h-[739px] w-full lg:w-full max-w-4xl rounded-3xl">
        <Swiper
          slidesPerView={1}
          onSwiper={(s) => setSwiper(s)}
          onSlideChange={() => setCurrentIndex(swiper.activeIndex)}
          modules={[Pagination]}
          className="w-full h-full"
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          style={{
            // @ts-ignore
            "--swiper-pagination-color": currentTheme.paginationColor,
            "--swiper-pagination-bullet-inactive-color": "#CDCDCD",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center pb-5"
            >
              <Image
                src={slide.image}
                width={800}
                height={400}
                alt={`Slide ${index + 1}`}
                className="rounded-lg object-cover"
              />
              <div className="flex flex-col gap-2 mt-4">
                {slide.title && (
                  <h3 className={`text-xl sm:text-2xl font-bold`}>
                    {slide.title}
                  </h3>
                )}
                <p className="text-sm sm:text-base lg:text-lg">{slide.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="relative flex justify-between items-center w-full">
          {currentIndex > 0 && currentIndex < slides.length - 1 ? (
            <button
              className="z-50 flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-1 sm:gap-2 bg-[#F5F4F0] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-bold"
              onClick={() => swiper.slidePrev()}
            >
              <Image
                src={"/arrow-forward-icon.png"}
                width={10}
                height={10}
                alt="arrow"
                className="w-[14px] h-[14px] rotate-180"
              />
              Өмнөх
            </button>
          ) : currentIndex === slides.length - 1 ? (
            <div className="z-50 flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="peer hidden"
                  checked={isChecked}
                  onChange={handleGuideCheck}
                />
                <label
                  htmlFor="checkbox"
                  className={clsx(
                    "w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all",
                    isChecked && `${currentTheme.button} ${currentTheme.border}`
                  )}
                >
                  {isChecked && (
                    <span className="text-sm sm:text-base text-white select-none w-3 h-5 border-white">
                      ✓
                    </span>
                  )}
                </label>
              </div>
              <span className="text-xs sm:text-lg font-semibold">
                Дахин харуулахгүй
              </span>
            </div>
          ) : (
            <div></div>
          )}
          <div className="swiper-pagination absolute z-0"></div>
          {currentIndex !== slides.length - 1 ? (
            <button
              className={`z-50 flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-1 sm:gap-2 ${currentTheme.button} border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
              onClick={() => swiper.slideNext()}
            >
              Дараах
              <Image
                src={"/arrow-right-icon.png"}
                width={10}
                height={10}
                alt="arrow"
                className="w-[10px] h-[10px]"
              />
            </button>
          ) : (
            <button
              className={`z-50 flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-1 sm:gap-2 ${currentTheme.button} border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
              onClick={handleFinish}
            >
              Дуусгах
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GuideModal;
