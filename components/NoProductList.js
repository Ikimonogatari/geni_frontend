import React from "react";
import Image from "next/image";

function NoProductList() {
  return (
    <div className="flex flex-col items-center w-full gap-4 mt-11 sm:mt-20">
      <Image src={"/no-product-image.png"} width={155} height={154} alt="" />
      <span className="text-2xl text-[#6F6F6F]">
        Бүтээгдэхүүн хараахан нэмээгүй байна
      </span>
    </div>
  );
}

export default NoProductList;
