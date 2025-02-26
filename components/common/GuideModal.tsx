import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBrandGuideCheck } from "@/hooks/react-queries";

function GuideModal({ hasSeenGuide }) {
  const [swiper, setSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(!hasSeenGuide);
  const [isChecked, setIsChecked] = useState(hasSeenGuide);

  const slides = [
    {
      image: "/brand-guide-image1.png",
      text: "Та “Контент статус” хэсгээс Geni Бүтээгчидтэй хамтран ажиллаж буй бүх процессыг хянах боломжтой. Энэхүү процесс нь 5 үе шаттай бөгөөд дээрх зураг шиг бүтээгдэхүүн хүргэж байгаа үеээс эхлэн та контентоо хүлээж авах үйлдэл хүртэлх процесс хамаарагдана.",
    },
    {
      image: "/brand-guide-image2.png",
      text: "Та “Контент авах” товчин дээр дарсанаар таньд Reel видео контент, Thumbnail зураг болон Geni Бүтээгчийн сэтгэгдэл бүхий тайлбар харагдах юм. Та контентоо хүлээж авахдаа заавал контент бүтээгчийг 3 төрлөөр дүгнэж үнэлгээ өгөх бөгөөд нэмэлтээр та сэтгэгдэлээ илгээх боложмтой.",
    },
    {
      image: "/brand-guide-image3.png",
      text: "Таны “Контент” хэсэгт Geni Бүтээгчидээс хүлээн авсан бүх контентууд харагдах бөгөөд эндээс та хүссэн үедээ хэрэгтэй контентоо үзэн татаж авах боломжтой.",
    },
    {
      image: "/brand-guide-image4.png",
      text: "Та “Бүтээгдэхүүн” хэсгээс өөрийн оруулсан бүтээгдэхүүний тоо ширхэгээ хянах юм. Мөн дууссан бүтээгдэхүүний тоо ширхэгээ нэмэх болон бүтээгдэхүүнийхээ мэдээллийг өөрчлөх гэх мэд үйлдэлүүдийг хийх боломжтой.",
    },
    {
      image: "/brand-guide-image5.png",
      text: "Та “Geni Credit”-н тоогоор контент авах эрхтэй болох бөгөөд та хүссэн үедээ өөрийн хүссэн багцаараа цэнэглэх боломжтой.",
    },
  ];

  const {
    mutate: brandGuideCheck,
    data: brandGuideCheckData,
    error: brandGuideCheckError,
    isPending: brandGuideCheckDataLoading,
    isSuccess: brandGuideCheckDataSuccess,
  } = useBrandGuideCheck();

  const handleFinish = () => {
    setDialogOpen(false);
  };

  const handleGuideCheck = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);

    if (isChecked) {
      brandGuideCheck({ variables: {} });
    }
  };

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
            "--swiper-pagination-color": "#4D55F5",
            "--swiper-pagination-bullet-inactive-color": "#CDCDCD",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center">
              <Image
                src={slide.image}
                width={800}
                height={400}
                alt={`Slide ${index + 1}`}
                className="rounded-lg object-cover"
              />
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mt-4">
                {slide.text}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="relative flex justify-between items-center w-full">
          {currentIndex > 0 && currentIndex < 4 ? (
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
          ) : currentIndex == 4 ? (
            <div className="z-50 flex flex-row items-center gap-2 sm:gap-3">
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
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all peer-checked:bg-[#4D55F5] peer-checked:border-[#4D55F5]"
                >
                  <span className="text-sm sm:text-base text-white text-center select-none peer-checked:inline-block w-3 h-5 border-white">
                    ✓
                  </span>
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
              className={`z-50 flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-1 sm:gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
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
              className="z-50 flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-1 sm:gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold"
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
