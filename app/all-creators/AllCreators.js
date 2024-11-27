"use client";
import React from "react";
import Image from "next/image";
import { useGetPublicCreatorListQuery } from "../services/service";

function AllCreators() {
  const {
    data: getPublicCreatorListData,
    error: getPublicCreatorListError,
    isLoading: getPublicCreatorListLoading,
  } = useGetPublicCreatorListQuery();
  return (
    <div className="flex flex-col gap-6">
      <span className="text-[#6F6F6F] text-base sm:text-2xl">
        Бүх Geni бүтээгчид / {getPublicCreatorListData?.Data?.length}
      </span>
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[10px] sm:gap-4">
        {getPublicCreatorListData?.Data.map((creator, id) => {
          const instagramLink = creator?.Socials?.find(
            (channel) => channel.Name === "Instagram"
          )?.SocialAddress;

          const facebookLink = creator?.Socials?.find(
            (channel) => channel.Name === "Facebook"
          )?.SocialAddress;

          return (
            <div
              key={id}
              className="bg-[#F5F4F0] rounded-2xl p-4 text-[#2D262D] border border-[#000000] flex flex-col items-center gap-1 sm:gap-2 h-full"
            >
              <a href={`/public-profile/${creator.CreatorId}`}>
                <Image
                  src={
                    creator?.ProfileLink
                      ? creator?.ProfileLink
                      : "/dummy-profile.png"
                  }
                  width={194}
                  height={194}
                  alt=""
                  className="aspect-square w-[115px] sm:w-[194px] h-[115px] sm:h-[194px] rounded-full border border-[#000000] object-cover"
                />
              </a>
              <div className="flex flex-col-reverse sm:flex-row items-center mt-1 sm:mt-0 gap-1 sm:gap-2">
                <a
                  href={`/public-profile/${creator.CreatorId}`}
                  className="hover:underline hover:underline-offset-3 text-base sm:text-lg font-semibold max-w-[100px] sm:max-w-[150px] whitespace-nowrap overflow-hidden"
                >
                  {creator?.Nickname ? creator?.Nickname : "Geni Бүтээгч"}
                </a>
                {(creator?.Point >= 80 || creator?.LevelIconUrl) && (
                  <Image
                    src={
                      creator?.LevelIconUrl
                        ? creator?.LevelIconUrl
                        : "/verified-icon.png"
                    }
                    width={creator?.LevelIconUrl ? 58 : 24}
                    height={creator?.LevelIconUrl ? 22 : 24}
                    alt=""
                    className={`mt-[2px] ${
                      creator?.LevelIconUrl
                        ? "min-w-[58px] min-h-[22px] max-w-[58px] max-h-[22px]"
                        : "min-w-6 min-h-6 max-w-12 max-h-5"
                    }`}
                  />
                )}
              </div>
              {creator && (
                // creator?.AverageRating !== "0/5" &&
                //   creator?.ContentCount !== 0 &&
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={"/star.png"}
                    width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    alt=""
                  />
                  <span className="text-xs sm:text-base">
                    {creator?.AverageRating} ({creator?.ContentCount} контент)
                  </span>
                </div>
              )}
              <div className="flex flex-row gap-2">
                {instagramLink && (
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
                      className="h-5 w-5 sm:w-6 sm:h-6"
                    />
                  </a>
                )}
                {facebookLink && (
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
                      className="h-5 w-5 sm:w-6 sm:h-6"
                    />
                  </a>
                )}
              </div>
              <p className="text-[#6F6F6F] text-[10px] sm:text-sm line-clamp-4">
                {creator?.Bio}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllCreators;
