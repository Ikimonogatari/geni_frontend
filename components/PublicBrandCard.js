import React from "react";
import Image from "next/image";

function PublicBrandCard({
  isSwiper,
  size,
  id,
  brand,
  instagramLink,
  facebookLink,
}) {
  return (
    <div
      key={id}
      className={`${size} bg-[#F5F4F0] rounded-2xl p-4 text-[#2D262D] border border-border-gray/60 flex flex-col items-center gap-1 sm:gap-2 h-full`}
    >
      <a href={`/public-profile/${brand.BrandId}`}>
        <Image
          src={brand?.ProfileLink ? brand?.ProfileLink : "/dummy-brand.png"}
          width={194}
          height={194}
          alt=""
          className={`${
            isSwiper
              ? "w-[154px] h-[154px] sm:w-[194px] sm:h-[194px]"
              : "w-[94px] sm:w-[194px] h-[94px] sm:h-[194px]"
          } aspect-square rounded-full border border-border-gray/60 object-cover`}
        />
      </a>
      <div
        className={`flex flex-row items-center ${
          isSwiper
            ? "gap-1 sm:gap-2 mt-1 sm:mt-0"
            : "gap-1 mt-1 sm:mt-0 sm:gap-2"
        }`}
      >
        <a
          href={`/public-profile/${brand.BrandId}`}
          className={`${
            isSwiper
              ? "text-lg max-w-[150px]"
              : "max-w-[100px] sm:max-w-[150px] text-sm sm:text-lg"
          } hover:underline hover:underline-offset-3 font-semibold whitespace-nowrap overflow-hidden`}
        >
          {brand?.Name ? brand?.Name : "Geni Брэнд"}
        </a>
      </div>
      {brand?.BrandTypes && brand?.BrandTypes.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center">
          {brand.BrandTypes.slice(0, 2).map((brandType, index) => (
            <span
              key={index}
              className={`bg-geni-blue text-white rounded-full px-2 py-1 ${
                isSwiper ? "text-xs" : "text-[8px] sm:text-xs"
              }`}
            >
              {brandType.TypeName}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-row gap-2">
        {instagramLink ? (
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75"
          >
            <Image
              src="/Instagram.png"
              width={24}
              height={24}
              alt=""
              className={`${isSwiper ? "w-6 h-6" : "h-4 w-4 sm:w-6 sm:h-6"} `}
            />
          </a>
        ) : (
          <></>
        )}
        {facebookLink ? (
          <a
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75"
          >
            <Image
              src="/Facebook.png"
              width={24}
              height={24}
              alt=""
              className={`${isSwiper ? "w-6 h-6" : "h-4 w-4 sm:w-6 sm:h-6"} `}
            />
          </a>
        ) : (
          <></>
        )}
      </div>
      <p
        className={`${
          isSwiper ? "text-xs sm:text-sm" : "text-[8px] sm:text-sm md:text-base"
        } text-[#6F6F6F] line-clamp-3 text-center`}
      >
        {brand?.Bio || brand?.Description}
      </p>
    </div>
  );
}

export default PublicBrandCard;
