"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContentProgress from "../ContentProgress";
import ContentGallery from "../ContentGallery";
import { usePathname } from "next/navigation";
import Contents from "@/app/profile/Contents";
import GraphCMSImageLoader from "@/app/components/GraphCMSImageLoader";
function page() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments.pop();

  // console.log(id);
  const [creatorData, setCreatorData] = useState([]);
  const [reviewData, setReviewData] = useState(null);
  const [getReviewBrand, setReviewBrand] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/Items/creator?sort=sort,-date_created&fields=*,Category.*.*,review.*.*,brand.*.*,content.*.*&filter=%7B%22status%22:%7B%22_eq%22:%22published%22%7D%7D`
        );
        const d = await r.json();
        const c = d.data.find((item) => item.id === id);

        setCreatorData(c);
        console.log(c);
        if (c.review) {
          const reviewData = c.review.find((item) => item.isFeatured === true);
          setReviewData(reviewData);
          const reviewBrand =
            await fetch(`${process.env.NEXT_PUBLIC_URL}/Items/brand?filter=%7B%22id%22:%7B%22_eq%22:%22${c?.reviewBrand?.brand?.key}%22%7D%7D
        `);
          const brand = reviewBrand.json();
          console.log(reviewBrand);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
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
      case "content-gallery":
        contents = creatorData?.content;
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
        contents = creatorData?.content;
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
        return (
          <ContentGallery
            creatorData={creatorData}
            contentsGallery={currentContents}
          />
        );

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
      <div className="pt-32 pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20">
          <div className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-row items-center gap-7">
              <Image
                src={creatorData ? creatorData.image : null}
                loader={GraphCMSImageLoader}
                width={261}
                height={194}
                loading="lazy"
                className="rounded-xl"
                alt="creator"
              />
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <span className="text-[#2D262D] text-2xl font-bold">
                    {creatorData ? creatorData.name : <></>}
                  </span>
                  <Image
                    src={"/verified-icon.png"}
                    width={24}
                    height={24}
                    alt="verified-icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <span className="text-lg">1020 xp</span>
                  <button>
                    <Image
                      src={"/Info.png"}
                      width={24}
                      height={24}
                      alt="info"
                      className="w-6 h-6"
                    />
                  </button>
                  <button>
                    <Image
                      src={"/Instagram.png"}
                      width={24}
                      height={24}
                      alt="ig"
                      className="w-6 h-6"
                    />
                  </button>
                  <button>
                    <Image
                      src={"/Facebook.png"}
                      width={24}
                      height={24}
                      alt="fb"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
                <span className="text-[#6F6F6F] text-base">
                  {creatorData ? creatorData.bio : <></>}
                </span>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[#2D262D]">
                  {creatorData?.Category?.map((c, i) => (
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
            <div className="flex flex-row items-center gap-5">
              {icons.map((r, i) => (
                <button
                  key={i}
                  className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5"
                >
                  <Image
                    key={i}
                    src={r}
                    width={24}
                    height={24}
                    alt="icon"
                    className="min-w-6 min-h-6"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
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
            <a
              href="/add-product"
              className="flex flex-row items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-5 py-3 rounded-lg text-white font-bold"
            >
              Бүтээгдэхүүн үзэх
              <Image
                src={"/arrow-right-icon.png"}
                width={14}
                height={14}
                alt="arrow"
              />
            </a>
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
  // "/brand-profile-icon1.png",
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
    title: "Content gallery",
    value: "content-gallery",
  },
];

const contentsProgress = [
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 2,
    status: "Geni шалгаж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 4,
    status: "Контент илгээсэн",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 1,
    status: "Бүтээгдэхүүн хүргэж байна",
    interaction: "",
  },
  {
    name: "Нүүрний чийгшүүлэгч тос",
    brand: "Lhamour",
    stage: 3,
    status: "Контент хийгдэж байна",
    interaction: "",
  },
];
