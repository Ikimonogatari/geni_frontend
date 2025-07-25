"use client";
import { useDateFormatter } from "@/app/hooks/useDateFormatter";
import {
  useCreatorXpHistoryQuery,
  useGetUserInfoQuery,
} from "@/app/services/service";
import BackButton from "@/components/common/BackButton";
import ListRowLayout from "@/components/common/ListRowLayout";
import CreatorTier from "@/components/CreatorTier";
import TierInfoModal from "@/components/TierInfoModal";
import Image from "next/image";
import React from "react";

function page() {
  const { formatDate } = useDateFormatter();
  const { data: userInfoData } = useGetUserInfoQuery({});
  // @ts-ignore
  const { data } = useCreatorXpHistoryQuery();
  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className=" pb-12 sm:pb-24">
        <div className="max-w-7xl mx-auto container py-11 sm:py-20 flex flex-col gap-4 sm:gap-6">
          <BackButton />
          <span className="text-3xl sm:text-5xl font-extrabold">
            Таны онооны самбар
          </span>
          <div className="bg-primary-bg rounded-2xl w-full p-8 flex flex-col md:flex-row justify-between items-start gap-5 md:gap-0">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-14 md:gap-20 sm:border-b sm:pb-4">
                <div className="flex flex-col">
                  <span className="text-[#6F6F6F]">Таны түвшин:</span>
                  <span className="flex flex-row items-center gap-2 text-xl sm:text-3xl font-bold">
                    {userInfoData?.LevelName}
                    <CreatorTier
                      tier={userInfoData?.LevelName}
                      className={
                        userInfoData?.LevelName?.startsWith("Pro")
                          ? "max-h-[18px] sm:min-h-[28px] max-w-[52px] sm:min-w-[72px]"
                          : "min-h-[24px] min-w-[24px]"
                      }
                    />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#6F6F6F]">Нийт оноо:</span>
                  {userInfoData?.XP && (
                    <span className="text-xl sm:text-3xl font-bold">
                      {userInfoData?.XP} XP
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-14 md:gap-20">
                <div className="flex flex-col">
                  <span className="text-[#6F6F6F]">
                    Таны дараагын хүрэх түвшин :
                  </span>
                  <span className="flex flex-row items-center gap-2 text-base font-bold">
                    {userInfoData?.NextLvlName}
                    <CreatorTier
                      tier={userInfoData?.NextLvlName}
                      className={
                        userInfoData?.NextLvlName?.startsWith("Pro")
                          ? "max-h-[18px] sm:min-h-[28px] max-w-[52px] sm:min-w-[72px]"
                          : "min-h-[24px] min-w-[24px]"
                      }
                    />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#6F6F6F]">Дутуу оноо:</span>
                  {userInfoData?.NextLvlXP && (
                    <span className="text-base font-bold text-geni-red">
                      {userInfoData?.NextLvlXP - userInfoData?.XP} XP
                    </span>
                  )}
                </div>
              </div>
            </div>
            <TierInfoModal />
          </div>
          <div className="w-full overflow-x-auto flex flex-col gap-4">
            <span className="font-bold text-2xl px-5">XP оноо түүх</span>
            <div className="min-w-[540px] w-full flex flex-col gap-3">
              <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[1fr,1fr,2fr,1fr,1fr] gap-6 w-full items-center text-[#6F6F6F]">
                <span className="col-span-1">Ашиглагдсан</span>
                <span className="col-span-1">Үлдэгдэл</span>
                <span className="col-span-1">Тайлбар</span>
                <span className="col-span-1">Хугацаа</span>
                <span className="col-span-1">Төлөв</span>
              </div>
              {data?.map((h, i) => (
                <ListRowLayout
                  key={i}
                  layout="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[1fr,1fr,2fr,1fr,1fr] gap-6 w-full items-center text-primary"
                >
                  <span
                    className={`col-span-1 font-bold text-sm sm:text-base lg:text-lg ${
                      h.IsAdd ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {h.IsAdd ? "+" : "-"}
                    {h.Xp} XP
                  </span>
                  <span className="col-span-1">{h.AfterXp} XP</span>
                  <span className="col-span-1">{h.Desc}</span>
                  <span className="col-span-1">{formatDate(h.CreatedAt)}</span>
                  <span
                    className={`col-span-1 max-w-min rounded-lg sm:rounded-xl text-white py-1 px-2 sm:px-4 text-center text-[10px] sm:text-sm lg:text-lg ${
                      h.IsAdd ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {h.IsAdd ? " Нэмэгдсэн" : "Хасагдсан"}
                  </span>
                </ListRowLayout>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
