"use client";
import React from "react";
import { useRouter } from "next/navigation";

function HandleButton({ disabled, handleFunction, text, bg, shadowbg, width }) {
  const router = useRouter();
  return (
    <button
      disabled={disabled}
      onClick={handleFunction}
      className={`${bg} ${width} ${shadowbg} text-white text-lg font-bold border border-[#2D262D] rounded-md transition-all transform translate-x-[-0.25rem] translate-y-[-0.25rem] active:translate-x-0 active:translate-y-0 active:shadow-none flex flex-row items-center justify-center gap-2`}
    >
      <span className="text-sm sm:text-base">{text}</span>
    </button>
  );
}

export default HandleButton;
