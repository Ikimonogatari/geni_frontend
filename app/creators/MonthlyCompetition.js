import React from "react";
import Image from "next/image";

function MonthlyCompetition() {
  return (
    <div className="flex flex-col gap-6 w-full h-full mt-12 sm:mt-20">
      <span className="text-2xl sm:text-3xl xl:text-4xl font-bold">
        Сар бүрийн бүтээгчдийн уралдаан
      </span>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="h-full w-full md:w-3/5 flex flex-col sm:flex-row gap-5 justify-between border border-[#CA7FFE] bg-[#F5F4F0] rounded-3xl p-7">
          <div className="flex flex-col gap-2">
            <span className="text-base sm:text-xl">10 сарын шагнал</span>
            <span className="text-lg sm:text-2xl font-bold">ВИДЕО ГЭРЭЛ</span>
          </div>
          <Image
            src={"/dummy-profile.jpg"}
            width={164}
            height={164}
            alt=""
            className="w-full sm:w-[164px] sm:h-[164px] border border-[#4FB755] aspect-square rounded-2xl"
          />
        </div>
        <div className="h-full w-full md:w-2/5 flex flex-col gap-2 bg-[#F5F4F0] rounded-3xl p-7">
          <span className="text-base sm:text-xl">9 сарын ялагч</span>
          <div className="flex flex-row items-center gap-6">
            <Image
              src={"/dummy-profile.jpg"}
              width={90}
              height={90}
              alt=""
              className="w-[90px] h-[90px] rounded-full border border-[#000000]"
            />
            <div className="flex flex-col gap-1 sm:gap-3">
              <div className="flex flex-row items-center gap-2 sm:gap-3">
                <span className="text-base sm:text-xl font-semibold">
                  Urtnasan
                </span>
                <Image
                  src={"/verified-icon.png"}
                  width={20}
                  height={20}
                  alt="verified-icon"
                  className="w-5 h-5"
                />
              </div>
              <span className="text-sm sm:text-lg">
                Цуглуулсан оноо: 120 XP
              </span>
            </div>
          </div>
          <span className="font-bold text-base sm:text-xl">
            Шагнал: Утас тогтоогч хөл
          </span>
        </div>
      </div>
    </div>
  );
}

export default MonthlyCompetition;
