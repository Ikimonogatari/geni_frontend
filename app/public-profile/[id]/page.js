"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  useListPublicCreatorContentGalleryQuery,
  useGetPublicCreatorByIdQuery,
  useGetPublicBrandByIdQuery,
} from "@/app/services/service";
import Link from "next/link";
import { useParams } from "next/navigation";
import CreatorTier from "@/components/CreatorTier";
import PublicContentGallery from "@/components/PublicContentGallery";

function page() {
  const params = useParams();
  const { id } = params;
  const [profileType, setProfileType] = useState("Creator"); // Default to creator profile

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

  const {
    data: getBrandInfoData,
    error: getBrandInfoError,
    isLoading: getBrandInfoLoading,
  } = useGetPublicBrandByIdQuery(id);

  // Determine if this is a creator or brand profile
  useEffect(() => {
    if (getUserInfoData && !getUserInfoError) {
      setProfileType("Creator");
    } else if (getBrandInfoData && !getBrandInfoError) {
      setProfileType("Brand");
    }
  }, [getUserInfoData, getBrandInfoData, getUserInfoError, getBrandInfoError]);

  // Get social links based on profile type
  const getSocialLinks = () => {
    const profileData =
      profileType === "Creator" ? getUserInfoData : getBrandInfoData;

    const instagramLink = profileData?.Socials?.find(
      (channel) => channel.Name === "Instagram"
    );

    const facebookLink = profileData?.Socials?.find(
      (channel) => channel.Name === "Facebook"
    );

    return { instagramLink, facebookLink };
  };

  const { instagramLink, facebookLink } = getSocialLinks();

  // Render creator profile section
  const renderCreatorProfile = () => {
    if (!getUserInfoData) return null;

    return (
      <>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start justify-between w-full p-6 sm:p-11 bg-[#F5F4F0] rounded-2xl border border-black">
          <div className="flex flex-row items-center gap-7">
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
                ) : null}
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
                ) : null}
              </div>

              <span className="text-[#6F6F6F] text-xs sm:text-base">
                {getUserInfoData.Bio}
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
      </>
    );
  };

  // Render brand profile section
  const renderBrandProfile = () => {
    if (!getBrandInfoData) return null;

    return (
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start justify-between w-full p-6 sm:p-11 bg-[#F5F4F0] rounded-2xl border border-black">
        <div className="flex flex-row items-center gap-7">
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
              ) : null}
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
              ) : null}
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
    );
  };

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20 flex flex-col">
          {profileType === "Creator"
            ? renderCreatorProfile()
            : renderBrandProfile()}

          {listContentGalleryData?.Data &&
            listContentGalleryData?.Data?.length > 0 && (
              <span className="my-5 text-lg sm:text-2xl text-[#6F6F6F]">
                {profileType === "Creator"
                  ? "Хийсэн контентууд"
                  : "Хамтран ажилласан контентууд"}{" "}
                / {listContentGalleryData?.Data?.length}
              </span>
            )}

          {listContentGalleryData && listContentGalleryData?.Data != null ? (
            <PublicContentGallery
              contentsGallery={listContentGalleryData?.Data}
              profileType={profileType}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default page;
