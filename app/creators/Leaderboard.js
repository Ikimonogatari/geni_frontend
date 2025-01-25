import React from "react";
import Image from "next/image";
import CreatorTier from "@/components/CreatorTier";
import LeaderboardRank from "./LeaderboardRank";

function Leaderboard({ getCompetitionInfoData }) {
  return (
    <div className="w-full overflow-x-auto mt-12 sm:mt-20">
      <span className="text-xl text-[#6F6F6F]">Энэ сарын шилдэг бүтээгчид</span>
      <div className="min-w-[800px] sm:min-w-[1000px] mt-4 flex flex-col gap-3">
        {getCompetitionInfoData?.TopParticipants?.map((c, i) => (
          <div key={i} className="flex flex-row items-center gap-3">
            <LeaderboardRank rank={i + 1} />
            <div className="text-lg sm:text-base w-full grid grid-cols-4 gap-1 sm:gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] bg-[#F5F4F0] rounded-3xl">
              <div className="col-span-1 flex flex-row items-center gap-2">
                <Image
                  src={c?.ProPicUrl ? c?.ProPicUrl : "/dummy-creator.png"}
                  width={44}
                  height={44}
                  loading="lazy"
                  alt=""
                  className="object-cover w-11 h-11 rounded-full border border-black"
                />
                <span className="text-sm sm:text-lg font-semibold">
                  {c?.Nickname}
                </span>
                <CreatorTier tier={c?.LvlName} />
              </div>
              <span className="text-xs sm:text-base col-span-1">
                Нийт хамтрал: {c?.ContentCount}
              </span>
              <span className="text-xs sm:text-base col-span-1">
                Цуглуулсан оноо: {c?.Xp} XP
              </span>
              <div className="text-xs sm:text-base col-span-1 flex flex-row items-center gap-3">
                <Image
                  src={"/star.png"}
                  width={24}
                  height={24}
                  className="w-4 h-4 sm:w-6 sm:h-6"
                  alt=""
                />
                {c?.AvgStar}/5 ({c?.ContentCount} контент)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;

const leaderboard = [
  { rank: 1 },
  { rank: 2 },
  { rank: 3 },
  { rank: 4 },
  { rank: 5 },
];
