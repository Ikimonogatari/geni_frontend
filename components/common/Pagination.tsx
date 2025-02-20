import React from "react";
import Image from "next/image";

function Pagination({
  totalPages,
  currentPage,
  pageNumbers,
  handlePrevPage,
  handleNextPage,
  paginate,
  bg,
  border,
}) {
  return (
    <div className="container px-7 mx-auto text-[#2D262D] flex flex-row items-center gap-2 sm:gap-3 justify-center lg:justify-end mt-5 w-full">
      {currentPage > 1 && (
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`min-w-7 sm:min-w-10 min-h-7 sm:min-h-10 flex flex-row items-center justify-center gap-2 ${bg} rounded-full`}
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
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => pageNumber !== "..." && paginate(pageNumber)}
            className={`min-w-7 sm:min-w-10 min-h-7 sm:min-h-10 text-xs md:text-base transition-all duration-150 flex justify-center items-center border-[1px] rounded-full bg-[#F5F4F0] ${
              pageNumber === currentPage ? `${border}` : "border-none"
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
          className={`min-w-7 sm:min-w-10 min-h-7 sm:min-h-10 flex flex-row items-center justify-center gap-2 ${bg} rounded-full`}
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
  );
}

export default Pagination;
