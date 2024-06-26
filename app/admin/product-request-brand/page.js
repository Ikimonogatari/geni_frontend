"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

function page() {
  const router = useRouter();

  return (
    <div className="w-full h-full bg-white">
      <div className="pt-32 pb-12">
        <div className="container text-[#2D262D] max-w-6xl mx-auto px-7 py-20 flex flex-col">
          <span className="text-[#2D262D] font-bold text-4xl sm:text-5xl xl:text-6xl mt-7 pb-4 border-b border-[#CDCDCD]">
            Product request
          </span>
          <span className="text-xl font-bold mt-6 mb-4">Brand</span>
          <div className="flex flex-row items-center gap-6">
            <Image
              src={"/lhamour.png"}
              width={92}
              height={92}
              alt="creator"
              className="rounded-full border border-[#2D262D] w-[92px] h-[92px]"
            />
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-row items-center gap-3">
                <span className="text-xl font-bold">Lhamour</span>
                <Image
                  src={"/verified-icon.png"}
                  width={24}
                  height={24}
                  alt="verified"
                  className="w-6 h-6"
                />
              </div>
              <span className="bg-[#CA7FFE] text-sm font-bold rounded-3xl py-[6px] px-4">
                Beauty
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10 mt-7">
            <div className="flex flex-col gap-6">
              <span className="text-lg">Product photos</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-2 w-full">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Image
                      key={i}
                      src={"/dummy-brand.png"}
                      width={140}
                      height={140}
                      alt="brand"
                      className="rounded-xl col-span-1"
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 font-bold text-white text-xl">
              <button className="py-4 w-[268px] text-center bg-[#F41919] border border-[#2D262D] rounded-lg">
                Reject
              </button>
              <button className="py-4 w-[268px] text-center bg-[#4FB755] border border-[#2D262D] rounded-lg">
                Reject
              </button>
            </div>
          </div>
          <div className="flex flex-col mt-6 gap-3">
            <span className="text-xl font-bold">
              Бүтээгдэхүүнийг хүсэж буй шалтгаан:
            </span>
            <span className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
              auctor ornare leo, non suscipit magna interdum eu.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

const advices = [
  "Өөр брэндүүдийн бүтээгдэхүүнийг оруулсан байна.",
  "Агуулга ойлгомжгүй байна.",
  "+18 утга агуулгатай байна.",
  "Бичлэгийн чанар муу",
  "Бичлэг дуугүй байна",
  "Хэтэрхий урт",
];
