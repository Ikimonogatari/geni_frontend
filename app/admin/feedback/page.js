"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

function page() {
  const router = useRouter();

  return (
    <div className="w-full h-full bg-white">
      <div className="pt-32 pb-12">
        <div className="container text-[#2D262D] max-w-5xl mx-auto px-7 py-20 flex flex-col">
          <span className="text-[#2D262D] font-bold text-4xl sm:text-5xl xl:text-6xl mt-7 pb-4 border-b border-[#CDCDCD]">
            Feedback & Reject
          </span>
          <span className="text-xl font-bold mt-6 mb-4">Creator</span>
          <div className="flex flex-row items-center gap-6">
            <Image
              src={"/dummy-creator.png"}
              width={92}
              height={92}
              alt="creator"
              className="rounded-xl w-[92px] h-[92px]"
            />
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-3">
                <span className="text-xl font-bold">Davaanaa Bayraa</span>
                <Image
                  src={"/verified-icon.png"}
                  width={24}
                  height={24}
                  alt="verified"
                  className="w-6 h-6"
                />
              </div>
              <span className="text-lg">1020 xp</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8 mb-4">
            <span className="text-xl font-bold">Илгээх зөвлөгөө</span>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-3">
                <span className="bg-[#F5F4F0] rounded-2xl p-5 w-full">
                  Ёс бус хэллэг агуулагдсан байна.
                </span>
                <button className="bg-[#F41919] rounded-2xl p-5 w-[60px] h-[60px] flex justify-center items-center">
                  <Image
                    src={"/remove-icon.png"}
                    width={18}
                    height={18}
                    alt="remove"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4 mb-10">
            <span className="text-xl font-bold">Зөвлөгөө сонгох</span>
            <div className="flex flex-col gap-3">
              {advices.map((a, i) => (
                <div key={i} className="flex flex-row gap-3">
                  <span className="bg-[#F5F4F0] rounded-2xl p-5 w-full">
                    {a}
                  </span>
                  <button className="bg-[#4FB755] rounded-2xl p-5 w-[60px] h-[60px] flex justify-center items-center">
                    <Image
                      src={"/add-icon.png"}
                      width={18}
                      height={18}
                      alt="add"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 text-white font-bold">
            <button className="py-4 w-[320px] text-center bg-[#F49D19] rounded-lg border border-[#2D262D]">
              Add feedback
            </button>
            <button className="py-4 w-[320px] text-center bg-[#4FB755] rounded-lg border border-[#2D262D]">
              Send feedback & reject
            </button>
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
