import React from "react";
import Image from "next/image";

function ContentGallery({ contentsGallery }) {
  return (
    <div className="mt-7 px-3 pt-6 border-t-[1px] border-[#CDCDCD] w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
      {contentsGallery.map((c, i) => (
        <div key={i} className="z-0 col-span-1 relative w-full h-full">
          <Image
            src={c.content}
            width={272}
            height={484}
            alt="dummy"
            className="z-0 w-full"
          />
          <button className="z-50 absolute top-3 right-3 p-2 rounded-lg bg-[#F5F4F0]">
            <Image
              src={"/expand-icon.png"}
              width={24}
              height={24}
              alt="expand"
              className="w-3 h-3 sm:w-6 sm:h-6"
            />
          </button>
          <div className="z-50 absolute bottom-6 left-6 flex flex-row items-center gap-2">
            <Image
              src={"/content-creator-dummy.png"}
              width={22}
              height={22}
              alt="dummy"
            />
            <span className="text-xs md:text-base text-white">{c.name}</span>
            <Image
              src={"/verified-icon.png"}
              width={24}
              height={24}
              alt="verified"
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContentGallery;
