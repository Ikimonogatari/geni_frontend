"use client";
import React, { useState } from "react";
import Image from "next/image";
import ContentProgress from "./ContentProgress";
import BrandProducts from "./BrandProducts";

function page() {
  const [profileState, setProfileState] = useState("content-progress");
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
    let contents;
    switch (profileState) {
      case "content-progress":
        contents = contentsProgress;
        break;

      case "brand-products":
        contents = brandProducts;
        break;
      default:
        contents = contentsProgress;
    }

    const indexOfLastContent = currentPage * contentsPerPage;
    const indexOfFirstContent = indexOfLastContent - contentsPerPage;
    return contents.slice(indexOfFirstContent, indexOfLastContent);
  };

  const getTotalPages = () => {
    let contents;
    switch (profileState) {
      case "content-progress":
        contents = contentsProgress;
        break;

      case "brand-products":
        contents = brandProducts;
        break;
      default:
        contents = contentsProgress;
    }
    return Math.ceil(contents.length / contentsPerPage);
  };

  const renderBrandProfile = () => {
    const currentContents = getCurrentContents();
    switch (profileState) {
      case "content-progress":
        return <ContentProgress currentContents={currentContents} />;

      case "brand-products":
        return <BrandProducts brandProducts={currentContents} />;
      default:
        return <ContentProgress currentContents={currentContents} />;
    }
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

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-20">
          <div className="flex flex-row w-full justify-between items-center pb-6 border-b border-[#CDCDCD]">
            <span className="text-4xl sm:text-5x; xl:text-6xl font-bold">
              Dashboard
            </span>
            <div className="flex flex-row items-center gap-4">
              <button
                className={`bg-[#CA7FFE] text-white
                      border-[1px] border-[#2D262D] px-6 py-3 rounded-lg font-bold`}
              >
                Create user
              </button>
              <button
                className={`bg-[#4D55F5] text-white
                      border-[1px] border-[#2D262D] px-6 py-3 rounded-lg font-bold`}
              >
                Add notification
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-row items-start justify-between w-full">
            <div className="flex flex-row items-center gap-16">
              <div className="flex flex-col gap-4">
                <span className="text-2xl">Total creators</span>
                <span className="text-6xl font-bold">36</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-2xl">Total brands</span>
                <span className="text-6xl font-bold">16</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-2xl">Total contents created</span>
                <span className="text-6xl font-bold">227</span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-5">
              {icons.map((r, i) => (
                <button key={i} className="rounded-xl bg-[#F5F4F0] p-2 gap-5">
                  <Image key={i} src={r} width={24} height={24} alt="icon" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 w-full flex flex-row gap-3 items-center">
            {brandProfileButtons.map((b, i) => (
              <button
                key={i}
                onClick={() => setProfileState(b.value)}
                className={`${
                  b.value === profileState
                    ? "bg-[#4D55F5] text-white"
                    : "border-[1px] border-[#CDCDCD] text-[#6F6F6F]"
                } px-5 py-3 rounded-lg font-bold`}
              >
                {b.title}
              </button>
            ))}
          </div>
          {renderBrandProfile()}
        </div>
        {totalPages !== 1 ? (
          <div className="container px-7 mx-auto text-[#2D262D] flex flex-row gap-3 items-end justify-end mt-5">
            {currentPage !== 1 && (
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
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

            <div className="flex flex-row items-center gap-3">
              {getPageNumbers().map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() => pageNumber !== "..." && paginate(pageNumber)}
                  className={`w-10 h-10 transition-all duration-150 flex justify-center items-center border-[1px] rounded-full bg-[#F5F4F0] ${
                    pageNumber === currentPage
                      ? "border-[#CA7FFE]"
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default page;

const icons = [
  //   "/brand-profile-icon1.png",
  "/brand-profile-icon2.png",
  "/brand-profile-icon3.png",
  "/brand-profile-icon4.png",
];

const brandProfileButtons = [
  {
    title: "Content progress",
    value: "content-progress",
  },

  {
    title: "My Products",
    value: "brand-products",
  },
];

const brandProducts = [
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Идэвхтэй",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    amount: "13/50",
    status: "Дууссан",
  },
];
const contentsProgress = [
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    creator: "Уртнасан",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
];
