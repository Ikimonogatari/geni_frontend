import React from "react";
import Image from "next/image";
import Brands from "./Brands";

export const metadata = {
  title: "Geni | Brands",
  description: "Geni Brands",
};

function page() {
  return (
    <div className="min-h-screen w-ful bg-white">
      <div className="mt-32">
        <div className="container text-[#2D262D] max-w-7xl mx-auto pb-4 pt-14 sm:py-28 px-7 flex flex-col lg:flex-row lg:items-center">
          <div className="flex flex-col gap-12 w-full lg:w-1/2">
            <Image
              src={"/genibrand-logo.svg"}
              width={160}
              height={30}
              alt="genibrand-logo"
            />
            <span className="text-[28px] sm:text-[32px] font-bold mt-0 sm:mt-3">
              Бүтээгдэхүүнээ Geni бүтээгчдэд санал болгоод үнэгүй контент авч
              эхлээрэй.
            </span>
            <div className="hidden lg:block relative w-full max-w-[364px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#131aaf]">
              <a
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLScJw4vWyiKFErCKmIwrmFFCjTsnXfXIEuuNPlVkg4l3U7xjCg/viewform?usp=send_form"
                className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full max-w-[364px] h-[90px] rounded-xl border-[1px] border-[#2D262D] bg-[#4D55F5] flex flex-row gap-2 items-center justify-center"
              >
                <span>Geni Brand болох</span>
                <Image
                  src={"/arrow-right-icon.png"}
                  alt="arrow"
                  width={16}
                  height={16}
                />
              </a>
            </div>
          </div>
          <div className="flex flex-row items-center mx-auto sm:mx-0">
            <Image
              src={"/brands-image1.png"}
              width={260}
              height={269}
              alt="brands"
              className="max-w-[160px] max-h-[166px] sm:max-w-[260px] sm:max-h-[269px]"
            />
            <Image
              src={"/brands-image2.png"}
              width={301}
              height={252}
              alt="brands"
              className="max-w-[170px] max-h-[140px] sm:max-w-[301px] sm:max-h-[252px]"
            />
          </div>
          <div className="mt-8 block lg:hidden relative w-full h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#131aaf]">
            <a
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLScJw4vWyiKFErCKmIwrmFFCjTsnXfXIEuuNPlVkg4l3U7xjCg/viewform?usp=send_form"
              className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full h-[90px] rounded-xl border-[1px] border-[#2D262D] bg-[#4D55F5] flex flex-row gap-2 items-center justify-center"
            >
              <span>Geni Brand болох</span>
              <Image
                src={"/arrow-right-icon.png"}
                alt="arrow"
                width={16}
                height={16}
              />
            </a>
          </div>
        </div>
        <div className="container px-7 mx-auto mt-7">
          <Image
            src={"/brand-cycle.png"}
            width={1348}
            height={442}
            alt="cycle-image"
            className="hidden lg:block mx-auto"
          />
          <Image
            src={"/brand-cycle-mobile.png"}
            width={335}
            height={1505}
            alt="cycle-image-mobile"
            className="block lg:hidden mx-auto"
          />
        </div>
        <Brands />
        <div className="container max-w-7xl px-7 mx-auto py-10">
          <div className="flex flex-col lg:flex-row p-8 gap-10 items-center rounded-3xl border-[#2D262D] border-[1px] bg-[#4D55F5] text-white">
            <div className="flex flex-col gap-4">
              <span className="text-2xl sm:text-3xl font-bold">
                Ad creative-ийн хувьд худалдан авалтад хамгийн их нөлөөлдөг
                хэлбэр нь UGC гэж боддог. Монгол залуус маань энэ шинэ төрлийн
                ad creative-ийн онцгой ач холбогдлыг олж харж Монголынхоо
                бизнесүүдэд санал болгож, нэвтрүүлж байгаад нь үнэхээр
                сайшаалтай байгаа.
              </span>
              <div className="hidden sm:flex flex-row items-center gap-5">
                <Image
                  src={"/lhamour.png"}
                  width={56}
                  height={56}
                  alt="lhamour"
                />
                <span className="text-2xl">
                  Erkhbayar Founder of Titem Brand
                </span>
              </div>
            </div>
            <Image
              src={"/creator-alumni-image.png"}
              width={302}
              height={302}
              alt="creator-alumni"
              className=""
            />
            <div className="flex sm:hidden flex-row items-center gap-5">
              <Image
                src={"/lhamour.png"}
                width={56}
                height={56}
                alt="lhamour"
                className="min-w-[56px]"
              />
              <span className="text-base">
                Erkhbayar Founder of Titem Brand
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-7 container pt-4 pb-12">
          <div className="rounded-2xl px-6 py-8 sm:p-14 border-[1px] border-[#2D262D] bg-[#F5F4F0] flex flex-col lg:flex-row lg:items-center gap-10 sm:gap-6 lg:gap-0 justify-between">
            <div className="flex flex-col gap-6 lg:gap-4 w-full lg:w-1/2">
              <Image
                src={"/genibrand-logo.svg"}
                width={160}
                height={29}
                alt="geni-brand-logo"
              />
              <span className="text-2xl font-bold text-[#6F6F6F]">
                Та Geni Brand болох хүсэлтээ дараах холбоосоор нэвтрэн хүсэлтээ
                илгээгээрэй.
              </span>
            </div>
            <div className="relative w-full lg:max-w-[371px] h-[84px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#131aaf]">
              <a
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLScJw4vWyiKFErCKmIwrmFFCjTsnXfXIEuuNPlVkg4l3U7xjCg/viewform?usp=send_form"
                className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full lg:max-w-[371px] h-[84px] rounded-xl border-[1px] border-[#2D262D] bg-[#4D55F5] flex flex-row gap-2 items-center justify-center"
              >
                <span>Geni Brand болох</span>
                <Image
                  src={"/arrow-right-icon.png"}
                  alt="arrow"
                  width={16}
                  height={16}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
