import React from "react";
import Image from "next/image";
import CreatorTier from "../components/CreatorTier";

function MonthlyCompetition({ getCompetitionInfoData }) {
  return (
    <div className="flex flex-col gap-6 w-full h-full mt-12 sm:mt-20">
      <span className="text-2xl sm:text-3xl xl:text-4xl font-bold">
        Сар бүрийн бүтээгчдийн уралдаан
      </span>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="h-full w-full md:w-3/5 flex flex-col sm:flex-row gap-5 justify-between border border-[#CA7FFE] bg-[#F5F4F0] rounded-3xl p-7">
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="text-base sm:text-xl">Энэ сарын уралдаан</span>
            <span className="text-lg sm:text-2xl font-bold uppercase">
              {getCompetitionInfoData?.PrizeName}
            </span>
            <span className="">{getCompetitionInfoData?.PrizeInformation}</span>
          </div>
          {getCompetitionInfoData?.PrizePicUrl ? (
            <Image
              src={getCompetitionInfoData?.PrizePicUrl}
              width={164}
              height={164}
              loading="lazy"
              alt=""
              className="object-cover w-full sm:w-[164px] sm:h-[164px] border border-[#4FB755] aspect-square rounded-2xl"
            />
          ) : (
            <div className="w-[164px] h-[164px]"></div>
          )}
        </div>
        {getCompetitionInfoData?.PreviousWinner ? (
          <div className="h-full w-full md:w-2/5 flex flex-col gap-2 bg-[#F5F4F0] rounded-3xl p-7">
            <span className="text-base sm:text-xl">Өмнөх сарын ялагч</span>
            <div className="flex flex-row items-center gap-6">
              <Image
                src={
                  getCompetitionInfoData?.PreviousWinner?.ProPicUrl
                    ? getCompetitionInfoData?.PreviousWinner?.ProPicUrl
                    : "/dummy-creator.png"
                }
                width={90}
                height={90}
                alt=""
                loading="lazy"
                className="w-[90px] h-[90px] rounded-full border border-[#000000]"
              />
              <div className="flex flex-col gap-1 sm:gap-3">
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  <span className="text-base sm:text-xl font-semibold">
                    {getCompetitionInfoData?.PreviousWinner?.Nickname}
                  </span>
                  <CreatorTier
                    tier={getCompetitionInfoData?.PreviousWinner?.LvlName}
                  />
                </div>
                <span className="text-sm sm:text-base">
                  Цуглуулсан оноо:{" "}
                  {getCompetitionInfoData?.PreviousWinner?.Point}
                  XP
                </span>
              </div>
            </div>
            <span className="font-bold text-base sm:text-xl">
              Шагнал: {getCompetitionInfoData?.PreviousCompPrizeName}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MonthlyCompetition;
