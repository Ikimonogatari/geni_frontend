import React from "react";
import Image from "next/image";
import PriceFormatter from "../common/FormatPrice";
import { useGetOnboardingCourseQuery } from "@/app/services/service";

function Step1({ handleSelect, selectedOption }) {
  const {
    data: courseData,
    isLoading,
    error,
  } = useGetOnboardingCourseQuery({});

  const coursePrice = courseData?.price || 480000; // Fallback to default price if API fails

  return (
    <>
      <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
        Geni Creator Course идэвхжүүлэх
      </span>
      <div className="w-full flex flex-row items-stretch gap-4 sm:gap-5 md:gap-10">
        <div
          className={`w-full flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 p-3 sm:p-6 rounded-3xl border-[2px] transition-all ${
            selectedOption === "creatorcourse"
              ? "border-[#4D55F5]"
              : "border-[#CDCDCD]"
          }`}
          onClick={() => handleSelect("creatorcourse")}
        >
          <Image src={"/creator-image1.png"} width={188} height={241} alt="" />
          <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-4">
            <span className="text-2xl lg:text-3xl font-bold text-center">
              Geni Creator Course
            </span>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base">Хичээлийн үнэ:</span>
              <span className="text-xl sm:text-2xl">
                <PriceFormatter price={coursePrice} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Step1;
