"use client";
import React, { use, useState } from "react";

import Image from "next/image";

function page() {
  const [userType, setUserType] = useState("creator");
  return (
    <div className="w-full h-full bg-white">
      <div className="pt-32 pb-12">
        <div className="container text-[#2D262D] max-w-6xl mx-auto px-7 py-20 flex flex-col">
          <span className="text-[#2D262D] font-bold text-4xl sm:text-5xl xl:text-6xl mt-7 pb-4 border-b border-[#CDCDCD]">
            Create user
          </span>
          <form className="flex flex-col">
            <span className="text-xl font-bold mt-6 mb-4">Төрөл</span>
            <div className="flex flex-row items-center gap-6 max-w-[403px]">
              <div
                onClick={() => setUserType("creator")}
                className={`transition-all duration-150 ${
                  userType === "creator"
                    ? "border-[#CA7FFE]"
                    : "border-[#CDCDCD]"
                } cursor-pointer py-3 px-8 rounded-lg border-[2px] w-full text-center`}
              >
                Geni Creator
              </div>
              <div
                onClick={() => setUserType("brand")}
                className={`transition-all duration-150 ${
                  userType === "brand" ? "border-[#CA7FFE]" : "border-[#CDCDCD]"
                } cursor-pointer py-3 px-8 rounded-lg  border-[2px] w-full text-center`}
              >
                Geni brand
              </div>
            </div>
            <span className="text-lg mt-6 mb-4">И-мэйл</span>
            <input
              type="email"
              placeholder=""
              className="border-[2px] border-[#CDCDCD] rounded-lg max-w-[403px] h-14 p-4"
            />
            <span className="text-lg mt-6 mb-4">Нэг удаагын нэвтрэх код</span>
            <input
              type="text"
              placeholder=""
              className="border-[2px] border-[#CDCDCD] rounded-lg max-w-[403px] h-14 p-4"
            />
            <button
              type="submit"
              className="bg-[#4FB755] rounded-lg border border-[#2D262D] max-w-[403px] text-white text-xl font-bold text-center py-4 mt-6"
            >
              Үүсгэх
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
