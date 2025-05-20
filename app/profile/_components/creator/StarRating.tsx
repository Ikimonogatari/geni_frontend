import Image from "next/image";
import React from "react";

interface StarRatingProps {
  averageRating: number;
  contentCount: number;
  className?: string;
}

function StarRating({
  averageRating,
  contentCount,
  className,
}: StarRatingProps) {
  return (
    <div
      className={`flex flex-row items-center justify-center gap-1 sm:gap-3 ${className}`}
    >
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-3">
        <Image
          src={"/star.png"}
          width={24}
          height={24}
          alt=""
          className="w-4 h-4 sm:w-6 sm:h-6 mb-[2px] sm:mb-[3px]"
        />
        <span className="text-[#2D262D] text-xs sm:text-base">
          {averageRating}
        </span>
      </div>
      <span className="text-[#2D262D] text-xs sm:text-base">
        ({contentCount} контент)
      </span>
    </div>
  );
}

export default StarRating;
