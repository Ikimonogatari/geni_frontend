"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetPublicCreatorListQuery } from "../services/service";

function AllCreators() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: getPublicCreatorListData,
    error: getPublicCreatorListError,
    isLoading: getPublicCreatorListLoading,
  } = useGetPublicCreatorListQuery();

  const filteredCreators = getPublicCreatorListData?.Data?.filter((creator) =>
    creator?.Nickname?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <span className="text-[#6F6F6F] text-base sm:text-2xl">
        Бүх Geni бүтээгчид / {getPublicCreatorListData?.Data?.length || 0}
      </span>
      <div className="bg-[#F2F2F2] rounded-xl w-full flex flex-row items-center justify-between gap-2 px-4 py-3 sm:pl-10 sm:pr-6 sm:py-6">
        <input
          className="bg-inherit outline-none w-full placeholder:text-[#6F6F6F] placeholder:text-sm sm:placeholder:text-base"
          placeholder="Хайлт хийх..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Image
          src={"/search-icon.png"}
          width={24}
          height={24}
          alt="search"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] sm:gap-4">
        {filteredCreators?.map((creator, id) => {
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
                  className="aspect-square w-[94px] sm:w-[194px] h-[94px] sm:h-[194px] rounded-full border border-[#000000] object-cover"
                />
              </a>
              <div className="flex flex-row items-center mt-1 sm:mt-0 gap-1 sm:gap-2">
                <a
                  href={`/public-profile/${creator.CreatorId}`}
                  className="hover:underline hover:underline-offset-3 text-sm sm:text-lg font-semibold max-w-[100px] sm:max-w-[150px] whitespace-nowrap overflow-hidden"
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
                        ? "w-[29px] h-[11px] sm:w-[58px] sm:h-[22px]"
                        : "w-6 h-6"
                    }`}
                  />
                )}
              </div>
              {creator && (
                <div className="flex flex-row items-center gap-1 sm:gap-2">
                  <Image
                    src={"/star.png"}
                    width={20}
                    height={20}
                    className="w-3 h-3 sm:w-5 sm:h-5"
                    alt=""
                  />
                  <span className="text-[10px] sm:text-base">
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
                      className="h-4 w-4 sm:w-6 sm:h-6"
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
                      className="h-4 w-4 sm:w-6 sm:h-6"
                    />
                  </a>
                )}
              </div>
              <p className="text-[#6F6F6F] text-[8px] sm:text-sm line-clamp-4">
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
