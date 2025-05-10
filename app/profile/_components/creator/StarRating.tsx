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
      className={`flex flex-row items-center justify-center gap-2 sm:gap-3 ${className}`}
    >
      <Image
        src={"/star.png"}
        width={24}
        height={24}
        alt=""
        className="w-4 h-4 sm:w-6 sm:h-6"
      />
      <span className="text-[#2D262D] text-sm sm:text-base">
        {averageRating} ({contentCount} контент)
      </span>
    </div>
  );
}

export default StarRating;
