"use client";
import React from "react";
import Image from "next/image";
import {
  useListPublicCreatorContentGalleryQuery,
  useGetPublicBrandByIdQuery,
} from "@/app/services/service";
import Link from "next/link";
import ContentGallery from "@/components/ContentGallery";
import { useParams } from "next/navigation";
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
    data: getBrandInfoData,
    error: getBrandInfoError,
    isLoading: getBrandInfoLoading,
  } = useGetPublicBrandByIdQuery(id);

  const instagramLink = getBrandInfoData?.Socials?.find(
    (channel) => channel.Name === "Instagram"
  );

  const facebookLink = getBrandInfoData?.Socials?.find(
    (channel) => channel.Name === "Facebook"
  );

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start justify-between w-full p-6 sm:p-11 bg-[#F5F4F0] rounded-2xl border border-black">
            <div className="flex flex-row items-center gap-7">
              {getBrandInfoData ? (
                <Image
                  src={
                    getBrandInfoData?.ProfileLink
                      ? getBrandInfoData?.ProfileLink
                      : "/dummy-brand.png"
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
                    {getBrandInfoData?.Name || "Geni Брэнд"}
                  </span>
                </div>
                {getBrandInfoData?.BrandTypes &&
                  getBrandInfoData?.BrandTypes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getBrandInfoData.BrandTypes.map((brandType, index) => (
                        <span
                          key={index}
                          className="bg-geni-blue text-white rounded-full px-3 py-1 text-sm"
                        >
                          {brandType.TypeName}
                        </span>
                      ))}
                    </div>
                  )}
                <div className="flex flex-row items-center gap-3">
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
                        className="w-4 h-4 sm:w-6 sm:h-6"
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
                        className="w-4 h-4 sm:w-6 sm:h-6"
                      />
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
                <span className="hidden sm:block text-[#6F6F6F] text-xs sm:text-base">
                  {getBrandInfoData?.Bio || getBrandInfoData?.Description}
                </span>
              </div>
            </div>
            <span className="block sm:hidden text-[#6F6F6F] text-xs sm:text-base">
              {getBrandInfoData?.Bio || getBrandInfoData?.Description}
            </span>
          </div>
          {listContentGalleryData?.Data &&
            listContentGalleryData?.Data?.length > 0 && (
              <span className="my-5 text-lg sm:text-2xl text-[#6F6F6F]">
                Хамтран ажилласан контентууд /{" "}
                {listContentGalleryData?.Data?.length}
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
