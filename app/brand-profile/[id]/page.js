"use client";
import React, { useState } from "react";
import Image from "next/image";
import ContentProgress from "../ContentProgress";
import ContentGallery from "../ContentGallery";
import BrandProducts from "../BrandProducts";

function page() {
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
        contents = contentsProgress;
        break;
      case "content-gallery":
        contents = contentsGallery;
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
      case "content-gallery":
        contents = contentsGallery;
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
      case "content-gallery":
        return <ContentGallery contentsGallery={currentContents} />;
      case "brand-products":
        return <BrandProducts brandProducts={currentContents} />;
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

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className=" text-[#2D262D] max-w-7xl min-h-screen mx-auto py-10 sm:py-20">
          <div className="px-7 flex flex-col md:flex-row items-start justify-between w-full">
            <div className="flex flex-row items-center gap-4 sm:gap-7">
              <Image
                src={"/brand-dummy.png"}
                alt="dummy-brand"
                width={130}
                height={130}
                className="rounded-full w-[90px] sm:w-[130px] h-[90px] sm:h-[130px] border border-[#2D262D]"
              />
              <div className="flex flex-col gap-2">
                <span className="font-bold text-base sm:text-xl xl:text-2xl">
                  Lhamour
                </span>
                <button className="bg-[#CA7FFE] rounded-full px-2 text-sm sm:text-base sm:px-4 py-1 sm:py-2">
                  Beauty
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-5 mt-5 md:mt-0">
              {icons.map((r, i) => (
                <button key={i} className="rounded-xl bg-[#F5F4F0] p-2">
                  <Image
                    key={i}
                    src={r}
                    width={24}
                    height={24}
                    alt="icon"
                    className="w-5 sm:w-6 h-5 sm:h-6"
                  />
                </button>
              ))}
              <a
                href="/add-product"
                className="flex md:hidden flex-row text-[10px] sm:text-base items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold"
              >
                Шинэ бүтээгдэхүүн нэмэх
                <Image
                  src={"/add-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                />
              </a>
            </div>
          </div>

          <div className="pl-7 md:px-7 mt-10 sm:mt-16 w-full flex flex-row items-center justify-between">
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
            {/* <a
              href="/add-product"
              className="w-auto hidden whitespace-nowrap md:flex flex-row items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-5 py-3 rounded-lg text-white font-bold"
            >
              <span>Шинэ бүтээгдэхүүн нэмэх</span>
              <Image src={"/add-icon.png"} width={14} height={14} alt="arrow" />
            </a> */}
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

        {totalPages !== 1 ? (
          <div className="container px-7 mx-auto text-[#2D262D] flex flex-row items-center gap-2 sm:gap-3 justify-center lg:justify-end mt-5 w-full">
            {currentPage !== 1 && (
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="min-w-7 sm:min-w-10 min-h-7 sm:min-h-10 flex flex-row items-center justify-center gap-2 bg-[#CA7FFE] rounded-full"
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
                className="min-w-7 sm:min-w-10 min-h-7 sm:min-h-10 flex flex-row items-center justify-center gap-2 bg-[#CA7FFE] rounded-full"
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

const icons = [
  "/brand-profile-icon1.png",
  "/brand-profile-icon2.png",
  "/brand-profile-icon3.png",
  // "/brand-profile-icon4.png",
];

const brandProfileButtons = [
  {
    title: "Content progress",
    value: "content-progress",
  },
  {
    title: "Content gallery",
    value: "content-gallery",
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

const contentsGallery = [
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
  },
  {
    profile: "/content-creator-dummy.png",
    name: "Solongoo",
    content: "/brand-dummy-content.png",
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
