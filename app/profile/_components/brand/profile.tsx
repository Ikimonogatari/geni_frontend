"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ContentProgress from "./ContentProgress";
import BrandProducts from "./BrandProducts";
import {
  useGetUserInfoQuery,
  useListBrandContentsQuery,
  useListBrandProductsQuery,
  useListContentGalleryQuery,
} from "@/app/services/service";
import Link from "next/link";
import BrandContentGallery from "./BrandContentGallery";
import LogoutButton from "@/components/common/LogoutButton";
import CreditPurchase from "@/components/credit/CreditPurchaseModal";
import GuideModal from "@/components/common/GuideModal";
import OnBoardRequestStateModal from "@/components/common/OnBoardRequestStateModal";
import { Skeleton } from "@/components/ui/skeleton";

function BrandProfile({ getUserInfoData, getUserInfoLoading }) {
  const [profileState, setProfileState] = useState("content-progress");
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 16;
  const [currentContents, setCurrentContents] = useState([]);
  const offset = (currentPage - 1) * contentsPerPage;

  const {
    data: listBrandContentsData,
    error: listBrandContentsError,
    isLoading: listBrandContentsLoading,
  } = useListBrandContentsQuery(
    { limit: contentsPerPage, offset },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: listContentGalleryData,
    error: listContentGalleryError,
    isLoading: listContentGalleryLoading,
  } = useListContentGalleryQuery(
    { limit: contentsPerPage, offset },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: listBrandProductsData,
    error: listBrandProductsError,
    isLoading: listBrandProductsLoading,
  } = useListBrandProductsQuery(
    { limit: contentsPerPage, offset },
    { refetchOnMountOrArgChange: true }
  );

  const isLoading = useMemo(() => {
    return (
      listBrandContentsLoading ||
      listContentGalleryLoading ||
      listBrandProductsLoading
    );
  }, [
    listBrandContentsLoading,
    listContentGalleryLoading,
    listBrandProductsLoading,
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
    listBrandContentsData,
    listContentGalleryData,
    listBrandProductsData,
  ]);

  const getCurrentContents = () => {
    let contents;
    switch (profileState) {
      case "content-progress":
        contents = listBrandContentsData?.Data ?? [];
        break;
      case "content-gallery":
        contents = listContentGalleryData?.Data ?? [];
        break;
      case "brand-products":
        contents = listBrandProductsData?.Data ?? [];
        break;
      default:
        contents = listBrandContentsData?.Data ?? [];
    }

    return contents;
  };

  const getTotalPages = () => {
    let totalCount;
    switch (profileState) {
      case "content-progress":
        totalCount = listBrandContentsData?.RowCount ?? null;
        break;
      case "content-gallery":
        totalCount = listContentGalleryData?.RowCount ?? null;
        break;
      case "brand-products":
        totalCount = listBrandProductsData?.RowCount ?? null;
        break;
      default:
        totalCount = listBrandContentsData?.RowCount ?? null;
    }
    return Math.ceil(totalCount / contentsPerPage);
  };

  const renderBrandProfile = () => {
    switch (profileState) {
      case "content-progress":
        return <ContentProgress currentContents={currentContents} />;
      case "content-gallery":
        return <BrandContentGallery contentsGallery={currentContents} />;
      case "brand-products":
        return (
          <BrandProducts
            brandProducts={currentContents}
            brandData={getUserInfoData ? getUserInfoData : null}
          />
        );
      default:
        return <ContentProgress currentContents={currentContents} />;
    }
  };

  const totalPages = getTotalPages();

  const getPageNumbers = () => {
    const totalNumbers = 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];
      const leftBound = Math.max(1, currentPage - 1);
      const rightBound = Math.min(totalPages, currentPage + 1);
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 1;
      const endPage = rightBound < beforeLastPage ? rightBound : totalPages;

      pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      );

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = endPage < beforeLastPage;

      if (hasLeftSpill) {
        pages = ["...", ...pages];
      }
      if (hasRightSpill) {
        pages = [...pages, "..."];
      }

      if (pages[0] !== 1) {
        pages = [1, ...pages];
      }
      if (pages[pages.length - 1] !== totalPages) {
        pages = [...pages, totalPages];
      }

      return pages;
    }

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  const instagramLink = getUserInfoData?.SocialChannels?.find(
    (channel) => channel.PlatformName === "Instagram"
  );

  const facebookLink = getUserInfoData?.SocialChannels?.find(
    (channel) => channel.PlatformName === "Facebook"
  );
  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className=" text-[#2D262D] max-w-7xl min-h-screen mx-auto py-10 sm:py-20">
          <div className="px-7 flex flex-col md:flex-row items-start justify-between w-full">
            <div className="flex flex-row items-center gap-4 sm:gap-7">
              {getUserInfoData ? (
                <Image
                  src={
                    getUserInfoData?.ProfileLink
                      ? getUserInfoData?.ProfileLink
                      : "/dummy-brand.png"
                  }
                  alt=""
                  width={194}
                  height={194}
                  className="rounded-full sm:rounded-xl w-[90px] sm:w-[194px] h-[90px] sm:h-[194px] border border-[#2D262D] object-cover"
                />
              ) : (
                <div className="w-[90px] sm:w-[194px] h-[90px] sm:h-[194px]"></div>
              )}
              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="font-bold text-base sm:text-xl xl:text-2xl">
                  {getUserInfoLoading
                    ? ""
                    : getUserInfoData?.Name || "Geni брэнд"}
                </span>
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
                <div className="overflow-x-auto w-full">
                  <div className="flex w-[220px] sm:w-full flex-row sm:flex-wrap items-center gap-1 sm:gap-2 lg:w-5/6">
                    {getUserInfoData?.BrandTypes?.map((b, i) => (
                      <button
                        key={i}
                        className="bg-[#4D55F5] whitespace-nowrap text-white rounded-full px-3 text-sm py-1 sm:py-[6px]"
                      >
                        {b.TypeName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full sm:w-auto justify-between sm:justify-normal items-end sm:items-center gap-2 sm:gap-4 mt-5 md:mt-0">
              {getUserInfoData?.IsSubscribed === true ||
              getUserInfoData?.Credit > 0 ? (
                <Link
                  href={"/add-product"}
                  className={`flex md:hidden whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
                >
                  Бүтээгдэхүүн нэмэх
                  <Image
                    src={"/add-icon.png"}
                    width={14}
                    height={14}
                    alt="arrow"
                  />
                </Link>
              ) : (
                <CreditPurchase
                  buttonIconSize={""}
                  className={
                    "flex md:hidden flex-row items-center text-xs sm:text-base px-3 sm:px-5 py-2 sm:py-3"
                  }
                  buttonText={"Бүтээгдэхүүн нэмэх "}
                  userInfo={getUserInfoData}
                />
              )}
              <div className="flex items-center justify-between sm:items-center flex-col-reverse sm:flex-col gap-4">
                <Link
                  href={"/wallet"}
                  className="flex flex-row items-center gap-2 px-2 py-[9px] sm:px-4 sm:py-3 bg-[#4FB755] rounded-lg"
                >
                  <Image
                    src={"/rating-geni.png"}
                    height={24}
                    width={24}
                    alt=""
                    className="w-4 h-4 sm:w-6 sm:h-6"
                  />
                  <span className="text-white text-xs sm:text-base font-bold">
                    Geni Кредит: {getUserInfoData?.Credit}
                  </span>
                </Link>
                <div className="flex flex-row items-center gap-2 sm:gap-4">
                  <Link
                    href="/notifications"
                    className="rounded-xl bg-[#F5F4F0] p-2"
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
                    className="rounded-xl bg-[#F5F4F0] p-2"
                  >
                    <Image
                      src={"/edit-profile-icon.png"}
                      width={24}
                      height={24}
                      alt="icon"
                      className="min-w-5 sm:min-w-6 min-h-5 h-5 w-5 sm:min-h-6 sm:h-6 sm:w-6"
                    />
                  </Link>
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto pl-7 md:px-7 mt-4 sm:mt-16 w-full">
            <div className="w-[350px] sm:w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-3">
                {brandProfileButtons.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setProfileState(b.value)}
                    className={`${
                      b.value === profileState
                        ? "bg-[#4D55F5] text-white"
                        : "border-[1px] border-[#CDCDCD] text-[#6F6F6F]"
                    } whitespace-nowrap px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-base`}
                  >
                    {b.title}
                  </button>
                ))}
              </div>
              {getUserInfoData?.IsSubscribed === true ||
              getUserInfoData?.Credit > 0 ? (
                <Link
                  href={"/add-product"}
                  className={`hidden md:flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
                >
                  Бүтээгдэхүүн нэмэх
                  <Image
                    src={"/add-icon.png"}
                    width={14}
                    height={14}
                    alt="arrow"
                  />
                </Link>
              ) : (
                <CreditPurchase
                  buttonIconSize={""}
                  className={
                    "hidden md:flex flex-row items-center text-xs sm:text-base px-3 sm:px-5 py-2 sm:py-3"
                  }
                  buttonText={"Бүтээгдэхүүн нэмэх "}
                  userInfo={getUserInfoData}
                />
              )}
            </div>
          </div>
          {currentContents && !isLoading ? (
            renderBrandProfile()
          ) : (
            <div className="space-y-6 mt-10 px-3 sm:px-7">
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[59px] sm:h-[84px] w-full rounded-3xl"
                />
              ))}
            </div>
          )}
        </div>

        {listBrandContentsData && totalPages > 1 ? (
          <div className="container px-7 mx-auto text-[#2D262D] flex flex-row items-center gap-2 sm:gap-3 justify-center lg:justify-end mt-5 w-full">
            {currentPage > 1 && (
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="min-w-7 sm:min-w-10 min-h-7 sm:min-h-10 flex flex-row items-center justify-center gap-2 bg-[#4D55F5] rounded-full"
              >
                <Image
                  src={"/arrow-right-icon.png"}
                  width={12}
                  height={12}
                  alt="arrow"
                  className="rotate-180 w-[10px] h-[10px] sm:w-3 sm:h-3"
                />
              </button>
            )}

            <div className="flex flex-row items-center gap-2 sm:gap-3">
              {getPageNumbers().map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() => pageNumber !== "..." && paginate(pageNumber)}
                  className={`min-w-7 sm:min-w-10 min-h-7 sm:min-h-10 text-xs md:text-base transition-all duration-150 flex justify-center items-center border-[1px] rounded-full bg-[#F5F4F0] ${
                    pageNumber === currentPage
                      ? "border-[#4D55F5]"
                      : "border-none"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            {currentPage != totalPages && (
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="min-w-7 sm:min-w-10 min-h-7 sm:min-h-10 flex flex-row items-center justify-center gap-2 bg-[#4D55F5] rounded-full"
              >
                <Image
                  src={"/arrow-right-icon.png"}
                  width={12}
                  height={12}
                  alt="arrow"
                  className="w-[10px] h-[10px] sm:w-3 sm:h-3"
                />
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {getUserInfoData && (
        <GuideModal hasSeenGuide={getUserInfoData?.HasSeenGuide} />
      )}
      {getUserInfoData && (
        <OnBoardRequestStateModal
          isRequested={getUserInfoData?.OnBoardingStatus === "Request"}
        />
      )}
    </div>
  );
}

export default BrandProfile;

const brandProfileButtons = [
  {
    title: "Контент статус",
    value: "content-progress",
  },
  {
    title: "Контент",
    value: "content-gallery",
  },
  {
    title: "Бүтээгдэхүүн",
    value: "brand-products",
  },
];
