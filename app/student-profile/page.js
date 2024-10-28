"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContentProgress from "./ContentProgress";
import {
  useGetUserInfoQuery,
  useListCreatorContentsQuery,
} from "@/app/services/service";
import Cookies from "js-cookie";
import Link from "next/link";
import HomeworkUploadModal from "../components/HomeworkUploadModal";

function page() {
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

  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 8;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, getTotalPages()));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getCurrentContents = () => {
    const contents = listCreatorContentsData
      ? listCreatorContentsData.Data != null
        ? listCreatorContentsData.Data
        : []
      : [];

    const indexOfLastContent = currentPage * contentsPerPage;
    const indexOfFirstContent = indexOfLastContent - contentsPerPage;
    return contents.slice(indexOfFirstContent, indexOfLastContent);
  };

  const getTotalPages = () => {
    const contents = listCreatorContentsData
      ? listCreatorContentsData.Data != null
        ? listCreatorContentsData.Data
        : []
      : [];
    return Math.ceil(contents.length / contentsPerPage);
  };

  const renderBrandProfile = () => {
    const currentContents = getCurrentContents();
    return <ContentProgress currentContents={currentContents} />;
  };

  const totalPages = getTotalPages();

  const getPageNumbers = () => {
    const totalNumbers = 5; // Number of page numbers to show
    const totalBlocks = totalNumbers + 2; // Including first and last page

    if (totalPages > totalBlocks) {
      let pages = [];
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(totalPages, currentPage + 2);
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

  const userInfo = Cookies.get("user-info");
  console.log(userInfo ? userInfo : "");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

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
                  className="rounded-full sm:rounded-xl w-[90px] h-[90px] sm:w-[194px] sm:h-[194px] aspect-square border border-[#2D262D]"
                  alt=""
                />
              ) : (
                <div className="w-[90px] h-[90px] sm:w-[194px] sm:h-[194px]"></div>
              )}
              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="text-[#2D262D] text-base sm:text-2xl font-bold">
                  {getUserInfoData?.FirstName} {getUserInfoData?.LastName}
                </span>
                <span className="text-[#6F6F6F] text-xs sm:text-base">
                  @{getUserInfoData?.Nickname}
                </span>
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  <span className="text-sm sm:text-lg">
                    {getUserInfoData ? getUserInfoData.Point : 0} xp
                  </span>
                  <a>
                    <Image
                      src={"/Info.png"}
                      width={24}
                      height={24}
                      alt="info"
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </a>
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
                      className="bg-[#4FB755] font-semibold rounded-full px-4 py-2"
                    >
                      {c.Category_id.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-5">
              <Link
                href={"/notifications"}
                className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
              >
                <Image
                  src={"/notification-icon.png"}
                  width={24}
                  height={24}
                  alt="icon"
                  className="w-5 sm:w-6 h-5 sm:h-6"
                />
              </Link>
              <Link
                href={"/edit-profile-student"}
                className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
              >
                <Image
                  src={"/edit-profile-icon.png"}
                  width={24}
                  height={24}
                  alt="icon"
                  className="w-5 sm:w-6 h-5 sm:h-6"
                />
              </Link>
              <Link
                href="/products"
                className="flex sm:hidden flex-row items-center gap-2 text-xs sm:text-base bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold"
              >
                <Image
                  src={"/arrow-right-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                  className="w-[9px] h-[9px] sm:w-[14px] sm:h-[14px]"
                />
              </Link>
            </div>
          </div>

          <div className="mt-4 sm:mt-16 w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              {brandProfileButtons.map((b, i) => (
                <a
                  target="_blank"
                  href={b.link}
                  key={i}
                  className={`border-[1px] border-[#2D262D] bg-[#4FB755] text-white px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-base`}
                >
                  {b.title}
                </a>
              ))}
            </div>

            <HomeworkUploadModal parsedUserInfo={parsedUserInfo} />
          </div>
          {renderBrandProfile()}
        </div>
        {listCreatorContentsData && totalPages > 1 ? (
          <div className="container px-7 mx-auto text-[#2D262D] flex flex-row gap-3 items-end justify-end mt-5">
            {currentPage > 1 && (
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex flex-row items-center gap-2 border-[1px] border-[#2D262D] bg-[#4FB755] px-5 py-2 rounded-lg text-white font-bold"
              >
                <Image
                  src={"/arrow-right-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                  className="rotate-180"
                />
                Prev
              </button>
            )}

            <div className="flex flex-row items-center gap-3">
              {getPageNumbers().map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() => pageNumber !== "..." && paginate(pageNumber)}
                  className={`w-10 h-10 transition-all duration-150 flex justify-center items-center border-[1px] rounded-full bg-[#F5F4F0] ${
                    pageNumber === currentPage
                      ? "border-[#4FB755]"
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
                className="flex flex-row items-center gap-2 border-[1px] border-[#2D262D] bg-[#4FB755] px-5 py-2 rounded-lg text-white font-bold"
              >
                Next
                <Image
                  src={"/arrow-right-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
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
    title: "Онлайн хичээл үзэх",
    value: "content-progress",
    link: "https://meirapage.gumroad.com/l/hxwkma/hic5m2k",
  },
];
