import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  useGuideCheckMutation,
  useTermCheckMutation,
} from "@/app/services/service";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import clsx from "clsx";
import BrandStep2 from "../credit/Step2";
import StudentStep2 from "../course/Step2";

interface GuideModalProps {
  hasSeenGuide: boolean;
  hasAcceptedTerms?: boolean;
  slides: {
    image: string;
    text: string;
    title?: string;
  }[];
  theme?: "student" | "brand";
}

function GuideModal({
  hasSeenGuide,
  hasAcceptedTerms = false,
  slides,
  theme = "brand",
}: GuideModalProps) {
  const [swiper, setSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(!hasSeenGuide);
  const [isGuideChecked, setIsGuideChecked] = useState(hasSeenGuide);
  const [isTermsChecked, setIsTermsChecked] = useState(hasAcceptedTerms);
  const [isLastGuideSlide, setIsLastGuideSlide] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [
    guideCheck,
    {
      data: guideCheckData,
      error: guideCheckError,
      isLoading: guideCheckDataLoading,
      isSuccess: guideCheckDataSuccess,
    },
  ] = useGuideCheckMutation();

  const [
    termCheck,
    {
      data: termCheckData,
      error: termCheckError,
      isLoading: termCheckDataLoading,
      isSuccess: termCheckDataSuccess,
    },
  ] = useTermCheckMutation();

  const handleFinish = () => {
    if (showTerms) {
      // If we're in terms view and terms are checked, save and close
      if (isTermsChecked) {
        termCheck(null);
        setDialogOpen(false);
      }
    } else {
      // If user checked "don't show again" for guide
      if (isGuideChecked) {
        guideCheck(null);
      }

      // Show terms if not already accepted
      if (!hasAcceptedTerms) {
        setShowTerms(true);
      } else {
        setDialogOpen(false);
      }
    }
  };

  const handleGuideCheck = (e) => {
    const isChecked = e.target.checked;
    setIsGuideChecked(isChecked);
  };

  const handleTermsCheck = (e) => {
    const isChecked = e.target.checked;
    setIsTermsChecked(isChecked);
  };

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

  const currentTheme =
    theme && themeClasses[theme] ? themeClasses[theme] : themeClasses.brand;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      {/*@ts-ignore*/}
      <DialogContent className="overflow-y-auto flex flex-col items-center lg:items-start gap-4 sm:gap-2 max-h-[739px] w-full lg:w-full max-w-4xl rounded-3xl">
        {!showTerms ? (
          /* Guide Slides */
          <>
            <Swiper
              slidesPerView={1}
              onSwiper={(s) => setSwiper(s)}
              onSlideChange={(s) => {
                setCurrentIndex(s.activeIndex);
                setIsLastGuideSlide(s.activeIndex === slides.length - 1);
              }}
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
                    <p className="text-sm sm:text-base lg:text-lg">
                      {slide.text}
                    </p>
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
                      checked={isGuideChecked}
                      onChange={handleGuideCheck}
                    />
                    <label
                      htmlFor="checkbox"
                      className={clsx(
                        "w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all",
                        isGuideChecked &&
                          `${currentTheme.button} ${currentTheme.border}`
                      )}
                    >
                      {isGuideChecked && (
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
                  {hasAcceptedTerms ? "Дуусгах" : "Үргэлжлүүлэх"}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Terms and Conditions */
          <div className="w-full">
            {theme === "student" ? (
              <StudentStep2 setIsAgreed={() => {}} />
            ) : (
              <BrandStep2 setIsAgreed={() => {}} />
            )}

            <div className="flex flex-col items-center w-full mt-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    className="peer hidden"
                    checked={isTermsChecked}
                    onChange={handleTermsCheck}
                  />
                  <label
                    htmlFor="terms-checkbox"
                    className={clsx(
                      "w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all",
                      isTermsChecked &&
                        `${currentTheme.button} ${currentTheme.border}`
                    )}
                  >
                    {isTermsChecked && (
                      <span className="text-sm sm:text-base text-white select-none w-3 h-5 border-white">
                        ✓
                      </span>
                    )}
                  </label>
                </div>
                <span className="text-xs sm:text-lg font-semibold">
                  Үйлчилгээний нөхцөлийг хүлээн зөвшөөрч байна
                </span>
              </div>

              <button
                className={`z-50 flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-1 sm:gap-2 ${
                  isTermsChecked ? currentTheme.button : "bg-gray-300"
                } border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
                onClick={handleFinish}
                disabled={!isTermsChecked}
              >
                Баталгаажуулах
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default GuideModal;
