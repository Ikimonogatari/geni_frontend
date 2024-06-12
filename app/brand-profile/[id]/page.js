"use client";
import React, { useState } from "react";
import Image from "next/image";

function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  let displayPages;
  if (currentPage <= 3) {
    displayPages = pageNumbers.slice(0, 5);
  } else if (currentPage >= totalPages - 2) {
    displayPages = pageNumbers.slice(totalPages - 5, totalPages);
  } else {
    displayPages = pageNumbers.slice(currentPage - 3, currentPage + 2);
  }

  const getColorClass = (status) => {
    switch (status) {
      case "Бүтээгдэхүүн хүргэж байна":
        return "text-[#F49D19]";
      case "Контент хийгдэж байна":
        return "text-[#F49D19]";
      case "Geni шалгаж байна":
        return "text-[#4D55F5]";
      case "Контент илгээсэн":
        return "text-[#4FB755]";
      default:
        return "";
    }
  };
  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-20">
          <div className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-row items-center gap-7">
              <Image
                src={"/brand-dummy.png"}
                alt="dummy-brand"
                width={130}
                height={130}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">Lhamour</span>
                <button className="bg-[#CA7FFE] rounded-full px-4 py-2">
                  Beauty
                </button>
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

          <div className="mt-16 w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <button className="bg-[#4D55F5] px-5 py-3 rounded-lg text-white font-bold">
                Content progress
              </button>
              <button className="border-[1px] border-[#CDCDCD] px-5 py-3 rounded-lg text-[#6F6F6F] font-bold">
                Content gallery
              </button>
              <button className="border-[1px] border-[#CDCDCD] px-5 py-3 rounded-lg text-[#6F6F6F] font-bold">
                My Products
              </button>
            </div>
            <button className="flex flex-row items-center gap-2 bg-[#4D55F5] px-5 py-3 rounded-lg text-white font-bold">
              Шинэ бүтээгдэхүүн нэмэх
              <Image
                src={"/arrow-right-icon.png"}
                width={14}
                height={14}
                alt="arrow"
              />
            </button>
          </div>
          <div className="mt-7 border-t-1px border-[#CDCDCD] flex flex-col gap-3">
            <div className="p-5 grid grid-cols-[3fr,2fr,1fr,3fr,2fr] gap-6 w-full items-center text-[#6F6F6F]">
              <div className="col-span-1 flex flex-row items-center justify-between">
                <span className="">Бүтээгдэхүүн</span>

                <Image
                  src={"/brand-profile-arrow-icon.png"}
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </div>
              <span className="col-span-1">Бүтээгч</span>
              <span className="col-span-1">Үе шат</span>
              <div className="col-span-1 flex flex-row items-center justify-between">
                <span>Статус</span>
                <Image
                  src={"/brand-profile-arrow-icon.png"}
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </div>
              <span className="col-span-1">Үйлдэл</span>
            </div>
            {currentProducts.map((p, i) => (
              <div
                key={i}
                className="w-full grid grid-cols-[3fr,2fr,1fr,3fr,2fr] gap-6 items-center p-5 border-[#CDCDCD] border-[1px] rounded-3xl"
              >
                <span className="col-span-1">{p.name}</span>
                <div className="col-span-1 flex flex-row items-center gap-3">
                  <span>{p.creator}</span>
                  <Image
                    src={"/verified-icon.png"}
                    width={24}
                    height={24}
                    alt="verified"
                  />
                </div>
                <span className="col-span-1">{p.stage}/5</span>
                <div
                  className={`${getColorClass(
                    p.status
                  )} col-span-1 flex flex-row items-center gap-3`}
                >
                  <Image
                    src={stages[p.stage - 1]}
                    width={24}
                    height={24}
                    alt="verified"
                  />
                  <span className="">{p.status}</span>
                </div>
                <div>
                  {p.stage === 4 ? (
                    <button className="bg-[#4D55F5] px-5 py-2 rounded-lg text-white font-bold">
                      Контент авах
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container px-7 mx-auto text-[#2D262D] flex flex-row gap-3 items-end justify-end mt-5">
          {currentPage !== 1 && (
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex flex-row items-center gap-2 bg-[#CA7FFE] px-5 py-2 rounded-lg text-white font-bold"
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
            {displayPages.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`w-10 h-10 flex justify-center items-center border-[1px] rounded-full bg-[#F5F4F0] ${
                  pageNumber === currentPage
                    ? "border-[#CA7FFE]"
                    : "border-none"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          {currentPage != totalPages && <span className="mx-2">...</span>}
          {currentPage < totalPages - 2 && (
            <button
              onClick={() => paginate(totalPages)}
              className="w-10 h-10 flex justify-center items-center rounded-full bg-[#F5F4F0]"
            >
              {totalPages}
            </button>
          )}
          {currentPage != totalPages && (
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex flex-row items-center gap-2 bg-[#CA7FFE] px-5 py-2 rounded-lg text-white font-bold"
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
      </div>
    </div>
  );
}

export default page;

const icons = [
  "/brand-profile-icon1.png",
  "/brand-profile-icon2.png",
  "/brand-profile-icon3.png",
  "/brand-profile-icon4.png",
];

const products = [
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

const stages = [
  "/stage-icon1.png",
  "/stage-icon2.png",
  "/stage-icon3.png",
  "/stage-icon4.png",
];
