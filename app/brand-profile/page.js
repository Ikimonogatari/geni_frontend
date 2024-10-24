"use client";
import React, { useState } from "react";
import Image from "next/image";
import ContentProgress from "./ContentProgress";
import BrandProducts from "./BrandProducts";
import {
  useGetUserInfoQuery,
  useListBrandContentsQuery,
  useListBrandProductsQuery,
} from "@/app/services/service";
import Link from "next/link";
import BrandContentGallery from "./BrandContentGallery";

function page() {
  const {
    data: getUserInfoData,
    error: getUserInfoError,
    isLoading: getUserInfoLoading,
  } = useGetUserInfoQuery();

  const {
    data: listBrandContentsData,
    error: listBrandContentsError,
    isLoading: listBrandContentsLoading,
  } = useListBrandContentsQuery();

  const {
    data: listBrandProductsData,
    error: listBrandProductsError,
    isLoading: listBrandProductsLoading,
  } = useListBrandProductsQuery();

  const [profileState, setProfileState] = useState("content-progress");
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 12;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, getTotalPages()));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getCurrentContents = () => {
    let contents;
    switch (profileState) {
      case "content-progress":
        contents =
          listBrandContentsData && listBrandContentsData.Data != null
            ? listBrandContentsData.Data
            : [];
        console.log(contents);
        break;
      case "content-gallery":
        contents =
          listBrandContentsData && listBrandContentsData.Data != null
            ? listBrandContentsData.Data
            : [];
        console.log(contents);
        break;
      case "brand-products":
        contents =
          listBrandProductsData && listBrandProductsData.Data != null
            ? listBrandProductsData.Data
            : [];
        console.log(contents);
        break;
      default:
        contents =
          listBrandContentsData && listBrandContentsData.Data != null
            ? listBrandContentsData.Data
            : [];
        console.log(contents);
    }

    const indexOfLastContent = currentPage * contentsPerPage;
    const indexOfFirstContent = indexOfLastContent - contentsPerPage;
    return contents.slice(indexOfFirstContent, indexOfLastContent);
  };

  const getTotalPages = () => {
    let contents;
    switch (profileState) {
      case "content-progress":
        contents =
          listBrandContentsData && listBrandContentsData.Data != null
            ? listBrandContentsData.Data
            : [];
        break;
      case "content-gallery":
        contents =
          listBrandContentsData && listBrandContentsData.Data != null
            ? listBrandContentsData.Data
            : [];
        break;
      case "brand-products":
        contents =
          listBrandProductsData && listBrandProductsData.Data != null
            ? listBrandProductsData.Data
            : [];
        break;
      default:
        contents =
          listBrandContentsData && listBrandContentsData.Data != null
            ? listBrandContentsData.Data
            : [];
    }
    return Math.ceil(contents.length / contentsPerPage);
  };

  const renderBrandProfile = () => {
    const currentContents = getCurrentContents();
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
    const totalNumbers = 3; // Number of page numbers to show
    const totalBlocks = totalNumbers + 2; // Including first and last page

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
                      : "/dummy-profile.jpg"
                  }
                  alt=""
                  width={194}
                  height={194}
                  className="rounded-full sm:rounded-xl w-[90px] sm:w-[194px] h-[90px] sm:h-[194px] border border-[#2D262D]"
                />
              ) : (
                <div className="w-[90px] sm:w-[194px] h-[90px] sm:h-[194px]"></div>
              )}
              <div className="flex flex-col gap-2">
                <span className="font-bold text-base sm:text-xl xl:text-2xl">
                  {getUserInfoData ? getUserInfoData.Name : ""}
                </span>
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  {instagramLink && (
                    <a
                      target="_blank"
                      href={`https://www.instagram.com/${instagramLink || ""}`}
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
                      href={`https://www.facebook.com/${facebookLink || ""}`}
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
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  {getUserInfoData?.BrandTypes?.map((b, i) => (
                    <button
                      key={i}
                      className="bg-[#4D55F5] text-white rounded-full px-3 text-xs sm:text-base sm:px-4 py-1 sm:py-2"
                    >
                      {b.TypeName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-5 mt-5 md:mt-0">
              <Link
                href="/notifications"
                className="rounded-xl bg-[#F5F4F0] p-2"
              >
                <Image
                  src={"/brand-profile-icon2.png"}
                  width={24}
                  height={24}
                  alt="icon"
                  className="w-5 sm:w-6 h-5 sm:h-6"
                />
              </Link>
              <Link
                href="/edit-profile-brand"
                className="rounded-xl bg-[#F5F4F0] p-2"
              >
                <Image
                  src={"/brand-profile-icon3.png"}
                  width={24}
                  height={24}
                  alt="icon"
                  className="w-5 sm:w-6 h-5 sm:h-6"
                />
              </Link>

              <Link
                href="/add-product"
                className="flex md:hidden flex-row text-xs sm:text-base items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold"
              >
                Шинэ бүтээгдэхүүн нэмэх
                <Image
                  src={"/add-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                />
              </Link>
            </div>
          </div>

          <div className="pl-7 md:px-7 mt-4 sm:mt-16 w-full flex flex-row items-center justify-between">
            <div className="overflow-x-auto w-full">
              <div className="flex flex-row items-center min-w-[448px] gap-3">
                {brandProfileButtons.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setProfileState(b.value)}
                    className={`${
                      b.value === profileState
                        ? "bg-[#4D55F5] text-white"
                        : "border-[1px] border-[#CDCDCD] text-[#6F6F6F]"
                    } px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-base`}
                  >
                    {b.title}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="/add-product"
              className="w-full max-w-[270px] hidden md:flex flex-row text-[10px] sm:text-base items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold"
            >
              Шинэ бүтээгдэхүүн нэмэх
              <Image src={"/add-icon.png"} width={14} height={14} alt="arrow" />
            </a>
          </div>

          {renderBrandProfile()}
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
                  width={10}
                  height={10}
                  alt="arrow"
                  className="rotate-180 w-[10px] h-[10px]"
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
                  width={10}
                  height={10}
                  alt="arrow"
                  className="w-[10px] h-[10px]"
                />
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default page;

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
