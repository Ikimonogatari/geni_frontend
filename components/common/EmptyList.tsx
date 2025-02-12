import React from "react";
import Image from "next/image";

interface EmptyListProps {
  image: string;
  text: string;
  imageClassName: string;
}

const EmptyList: React.FC<EmptyListProps> = ({
  image,
  text,
  imageClassName,
}) => {
  return (
    <div className="flex flex-col items-center w-full gap-4 mt-11 sm:mt-20">
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
