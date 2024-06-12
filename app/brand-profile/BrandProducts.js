import React from "react";
import Image from "next/image";

function BrandProducts({ brandProducts }) {
  return (
    <div className="mt-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
      <div className="p-5 grid grid-cols-4 gap-6 w-full items-center text-[#6F6F6F]">
        <div className="col-span-1 flex flex-row items-center justify-between">
          <span className="">Бүтээгдэхүүн</span>

          <Image
            src={"/brand-profile-arrow-icon.png"}
            width={24}
            height={24}
            alt="arrow"
          />
        </div>
        <span className="col-span-1">Тоо хэмжээ</span>

        <div className="col-span-1 flex flex-row items-center justify-between">
          <span>Статус</span>
          <Image
            src={"/brand-profile-arrow-icon.png"}
            width={24}
            height={24}
            alt="arrow"
          />
        </div>
        <span className="col-span-1">Үйлдэл</span>
      </div>
      {brandProducts.map((b, i) => (
        <div
          key={i}
          className="w-full grid grid-cols-4 gap-6 items-center p-5 border-[#CDCDCD] border-[1px] rounded-3xl"
        >
          <span className="col-span-1">{b.name}</span>

          <span className="col-span-1">{b.amount}</span>
          <div
            className={`${
              b.status === "Идэвхтэй" ? "text-[#4FB755]" : "text-[#F41919]"
            } col-span-1`}
          >
            <span className="">{b.status}</span>
          </div>
          <div>
            <button className="bg-[#4D55F5] px-5 py-2 rounded-lg text-white font-bold">
              Нэмэх
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BrandProducts;

const stages = [
  "/stage-icon1.png",
  "/stage-icon2.png",
  "/stage-icon3.png",
  "/stage-icon4.png",
];
