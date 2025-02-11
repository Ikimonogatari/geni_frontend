import React from "react";

function Step2({ setIsAgreed }: { setIsAgreed?: any }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
        Платформыг ашиглах үйлчилгээний нөхцөл
      </span>
      <span className="text-[#6F6F6F] text-sm sm:text-base">
        Сүүлд шинэчлэгдсэн: 2024.12.13
      </span>

      <div className="text-sm sm:text-base md:text-lg lg:text-xl font-thin rounded-3xl border border-[#CDCDCD] py-3 sm:py-6 px-5 sm:px-8 w-full overflow-y-auto max-h-[160px] sm:max-h-[330px]"></div>
    </div>
  );
}

export default Step2;
