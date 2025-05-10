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
    <div className="grid grid-cols-4 gap-2 items-stretch pt-4">
      <div className="flex flex-col gap-2 col-span-4 md:col-span-2 lg:col-span-1">
        <span className="text-[#6F6F6F] text-sm sm:text-base">Түвшин:</span>
        <div className="flex flex-col gap-2 border border-primary rounded-2xl p-4 h-full max-h-24">
          <div className="flex flex-row items-center gap-2">
            <CreatorTier tier={userInfoData?.LevelName} className="min-w-max" />
            <LevelProgressBar
              level={userInfoData?.Level}
              progress={userInfoData?.Point}
              total={userInfoData?.TotalPoints}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/profile/point-board">
                    <Image
                      src={"/info-icon.png"}
                      width={24}
                      height={24}
                      className="w-5 h-5 sm:min-w-6 sm:min-h-6 rounded-full min-w-max"
                      alt=""
                    />
                  </Link>
                </TooltipTrigger>
                {/* @ts-ignore */}
                <TooltipContent>
                  <span>Таны онооны самбар</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-sm sm:text-base">
            Дараагын түвшин хүртэл: <b>626xp</b>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
        <span className="text-[#6F6F6F] text-sm sm:text-base">
          Дундаж үнэлгээ:
        </span>
        <StarRating
          averageRating={userInfoData?.AverageRating}
          contentCount={userInfoData?.ContentCount}
          className="border border-primary rounded-2xl p-4 h-full max-h-24"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
        <span className="text-[#6F6F6F] text-sm sm:text-base">
          Geni хэтэвч:
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="min-h-24 h-full">
              <Link
                className="border border-primary rounded-2xl p-4 flex flex-row gap-2 justify-center items-center h-full"
                href="/wallet"
              >
                <span className="text-sm sm:text-base">Geni Oноо:</span>
                <span className="text-xl sm:text-2xl font-extrabold">
                  {userInfoData && (
                    <PriceFormatter price={userInfoData?.Credit} />
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
      <div className="flex flex-col gap-2 col-span-4 md:col-span-2 lg:col-span-1">
        <span className="text-[#6F6F6F] text-sm sm:text-base">Амжилтууд:</span>
        <CreatorBadges />
      </div>
    </div>
  );
}

export default CreatorProfileHeader;
