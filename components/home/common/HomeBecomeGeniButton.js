"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HomeBecomeGeniButton({ text, bg, shadowbg, link, width }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(link)}
      className={`${bg} ${width} ${shadowbg} text-white font-bold cursor-pointer border border-[#2D262D] rounded-md transition-all transform translate-x-[-0.25rem] translate-y-[-0.25rem] active:translate-x-0 active:translate-y-0 active:shadow-none flex flex-row items-center justify-center gap-2`}
    >
      <span className="text-base sm:text-lg">{text}</span>
      <Image
        src={"/arrow-right-icon.png"}
        alt="arrow"
        width={16}
        height={16}
        className="w-3 h-3 sm:w-4 sm:h-4"
      />
    </button>
  );
}

export default HomeBecomeGeniButton;
