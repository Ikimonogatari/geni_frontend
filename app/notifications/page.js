"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { useListNotificationQuery } from "../services/service";

const ITEMS_PER_PAGE = 10;

function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: listNotificationData,
    error: listNotificationError,
    isLoading: listNotificationLoading,
  } = useListNotificationQuery();

  const totalPages = Math.ceil(listNotificationData?.length / ITEMS_PER_PAGE);
  if (listNotificationData) {
    console.log(listNotificationData);
  }
  const paginatedNotifications = listNotificationData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 10;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${
            currentPage === i ? "border-[#CA7FFE]" : "border-none"
          } transition-all duration-150 w-10 h-10 rounded-full flex items-center border bg-[#F5F4F0] justify-center`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get month, day, year, hour, and minutes
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className="container min-h-screen text-[#2D262D] max-w-7xl mx-auto px-7 py-10 sm:py-20 flex flex-col">
          <button
            onClick={() => router.back()}
            className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
          >
            <Image
              src={"/arrow-left.png"}
              width={24}
              height={24}
              alt="arrow-left"
            />
          </button>
          <span className="text-[#2D262D] font-bold text-4xl sm:text-5xl xl:text-6xl my-7">
            Мэдэгдэл
          </span>
          <div className="flex flex-col gap-4 w-full">
            {paginatedNotifications?.map((n, i) => (
              <div
                key={i}
                onClick={() => router.push(`/notifications/${i}`)}
                className="cursor-pointer rounded-3xl bg-[#F5F4F0] p-6 flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Image
                  src={
                    n.IsSeen === false
                      ? "/not-status-unread.png"
                      : "/not-status-read.png"
                  }
                  width={17}
                  height={17}
                  alt="status"
                  className="rounded-full w-3 h-3 sm:w-[17px] sm:h-[17px]"
                />
                <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-8">
                  <Image
                    src={"/dummy-notification.png"}
                    width={190}
                    height={170}
                    alt="not"
                    className="rounded-2xl w-full h-full max-h-[170px] sm:w-[190px] sm:h-[170px]"
                  />
                  <div className="w-full flex flex-col">
                    <div className="w-full flex flex-row justify-between items-center">
                      <span className="font-bold text-2xl">{n.Title}</span>
                      <span className="hidden sm:block text-[#6F6F6F] text-lg">
                        {formatDate(n.CreatedAt)}
                      </span>
                    </div>

                    <div className="text-xs sm:text-lg flex flex-row items-center justify-between w-full sm:w-auto">
                      <span className="text-[#6F6F6F]">@geni.team</span>
                      <span className="block sm:hidden text-[#6F6F6F]">
                        {formatDate(n.CreatedAt)}
                      </span>
                    </div>
                    <span className="line-clamp-4 text-[#6F6F6F] mt-3 text-xs sm:text-lg">
                      {n.Body}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages !== 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {currentPage !== 1 && (
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className="flex flex-row items-center gap-2 border-[1px] border-[#2D262D] bg-[#CA7FFE] px-5 py-2 rounded-lg text-white font-bold"
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

              {renderPageNumbers()}
              {currentPage != totalPages && (
                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className="flex flex-row items-center gap-2 border-[1px] border-[#2D262D] bg-[#CA7FFE] px-5 py-2 rounded-lg text-white font-bold"
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
