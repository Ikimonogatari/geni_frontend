import React from "react";

import Image from "next/image";

function page() {
  return (
    <div className="w-full h-full bg-white">
      <div className="pt-32 pb-12">
        <div className="container text-[#2D262D] max-w-6xl mx-auto px-7 py-20 flex flex-col">
          <span className="text-[#2D262D] font-bold text-4xl sm:text-5xl xl:text-6xl mt-7 pb-4 border-b border-[#CDCDCD]">
            Product request
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
          <div className="flex flex-row items-center gap-10 mt-7">
            <div className="w-full p-4 bg-[#F5F4F0] rounded-3xl flex flex-row items-center gap-5">
              <Image
                src={"/dummy-brand.png"}
                width={133}
                height={133}
                alt="brand"
                className="rounded-2xl"
              />
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <Image
                    src={"/lhamour.png"}
                    width={48}
                    height={48}
                    alt="logo"
                    className="w-12 h-12 rounded-full border-[1px] border-[#2D262D]"
                  />
                  <span className="text-xl font-bold">lhamour</span>
                </div>
                <div className="flex flex-row items-center gap-5">
                  <span className="text-lg">Нүүрний чийгшүүлэг тос</span>
                  <span className="bg-[#CA7FFE] text-sm font-bold rounded-3xl py-[6px] px-4">
                    Beauty
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 font-bold text-white text-xl">
              <button className="py-4 w-[268px] text-center bg-[#F41919] border border-[#2D262D] rounded-lg">
                Reject
              </button>
              <button className="py-4 w-[268px] text-center bg-[#4FB755] border border-[#2D262D] rounded-lg">
                Approve
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
              auctor ornare leo, non suscipit magna interdum eu.{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
