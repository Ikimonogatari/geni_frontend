"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  useListContentGalleryQuery,
  useListCreatorContentsQuery,
} from "@/app/services/service";
import Link from "next/link";

import ContentProgress from "./ContentProgress";
import ContentGallery from "@/components/ContentGallery";
import CreatorTier from "@/components/CreatorTier";
import TierInfoModal from "@/components/TierInfoModal";
import LogoutButton from "@/components/common/LogoutButton";
import { Skeleton } from "@/components/ui/skeleton";
import usePagination from "@/components/hooks/usePagination";
import Pagination from "@/components/common/Pagination";

function CreatorProfile({ getUserInfoData, getUserInfoLoading }) {
  const [profileState, setProfileState] = useState("content-progress");
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 12;
  const [currentContents, setCurrentContents] = useState([]);
  const offset = (currentPage - 1) * contentsPerPage;

  const {
    data: listContentGalleryData,
    error: listContentGalleryError,
    isLoading: listContentGalleryLoading,
  } = useListContentGalleryQuery({});

  const {
    data: listCreatorContentsData,
    error: listCreatorContentsError,
    isLoading: listCreatorContentsLoading,
  } = useListCreatorContentsQuery(
    { limit: contentsPerPage, offset },
    { refetchOnMountOrArgChange: true }
  );

  const isLoading = useMemo(() => {
    return listCreatorContentsLoading || listContentGalleryLoading;
  }, [listCreatorContentsLoading, listContentGalleryLoading]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, getTotalPages()));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const contents = getCurrentContents();
    setCurrentContents(contents);
  }, [
    currentPage,
    profileState,
    listCreatorContentsData,
    listContentGalleryData,
  ]);

  const getCurrentContents = () => {
    let contents;
    switch (profileState) {
      case "content-progress":
        contents = listCreatorContentsData?.Data ?? [];
        break;
      case "content-gallery":
        contents = listContentGalleryData?.Data ?? [];
        break;
      default:
        contents = listCreatorContentsData?.Data ?? [];
    }

    return contents;
  };

  const getTotalPages = () => {
    let totalCount;
    switch (profileState) {
      case "content-progress":
        totalCount = listCreatorContentsData?.RowCount ?? null;
        break;
      case "content-gallery":
        totalCount = listContentGalleryData?.RowCount ?? null;
        break;
    }
    return Math.ceil(totalCount / contentsPerPage);
  };

  const renderCreatorProfile = () => {
    switch (profileState) {
      case "content-progress":
        return <ContentProgress currentContents={currentContents} />;
      case "content-gallery":
        return <ContentGallery contentsGallery={currentContents} />;

      default:
        return <ContentProgress currentContents={currentContents} />;
    }
  };

  const totalPages = getTotalPages();

  const pageNumbers = usePagination(totalPages, currentPage);

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
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start justify-between w-full">
            <div className="flex flex-row items-center gap-3 sm:gap-7">
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
                  className="rounded-full sm:rounded-xl w-[90px] h-[90px] sm:w-[194px] sm:h-[194px] aspect-square border border-[#2D262D] object-cover"
                  alt=""
                />
              ) : (
                <div className="w-[90px] h-[90px] sm:w-[194px] sm:h-[194px]"></div>
              )}
              <div className="flex flex-col gap-1 sm:gap-2">
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-[#2D262D] text-base sm:text-2xl font-bold">
                      {getUserInfoLoading
                        ? ""
                        : getUserInfoData?.Nickname || "Geni бүтээгч"}
                    </span>

                    <CreatorTier
                      tier={getUserInfoData?.LevelName}
                      isSwiper={false}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-1 sm:gap-2">
                    <span className="text-sm sm:text-lg">
                      {getUserInfoData && <>{getUserInfoData.Point} xp</>}
                    </span>
                    <TierInfoModal />
                  </div>
                </div>
                {getUserInfoData?.AverageRating &&
                getUserInfoData?.ContentCount ? (
                  <div className="flex flex-row items-center gap-2 sm:gap-3">
                    <Image
                      src={"/star.png"}
                      width={24}
                      height={24}
                      alt=""
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                    <span className="text-[#2D262D] text-xs sm:text-base">
                      {getUserInfoData?.AverageRating} дундаж үнэлгээ (
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
                <span className="hidden sm:block text-[#6F6F6F] text-xs sm:text-base">
                  {getUserInfoData ? getUserInfoData.Bio : ""}
                </span>
              </div>
            </div>
            <span className="block sm:hidden text-[#6F6F6F] text-xs sm:text-base">
              {getUserInfoData ? getUserInfoData.Bio : ""}
            </span>
            <div className="w-full sm:w-auto flex flex-row items-center justify-between sm:justify-normal sm:items-center sm:flex-col gap-2 sm:gap-4">
              <Link
                href={"/wallet"}
                className="flex flex-row items-center gap-2 p-2 sm:px-4 sm:py-2 bg-[#4FB755] rounded-lg"
              >
                <Image
                  src={"/wallet-icon.png"}
                  height={24}
                  width={24}
                  alt=""
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
                <span className="text-white text-sm sm:text-base">
                  Geni хэтэвч
                </span>
              </Link>
              <div className="flex flex-row items-center gap-2 sm:gap-4">
                <Link
                  href={"/notifications"}
                  className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
                >
                  <Image
                    src={"/notification-icon.png"}
                    width={24}
                    height={24}
                    alt="icon"
                    className="min-w-5 sm:min-w-6 min-h-5 h-5 w-5 sm:min-h-6 sm:h-6 sm:w-6"
                  />
                </Link>
                <Link
                  href="/profile/edit"
                  className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
                >
                  <Image
                    src={"/edit-profile-icon.png"}
                    width={24}
                    height={24}
                    alt="icon"
                    className="min-w-5 sm:min-w-6 min-h-5 h-5 w-5 sm:min-h-6 sm:h-6 sm:w-6"
                    min-
                  />
                </Link>
                <LogoutButton />
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-16 w-full overflow-x-auto">
            <div className="min-w-[380px] gap-2 sm:gap-0 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2 sm:gap-3">
                {brandProfileButtons.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setProfileState(b.value)}
                    className={`${
                      b.value === profileState
                        ? "bg-[#CA7FFE] text-white"
                        : "text-[#6F6F6F]"
                    } border-[1px] border-[#CDCDCD] whitespace-nowrap px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-base`}
                  >
                    {b.title}
                  </button>
                ))}
              </div>
              <Link
                href="/products"
                className="flex flex-row whitespace-nowrap items-center gap-2 bg-[#CA7FFE] border-[1px] border-[#CDCDCD] text-sm sm:text-base px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold"
              >
                Бүтээгдэхүүн үзэх
                <Image
                  src={"/arrow-right-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                />
              </Link>
            </div>
          </div>
          {currentContents && !isLoading ? (
            renderCreatorProfile()
          ) : (
            <div className="space-y-6 mt-10">
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[42px] sm:h-[66px] w-full rounded-3xl"
                />
              ))}
            </div>
          )}
        </div>
        {listCreatorContentsData && totalPages > 1 ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            paginate={paginate}
            bg={"bg-geni-pink"}
            border={"border-geni-pink"}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CreatorProfile;

const brandProfileButtons = [
  {
    title: "Контент статус",
    value: "content-progress",
  },
  {
    title: "Контент",
    value: "content-gallery",
  },
];
