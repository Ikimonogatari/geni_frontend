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
        Бүх Geni Бүтээгчид / {getPublicCreatorListData?.Data?.length}
      </span>
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[10px] sm:gap-4">
        {getPublicCreatorListData?.Data.map((creator, id) => {
          // Find Instagram and Facebook links for each creator
          const instagramLink = creator?.SocialChannels?.find(
            (channel) => channel.PlatformName === "Instagram"
          )?.Link;

          const facebookLink = creator?.SocialChannels?.find(
            (channel) => channel.PlatformName === "Facebook"
          )?.Link;

          return (
            <div
              key={id}
              className="bg-[#F5F4F0] rounded-2xl p-4 text-[#2D262D] border border-[#000000] flex flex-col items-center gap-2 h-full"
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
                  className="aspect-square w-[194px] h-[194px] rounded-full border border-[#000000] object-cover"
                />
              </a>
              <div className="flex flex-row items-center gap-2">
                <a
                  href={`/public-profile/${creator.CreatorId}`}
                  className="hover:underline hover:underline-offset-3 text-lg font-semibold max-w-[150px] whitespace-nowrap overflow-hidden"
                >
                  {creator?.Nickname ? creator?.Nickname : "Geni Бүтээгч"}
                </a>
                <Image
                  src={"/verified-icon.png"}
                  width={20}
                  height={20}
                  alt="verified-icon"
                  className="w-5 h-5"
                />
              </div>
              {creator?.Point && creator?.ContentNumber ? (
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={"/star.png"}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg">
                    {creator?.Point}/5 {creator?.ContentNumber} контент
                  </span>
                </div>
              ) : null}
              <div className="flex flex-row gap-2 mt-3">
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
                      className="w-6 h-6"
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
                      className="w-6 h-6"
                    />
                  </a>
                )}
              </div>
              <p className="text-[#6F6F6F]">{creator?.Bio}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllCreators;
