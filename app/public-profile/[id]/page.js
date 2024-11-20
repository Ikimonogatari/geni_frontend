"use client";
import React from "react";
import Image from "next/image";
import {
  useGetUserInfoQuery,
  useListContentGalleryQuery,
  useListCreatorContentsQuery,
} from "@/app/services/service";
import Link from "next/link";
import ContentGallery from "@/app/components/ContentGallery";

function page() {
  const {
    data: listContentGalleryData,
    error: listContentGalleryError,
    isLoading: listContentGalleryLoading,
  } = useListContentGalleryQuery();
  const {
    data: getUserInfoData,
    error: getUserInfoError,
    isLoading: getUserInfoLoading,
  } = useGetUserInfoQuery();
  const {
    data: listCreatorContentsData,
    error: listCreatorContentsError,
    isLoading: listCreatorContentsLoading,
  } = useListCreatorContentsQuery();

  const instagramLink = getUserInfoData?.SocialChannels?.find(
    (channel) => channel.PlatformName === "Instagram"
  );

  const facebookLink = getUserInfoData?.SocialChannels?.find(
    (channel) => channel.PlatformName === "Facebook"
  );
  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start justify-between w-full p-6 sm:p-11 bg-[#F5F4F0] rounded-2xl border border-black">
            <div className="flex flex-row items-center gap-7">
              {getUserInfoData ? (
                <Image
                  src={
                    getUserInfoData?.ProfileLink
                      ? getUserInfoData?.ProfileLink
                      : "/dummy-profile.jpg"
                  }
                  width={194}
                  height={194}
                  loading="lazy"
                  className="rounded-full w-[90px] h-[90px] sm:w-[194px] sm:h-[194px] aspect-square border border-[#2D262D]"
                  alt=""
                />
              ) : (
                <div className="w-[90px] h-[90px] sm:w-[194px] sm:h-[194px]"></div>
              )}
              <div className="flex flex-col gap-1 sm:gap-2">
                <div className="flex flex-row items-center gap-3">
                  <span className="text-[#2D262D] text-base sm:text-2xl font-bold">
                    {getUserInfoData?.Nickname}
                  </span>

                  <Image
                    src={
                      getUserInfoData?.LevelIconUrl
                        ? getUserInfoData?.LevelIconUrl
                        : "/verified-icon.png"
                    }
                    width={getUserInfoData?.LevelIconUrl ? 58 : 24}
                    height={getUserInfoData?.LevelIconUrl ? 22 : 24}
                    alt=""
                    className={`mt-[2px] ${
                      getUserInfoData?.LevelIconUrl
                        ? "min-w-[58px] min-h-[22px] max-w-[58px] max-h-[22px]"
                        : "min-w-6 min-h-6 max-w-12 max-h-5"
                    }`}
                  />
                </div>
                {getUserInfoData?.AverageRating &&
                  getUserInfoData?.ContentCount && (
                    <div className="flex flex-row items-center gap-3">
                      <Image
                        src={"/star.png"}
                        width={24}
                        height={24}
                        alt="verified-icon"
                        className="w-4 h-4 sm:w-6 sm:h-6"
                      />
                      <span className="text-[#2D262D] text-xs sm:text-base">
                        {getUserInfoData?.AverageRating} (
                        {getUserInfoData?.ContentCount} контент)
                      </span>
                    </div>
                  )}
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  {instagramLink && (
                    <a
                      target="_blank"
                      href={`${instagramLink?.SocialAddress || ""}`}
                    >
                      <Image
                        src={"/Instagram.png"}
                        width={24}
                        height={24}
                        alt="ig"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </a>
                  )}
                  {facebookLink && (
                    <a
                      target="_blank"
                      href={`${facebookLink?.SocialAddress || ""}`}
                    >
                      <Image
                        src={"/Facebook.png"}
                        width={24}
                        height={24}
                        alt="fb"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </a>
                  )}
                </div>

                <span className="text-[#6F6F6F] text-xs sm:text-base">
                  {getUserInfoData ? getUserInfoData.Bio : ""}
                </span>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[#2D262D]">
                  {getUserInfoData?.Category?.map((c, i) => (
                    <button
                      key={i}
                      className="bg-[#CA7FFE] font-semibold rounded-full px-4 py-2"
                    >
                      {c.Category_id.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {listContentGalleryData && listContentGalleryData?.Data != null ? (
            <ContentGallery contentsGallery={listContentGalleryData?.Data} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
