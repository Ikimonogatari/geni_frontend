import React from "react";
import CreatorTier from "./CreatorTier";
import Image from "next/image";

function PublicCreatorCard({
  isSwiper,
  size,
  id,
  creator,
  instagramLink,
  facebookLink,
}) {
  return (
    <div
      key={id}
      className={`${size} bg-[#F5F4F0] rounded-2xl p-4 text-[#2D262D] border border-[#000000] flex flex-col items-center gap-1 sm:gap-2 h-full`}
    >
      <a href={`/public-profile/${creator.CreatorId}`}>
        <Image
          src={
            creator?.ProfileLink ? creator?.ProfileLink : "/dummy-creator.png"
          }
          width={194}
          height={194}
          alt=""
          className={`${
            isSwiper
              ? "w-[154px] h-[154px] sm:w-[194px] sm:h-[194px]"
              : "w-[94px] sm:w-[194px] h-[94px] sm:h-[194px]"
          } aspect-square rounded-full border border-[#000000] object-cover`}
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
          href={`/public-profile/${creator.CreatorId}`}
          className={`${
            isSwiper
              ? "text-lg max-w-[150px]"
              : "max-w-[100px] sm:max-w-[150px] text-sm sm:text-lg"
          } hover:underline hover:underline-offset-3 font-semibold whitespace-nowrap overflow-hidden`}
        >
          {creator?.Nickname ? creator?.Nickname : "Geni Бүтээгч"}
        </a>
        <CreatorTier isSwiper={isSwiper} tier={creator?.LevelName} />
      </div>
      {creator && (
        <div
          className={`${
            isSwiper ? "gap-2" : "gap-1 sm:gap-2"
          } flex flex-row items-center`}
        >
          <Image
            src={"/star.png"}
            width={20}
            height={20}
            className={isSwiper ? `w-5 h-5` : `w-3 h-3 sm:w-5 sm:h-5`}
            alt=""
          />
          <span
            className={`${isSwiper ? "text-base" : "text-[10px] sm:text-base"}`}
          >
            {creator?.AverageRating} ({creator?.ContentCount} контент)
          </span>
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
        }text-[#6F6F6F] line-clamp-3`}
      >
        {creator?.Bio}
      </p>
    </div>
  );
}

export default PublicCreatorCard;
