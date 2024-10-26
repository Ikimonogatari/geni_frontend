"use client";
import React from "react";
import Image from "next/image";
import CreatorTier from "../components/CreatorTier";
import LeaderboardRank from "./LeaderboardRank";

function Leaderboard() {
  return (
    <div className="w-full overflow-x-auto mt-12 sm:mt-20">
      <span className="text-xl text-[#6F6F6F]">Энэ сарын шилдэг бүтээгчид</span>
      <div className="min-w-[800px] sm:min-w-[1000px] mt-4 flex flex-col gap-3">
        {leaderboard?.map((c, i) => (
          <div key={i} className="flex flex-row items-center gap-3">
            <LeaderboardRank rank={c.rank} />
            <div className="text-lg sm:text-base w-full grid grid-cols-4 gap-1 sm:gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] bg-[#F5F4F0] rounded-3xl">
              <div className="col-span-1 flex flex-row items-center gap-2">
                <Image
                  src={"/dummy-profile.jpg"}
                  width={44}
                  height={44}
                  alt=""
                  className="w-11 h-11 rounded-full border border-black"
                />
                <span className="text-sm sm:text-lg font-semibold">
                  Anudelger
                </span>
                <CreatorTier />
              </div>
              <span className="text-xs sm:text-base col-span-1">
                Нийт хамтрал: 8
              </span>
              <span className="text-xs sm:text-base col-span-1">
                Цуглуулсан оноо: 65 XP
              </span>
              <div className="text-xs sm:text-base col-span-1 flex flex-row items-center gap-3">
                <Image
                  src={"/star.png"}
                  width={24}
                  height={24}
                  className="w-4 h-4 sm:w-6 sm:h-6"
                  alt=""
                />
                4.5/5 (8 контент)
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
