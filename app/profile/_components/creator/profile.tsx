"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  useListContentGalleryQuery,
  useListCreatorContentsQuery,
  useGetBannedTimeQuery,
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
import CreatorProfileHeader from "./CreatorProfileHeader";

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
    refetch: refetchCreatorContents,
  } = useListCreatorContentsQuery(
    { limit: contentsPerPage, offset },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: bannedTimeData,
    error: bannedTimeError,
    isLoading: bannedTimeLoading,
  } = useGetBannedTimeQuery({});

  const isLoading = useMemo(() => {
    return (
      listCreatorContentsLoading ||
      listContentGalleryLoading ||
      bannedTimeLoading
    );
  }, [
    listCreatorContentsLoading,
    listContentGalleryLoading,
    bannedTimeLoading,
  ]);

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

  // Helper function to check if user is banned and get remaining time
  const getBannedStatus = () => {
    if (
      !bannedTimeData?.BanExpireDate ||
      bannedTimeData.BanExpireDate === "0001-01-01 00:00:00"
    ) {
      return { isBanned: false, remainingTime: "" };
    }

    const expireDate = new Date(bannedTimeData.BanExpireDate);
    const currentDate = new Date();

    if (expireDate <= currentDate) {
      return { isBanned: false, remainingTime: "" };
    }

    const timeDiff = expireDate.getTime() - currentDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    let remainingTime = "";
    if (days > 0) {
      remainingTime = `${days} өдөр ${hours} цаг`;
    } else if (hours > 0) {
      remainingTime = `${hours} цаг ${minutes} минут`;
    } else {
      remainingTime = `${minutes} минут`;
    }

    return { isBanned: true, remainingTime };
  };

  const bannedStatus = getBannedStatus();

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20">
          <div className="relative flex flex-row gap-4 items-start sm:items-center justify-between w-full">
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
                  </div>
                </div>
                <span className="text-[#6F6F6F] text-xs sm:text-base">
                  {getUserInfoData ? getUserInfoData.Bio : ""}
                </span>
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  {instagramLink ? (
                    <a
                      target="_blank"
                      className="rounded-3xl border p-2 bg-transparent hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
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
                      className="rounded-3xl border p-2 bg-transparent hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
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
              </div>
            </div>
            <div className="absolute top-0 right-0 sm:block">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <Link
                  href={"/notifications"}
                  className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
                >
                  <Image
                    src={"/notification-icon.png"}
                    width={24}
                    height={24}
                    alt="icon"
                    className="min-w-4 sm:min-w-6 min-h-4 h-4 w-4 sm:min-h-6 sm:h-6 sm:w-6"
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
                    className="min-w-4 sm:min-w-6 min-h-4 h-4 w-4 sm:min-h-6 sm:h-6 sm:w-6"
                  />
                </Link>
              </div>
            </div>
          </div>
          <CreatorProfileHeader userInfoData={getUserInfoData} />
          <div className="mt-4 sm:mt-16 w-full overflow-x-auto">
            {bannedStatus.isBanned ? (
              <div className="mb-4 sm:hidden flex whitespace-nowrap text-xs flex-row justify-center items-center gap-2 bg-[#F75423] border-[1px] border-[#2D262D] px-4 py-2 rounded-lg text-white font-bold cursor-not-allowed">
                Таны блок гарахад: {bannedStatus.remainingTime}
              </div>
            ) : (
              <Link
                href="/products"
                className="mb-4 sm:hidden flex whitespace-nowrap flex-row justify-center text-base items-center gap-2 bg-[#CA7FFE] border-[1px] border-[#2D262D] px-4 py-2 rounded-lg text-white font-bold"
              >
                Бүтээгдэхүүн сонгох
                <Image
                  src={"/add-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                />
              </Link>
            )}
            <div className="z-50 -mb-[2px] flex flex-row items-start justify-between">
              <div className="flex flex-row gap-2 text-xs sm:text-base">
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
                {bannedStatus.isBanned ? (
                  <div className="hidden sm:flex whitespace-nowrap flex-row text-base items-center gap-2 bg-[#F75423] border-[1px] border-[#2D262D] px-4 py-2 rounded-lg text-white font-bold cursor-not-allowed">
                    Таны блок гарахад: {bannedStatus.remainingTime}
                  </div>
                ) : (
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
                )}
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
