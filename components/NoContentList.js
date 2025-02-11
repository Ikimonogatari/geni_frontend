import React from "react";
import Image from "next/image";

function NoContentList() {
  return (
    <div className="flex flex-col items-center w-full gap-4 mt-11 sm:mt-20">
      <Image src={"/no-content-image.png"} width={149} height={153} alt="" />
      <span className="text-xl text-[#6F6F6F]">
        Контент хараахан ирээгүй байна
      </span>
    </div>
  );
}

export default NoContentList;
