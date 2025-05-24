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
import { Skeleton } from "@/components/ui/skeleton";
import usePagination from "@/components/hooks/usePagination";
import Pagination from "@/components/common/Pagination";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreatorTier from "@/components/CreatorTier";
import { useRouter } from "next/navigation";

function CreatorProfile({ getUserInfoData, getUserInfoLoading }) {
  const router = useRouter();
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
    refetch: refetchCreatorContents,
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
        return (
          <ContentProgress
            currentContents={currentContents}
            refetchCreatorContents={refetchCreatorContents}
          />
        );
      case "content-gallery":
        return <ContentGallery contentsGallery={currentContents} />;

      default:
        return (
          <ContentProgress
            currentContents={currentContents}
            refetchCreatorContents={refetchCreatorContents}
          />
        );
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
      <div className="pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20">
          <div className="flex flex-col sm:flex-row gap-4 items-start justify-between w-full">
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
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href="/profile/point-board">
                            <Image
                              src={"/info-icon.png"}
                              width={24}
                              height={24}
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                              alt=""
                            />
                          </Link>
                        </TooltipTrigger>
                        {/* @ts-ignore */}
                        <TooltipContent>
                          <span>Таны онооны самбар</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
            <div className="w-full sm:w-auto flex flex-row items-center justify-between sm:justify-normal sm:items-end sm:flex-col gap-2 sm:gap-4">
              <Link
                href={"/wallet"}
                className="flex flex-row items-center gap-2 p-2 sm:px-4 sm:py-2 bg-[#4FB755] rounded-lg min-w-10"
              >
                <Image
                  src={"/wallet-icon.png"}
                  height={24}
                  width={24}
                  alt=""
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
                <span className="text-white text-sm sm:text-base whitespace-nowrap">
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
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Level/XP Progress */}
              <div className="flex-1 flex flex-col">
                <span className="text-sm text-[#6F6F6F]">Түвшин:</span>
                <div className="flex-1 flex flex-col items-start justify-center border border-[#EDEDED] rounded-2xl px-4 py-2 min-w-[220px] h-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#E28A6E] text-white font-bold rounded-full px-3 py-1 text-xs">
                      PRO
                    </span>
                    <div className="flex-1 flex items-center">
                      <div className="relative w-32 h-6 mx-2">
                        <div className="absolute top-0 left-0 w-full h-full bg-[#F5F4F0] rounded-full"></div>
                        <div
                          className="absolute top-0 left-0 h-full bg-[#4FB755] rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              (getUserInfoData?.Point ?? 0) /
                                ((getUserInfoData?.NextLevelPoint ?? 1000) /
                                  100),
                              100
                            )}%`,
                          }}
                        ></div>
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                          {getUserInfoData?.Point ?? 0}
                        </span>
                      </div>
                      <span className="font-bold text-base text-[#2D262D] ml-2">
                        xp
                      </span>
                    </div>
                    <Link href="/profile/point-board">
                      <Image
                        src="/info-icon.png"
                        width={20}
                        height={20}
                        alt="info"
                      />
                    </Link>
                  </div>
                  <span className="text-xs text-[#6F6F6F]">
                    Дараагийн түвшинд гарахад{" "}
                    <span className="font-bold text-[#2D262D]">
                      {(getUserInfoData?.NextLevelPoint ?? 1000) -
                        (getUserInfoData?.Point ?? 0)}{" "}
                      XP
                    </span>{" "}
                    дутуу
                  </span>
                </div>
              </div>
              {/* Rating */}
              <div className="flex-1 flex flex-col">
                <span className="text-sm text-[#6F6F6F]">Үнэлгээ:</span>
                <div className="flex-1 flex flex-col items-center justify-center border border-[#EDEDED] rounded-2xl px-4 py-2 min-w-[180px] h-full">
                  <div className="flex items-center gap-2">
                    <Image src="/star.png" width={24} height={24} alt="star" />
                    <span className="font-bold text-lg">
                      {getUserInfoData?.AverageRating ?? "-"}
                    </span>
                    <span className="text-[#6F6F6F] text-sm">
                      ({getUserInfoData?.ContentCount ?? 0} contents)
                    </span>
                  </div>
                </div>
              </div>
              {/* Geni Point */}
              <div className="flex-1 flex flex-col">
                <span className="text-sm text-[#6F6F6F]">Geni хэтэвч:</span>
                <div className="flex-1 flex flex-col items-center justify-center border border-[#EDEDED] rounded-2xl px-4 py-2 min-w-[180px] h-full">
                  <span className="text-[#6F6F6F] text-sm">Geni Point:</span>
                  <span className="font-bold text-2xl text-[#2D262D]">
                    {getUserInfoData?.GeniPoint?.toLocaleString() ?? "0"}
                  </span>
                </div>
              </div>
              {/* Badges */}
              <div className="flex-1 flex flex-col">
                <span className="text-sm text-[#6F6F6F]">Цол:</span>
                <div
                  className="flex-1 flex flex-row items-center justify-center border border-[#EDEDED] rounded-2xl px-4 py-2 min-w-[120px] gap-2 h-full cursor-pointer hover:bg-geni-gray transition-all duration-300 ease-in-out"
                  onClick={() => router.push("/profile/achievements")}
                >
                  {/* Replace with actual badge icons and logic */}
                  <Image
                    src="/badge1.png"
                    width={40}
                    height={40}
                    alt="badge1"
                  />
                  <Image
                    src="/badge2.png"
                    width={40}
                    height={40}
                    alt="badge2"
                  />
                  <Image
                    src="/badge3.png"
                    width={40}
                    height={40}
                    alt="badge3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-8 w-full overflow-x-auto">
            <Link
              href="/products"
              className="mb-4 sm:hidden flex whitespace-nowrap flex-row justify-center text-base items-center gap-2 bg-[#CA7FFE] border-[1px] border-[#2D262D] px-4 py-2 rounded-lg text-white font-bold"
            >
              Бүтээгдэхүүн сонгох
              <Image src={"/add-icon.png"} width={14} height={14} alt="arrow" />
            </Link>
            <div className="z-50 -mb-[2px] flex flex-row items-start justify-between">
              <div className="flex flex-row gap-2">
                {creatorProfileButtons.map((b, i) => (
                  <div
                    key={i}
                    onClick={() => setProfileState(b.value)}
                    className={`cursor-pointer text-center rounded-t-2xl ${
                      b.value === profileState
                        ? "pb-3 bg-white border border-[#CDCDCD] border-b-0 font-medium"
                        : "pb-3 text-[#6F6F6F] border-t border-x-[1px] border-transparent"
                    }`}
                  >
                    <div
                      className={`font-bold w-full text-center px-4 py-2 ${
                        b.value === profileState
                          ? ""
                          : "border border-[#CDCDCD] rounded-lg"
                      }`}
                    >
                      {b.title}
                    </div>
                    {b.value === profileState && (
                      <div className="border-[#CA7FFE] border-b-[3px] w-14 mx-auto"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Link
                  href="/products"
                  className="hidden sm:flex whitespace-nowrap flex-row text-base items-center gap-2 bg-[#CA7FFE] border-[1px] border-[#2D262D] px-4 py-2 rounded-lg text-white font-bold"
                >
                  Бүтээгдэхүүн сонгох
                  <Image
                    src={"/add-icon.png"}
                    width={14}
                    height={14}
                    alt="arrow"
                  />
                </Link>
              </div>
            </div>

            <div className={`border-t border-[#CDCDCD] py-3 `}>
              {currentContents && !isLoading ? (
                renderCreatorProfile()
              ) : (
                <div className="space-y-6 mt-2">
                  {[...Array(8)].map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[42px] sm:h-[66px] w-full rounded-3xl"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
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

const creatorProfileButtons = [
  {
    title: "Контент статус",
    value: "content-progress",
  },
  {
    title: "Миний контент",
    value: "content-gallery",
  },
];
