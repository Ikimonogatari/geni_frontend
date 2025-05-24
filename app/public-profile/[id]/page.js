"use client";
import React from "react";
import Image from "next/image";
import {
  useListPublicCreatorContentGalleryQuery,
  useGetPublicCreatorByIdQuery,
} from "@/app/services/service";
import Link from "next/link";
import { useParams } from "next/navigation";
import CreatorTier from "@/components/CreatorTier";
import PublicContentGallery from "@/components/PublicContentGallery";

function page() {
  const params = useParams();
  const { id } = params;
  const {
    data: listContentGalleryData,
    error: listContentGalleryError,
    isLoading: listContentGalleryLoading,
  } = useListPublicCreatorContentGalleryQuery(id);
  const {
    data: getUserInfoData,
    error: getUserInfoError,
    isLoading: getUserInfoLoading,
  } = useGetPublicCreatorByIdQuery(id);

  const instagramLink = getUserInfoData?.Socials?.find(
    (channel) => channel.Name === "Instagram"
  );

  const facebookLink = getUserInfoData?.Socials?.find(
    (channel) => channel.Name === "Facebook"
  );
  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start justify-between w-full p-6 sm:p-11 bg-[#F5F4F0] rounded-2xl border border-black">
            <div className="flex flex-row items-center gap-7">
              {getUserInfoData ? (
                <Image
                  src={
                    getUserInfoData?.ProfileLink
                      ? getUserInfoData?.ProfileLink
                      : "/dummy-creator.png"
                  }
                  width={194}
                  height={194}
                  loading="lazy"
                  className="rounded-full w-[90px] h-[90px] sm:w-[194px] sm:h-[194px] aspect-square border border-[#2D262D] object-cover"
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
                  <CreatorTier tier={getUserInfoData?.LevelName} />
                </div>
                {getUserInfoData?.AverageRating &&
                getUserInfoData?.ContentCount ? (
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      src={"/star.png"}
                      width={24}
                      height={24}
                      alt=""
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                    <span className="text-[#2D262D] text-xs sm:text-base">
                      {getUserInfoData?.AverageRating} (
                      {getUserInfoData?.ContentCount} контент)
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  {instagramLink ? (
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
                  ) : (
                    <></>
                  )}
                  {facebookLink ? (
                    <a
                      target="_blank"
                      href={`${facebookLink?.SocialAddress || ""}`}
                    >
                      <Image
                        src={"/Facebook.png"}
                        width={24}
                        height={24}
                        alt=""
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </a>
                  ) : (
                    <></>
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
          {getUserInfoData?.CollabBrands?.length > 0 && (
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl text-[#6F6F6F] mt-5">
                Хамтарсан брэндүүд / {getUserInfoData?.CollabBrands?.length}
              </span>
              <div className="bg-[#F5F4F0] rounded-3xl flex flex-row items-center overflow-x-auto p-3 sm:p-5 gap-2 sm:gap-[14px] my-5">
                {getUserInfoData?.CollabBrands?.map((b, i) => (
                  <Image
                    key={i}
                    src={b?.ProfilePicUrl}
                    alt=""
                    width={74}
                    height={74}
                    className="w-[49px] h-[49px] sm:w-[74px] sm:h-[74px] rounded-full object-cover border border-[#000000]"
                  />
                ))}
              </div>
            </div>
          )}
          {listContentGalleryData?.Data &&
            listContentGalleryData?.Data?.length > 0 && (
              <span className="mt-5 text-lg sm:text-2xl text-[#6F6F6F]">
                Хийсэн контентууд / {listContentGalleryData?.Data?.length}
              </span>
            )}
          {listContentGalleryData && listContentGalleryData?.Data != null ? (
            <PublicContentGallery
              contentsGallery={listContentGalleryData?.Data}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
