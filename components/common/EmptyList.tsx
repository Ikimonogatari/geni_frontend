import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EmptyListProps {
  image: string;
  text: string;
  imageClassName: string;
  className?: string;
}

const EmptyList: React.FC<EmptyListProps> = ({
  image,
  text,
  imageClassName,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center w-full gap-4 mt-11 sm:mt-20",
        className
      )}
    >
      <Image
        src={image}
        width={155}
        height={154}
        alt=""
        className={`${imageClassName}`}
      />
      <span className="text-xl text-[#6F6F6F]">{text}</span>
    </div>
  );
};

export default EmptyList;
