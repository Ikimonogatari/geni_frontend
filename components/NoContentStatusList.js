import React from "react";
import Image from "next/image";

function NoContentStatusList() {
  return (
    <div className="flex flex-col items-center w-full gap-4 mt-11 sm:mt-20">
      <Image
        src={"/no-content-status-image.png"}
        width={212}
        height={154}
        alt=""
      />
      <span className="text-xl text-[#6F6F6F]">
        Хамтрал хараахан хийгдээгүй байна
      </span>
    </div>
  );
}

export default NoContentStatusList;
