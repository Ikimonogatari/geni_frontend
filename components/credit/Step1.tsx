import React from "react";
import Image from "next/image";

function Step1({ handleSelect, selectedOption }) {
  return (
    <>
      <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
        Та Geni Платформыг ашиглах төрлөө сонгоно уу
      </span>
      <div className="flex flex-row items-stretch gap-4 sm:gap-5 md:gap-10">
        <div
          className={`w-full flex flex-col justify-center items-center gap-2 sm:gap-4 p-3 sm:p-6 rounded-3xl border-[2px] transition-all ${
            selectedOption === "freecontent"
              ? "border-[#4D55F5]"
              : "border-[#CDCDCD]"
          }`}
          onClick={() => handleSelect("freecontent")}
        >
          <Image src={"/freecontentwave.svg"} width={357} height={166} alt="" />
          <span className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-center">
            Үнэгүй контент давлагаанд нэгдэх
          </span>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg text-center">
            Зөвхөн нэг удаа ашиглах эрхтэй.
          </span>
        </div>
        <div
          className={`w-full flex flex-col justify-center items-center gap-1 sm:gap-3 p-3 sm:p-6 rounded-3xl border-[2px] transition-all ${
            selectedOption === "brandpackage"
              ? "border-[#4D55F5]"
              : "border-[#CDCDCD]"
          }`}
          onClick={() => handleSelect("brandpackage")}
        >
          <Image
            src={"/brand-register-success.png"}
            width={252}
            height={193}
            alt=""
          />
          <span className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-center">
            Geni Brand багц <br className="hidden lg:block" />
            идэвхжүүлэх
          </span>
        </div>
      </div>
    </>
  );
}

export default Step1;
