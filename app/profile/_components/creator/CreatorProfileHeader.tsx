import React from "react";
import Image from "next/image";
import CreatorTier from "@/components/CreatorTier";
import LevelProgressBar from "./LevelProgressBar";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import StarRating from "./StarRating";
import CreatorBadges from "./CreatorBadges";
import PriceFormatter from "@/components/common/FormatPrice";
interface CreatorProfileHeaderProps {
  userInfoData: any;
}

function CreatorProfileHeader({ userInfoData }: CreatorProfileHeaderProps) {
  return (
    <div className="pt-4">
      {/* Mobile layout */}
      <div className="sm:hidden">
        {/* Level section - always full width on mobile */}
        <div className="flex flex-col gap-1 sm:gap-2 mb-4">
          <span className="text-[#6F6F6F] text-[11px] sm:text-base">
            Түвшин:
          </span>

          <div className="flex flex-col justify-center gap-1 sm:gap-2 border rounded-2xl sm:p-4 p-2 h-full">
            <div className="flex flex-row items-center gap-1 sm:gap-2">
              <CreatorTier
                isProfile={true}
                tier={userInfoData?.LevelName}
                className="min-w-max"
              />
              <LevelProgressBar
                progress={userInfoData?.XP}
                nextLvlXpThreshold={userInfoData?.NextLvlXP}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/profile/point-board">
                      <Image
                        src={"/info-icon.png"}
                        width={24}
                        height={24}
                        alt=""
                        className="min-w-6 sm:min-h-6"
                      />
                    </Link>
                  </TooltipTrigger>
                  {/* @ts-ignore */}
                  <TooltipContent>
                    <span>Онооны самбар харах</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-[11px] flex gap-1">
              Дараагын түвшинд гарахад
              <b>{userInfoData?.NextLvlXP - userInfoData?.XP} XP</b> дутуу
            </span>
          </div>
        </div>

        {/* Remaining sections - horizontal scroll on mobile */}
        <div className="flex flex-row gap-2 overflow-x-auto w-full">
          <div className="flex flex-col gap-1 sm:gap-2 min-w-[100px]">
            <span className="text-[#6F6F6F] text-[11px] sm:text-base">
              Дундаж үнэлгээ:
            </span>
            <StarRating
              averageRating={userInfoData?.AverageRating}
              contentCount={userInfoData?.ContentCount}
              className="border rounded-2xl p-2 sm:p-4 h-full"
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2 min-w-[100px]">
            <span className="text-[#6F6F6F] text-[11px] sm:text-base">
              Geni хэтэвч:
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="h-full">
                  <Link
                    className="border rounded-2xl p-2 sm:p-4 flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center sm:items-center h-full"
                    href="/wallet"
                  >
                    <span className="text-[#6F6F6F] text-[10px] sm:text-base text-start">
                      Geni Оноо:
                    </span>
                    <span className="text-base sm:text-2xl font-extrabold flex gap-1">
                      {userInfoData && (
                        <PriceFormatter
                          noSymbol={true}
                          price={
                            userInfoData?.Balance ? userInfoData?.Balance : 0
                          }
                        />
                      )}
                    </span>
                  </Link>
                </TooltipTrigger>
                {/* @ts-ignore */}
                <TooltipContent>
                  <span>Хэтэвч рүү үсрэх</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2 min-w-[100px]">
            <span className="text-[#6F6F6F] text-[11px] sm:text-base">
              Амжилтууд:
            </span>
            <CreatorBadges />
          </div>
        </div>
      </div>

      {/* Desktop layout - original grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-2 items-stretch">
        <div className="flex flex-col gap-1 sm:gap-2">
          <span className="text-[#6F6F6F] text-[11px] sm:text-base">
            Түвшин:
          </span>

          <div className="flex flex-col justify-center gap-2 border rounded-2xl sm:p-4 p-2 h-full">
            <div className="flex flex-row items-center gap-1 sm:gap-2">
              <CreatorTier
                tier={userInfoData?.LevelName}
                className="min-w-max"
              />
              <LevelProgressBar
                progress={userInfoData?.XP}
                nextLvlXpThreshold={userInfoData?.NextLvlXP}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/profile/point-board">
                      <Image
                        src={"/info-icon.png"}
                        width={24}
                        height={24}
                        alt=""
                        className="min-w-6 sm:min-h-6"
                      />
                    </Link>
                  </TooltipTrigger>
                  {/* @ts-ignore */}
                  <TooltipContent>
                    <span>Онооны самбар харах</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-[11px]">
              Дараагын түвшинд гарахад{" "}
              <b>{userInfoData?.NextLvlXP - userInfoData?.XP} XP</b> дутуу
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 col-span-4 sm:col-span-1">
          <span className="text-[#6F6F6F] text-[11px] sm:text-base">
            Дундаж үнэлгээ:
          </span>
          <StarRating
            averageRating={userInfoData?.AverageRating}
            contentCount={userInfoData?.ContentCount}
            className="border rounded-2xl p-2 sm:p-4 h-full"
          />
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 col-span-4 sm:col-span-1">
          <span className="text-[#6F6F6F] text-[11px] sm:text-base">
            Geni хэтэвч:
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="h-full">
                <Link
                  className="border rounded-2xl p-2 sm:p-4 flex flex-wrap sm:flex-row gap-1 sm:gap-2 justify-center items-center h-full"
                  href="/wallet"
                >
                  <span className="text-[#6F6F6F] text-[10px] sm:text-base">
                    Geni Оноо:
                  </span>
                  <span className="text-base sm:text-2xl font-extrabold flex gap-1">
                    {userInfoData && (
                      <PriceFormatter
                        noSymbol={true}
                        price={
                          userInfoData?.Balance ? userInfoData?.Balance : 0
                        }
                      />
                    )}
                  </span>
                </Link>
              </TooltipTrigger>
              {/* @ts-ignore */}
              <TooltipContent>
                <span>Хэтэвч рүү үсрэх</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 col-span-4 sm:col-span-1">
          <span className="text-[#6F6F6F] text-[11px] sm:text-base">
            Амжилтууд:
          </span>
          <Link href="/profile/achievements">
            <CreatorBadges />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatorProfileHeader;
