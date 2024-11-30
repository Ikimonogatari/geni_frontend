import React from "react";
import Image from "next/image";

function HomeBecomeGeniButton({ text, bg, framebg, link }) {
  return (
    <div
      className={`relative w-full max-w-[532px] max-h-[90px] aspect-[532/90] shadow-2xl rounded-xl border-[1px] border-[#2D262D] ${framebg}`}
    >
      <a
        target="_blank"
        href={link}
        className={`absolute -top-[4px] sm:-top-[8px] -left-[3px] sm:-left-[6px] z-50 text-white text-lg font-bold w-full aspect-[532/90] max-w-[532px] max-h-[90px] rounded-xl border-[1px] border-[#2D262D] ${bg} flex flex-row gap-2 items-center justify-center`}
      >
        <span className="text-sm sm:text-base">Geni {text} болох</span>
        <Image
          src={"/arrow-right-icon.png"}
          alt="arrow"
          width={16}
          height={16}
          className="w-3 h-3 sm:w-4 sm:h-4"
        />
      </a>
    </div>
  );
}

export default HomeBecomeGeniButton;
