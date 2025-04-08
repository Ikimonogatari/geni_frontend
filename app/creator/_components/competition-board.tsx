"use client";

import { useGetCompetitionInfoQuery } from "@/app/services/service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

const getImageSrc = (tier: string) => {
  switch (tier) {
    case "Pro creator gold":
      return "/gold-tier.png";
    case "Pro creator silver":
      return "/silver-tier.png";
    case "Pro creator bronze":
      return "/bronze-tier.png";
    case "Certified creator":
      return "/verified-icon.png";
    default:
      return ""; // Default case for no image
  }
};

export default function CompetitionBoard() {
  const {
    data: compInfoData,
    error: getCompetitionInfoError,
    isLoading: getCompetitionInfoLoading,
  } = useGetCompetitionInfoQuery({});

  const currentMonthIndex = new Date().getMonth();
  return (
    <div className="relative w-full bg-primary-bg border border-geni-pink rounded-[30px] px-5 lg:pl-9 lg:pr-24 pt-32 pb-14">
      <div
        className="absolute w-full lg:w-fit top-7 lg:top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-6 px-2 lg:px-8 bg-geni-pink border border-border-gray/60 rounded-[50px] lg:rounded-[30px]
      shadow-[0px_5px_1px_0px_#000] lg:shadow-[0px_8px_1px_0px_#000]"
      >
        <div className="text-center mx-8 lg:mx-5 text-white font-bold text-base lg:text-2xl tracking-wide leading-tight">
          CAP БҮРИЙН БҮТЭЭГЧДИЙН УРАЛДААН
          <br />
          ТЭРГҮҮЛЭГЧДИЙН САМБАР
        </div>

        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2">
          <img
            src="/landing/common/competition/masks/banner-crowns.png"
            alt="Large Crown"
            className="h-8 w-full"
          />
        </div>

        <div className="absolute top-1/2 left-2 lg:left-4 transform -translate-y-1/2">
          <img
            src="/landing/common/competition/masks/banner-left.png"
            alt="Left Laurel"
            className="h-20"
          />
        </div>

        <div className="absolute top-1/2 right-2 lg:right-4 transform -translate-y-1/2">
          <img
            src="/landing/common/competition/masks/banner-right.png"
            alt="Right Laurel"
            className="h-20"
          />
        </div>

        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <img
            src="/landing/common/competition/masks/banner-bot.png"
            alt="Mid"
            className="h-auto w-8"
          />
        </div>

        {/* <div className="absolute -bottom-1 left-0 right-0 h-7 -z-[1] bg-gray-800 rounded-b-full"></div> */}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[6] flex flex-col lg:flex-row rounded-[30px] border border-geni-pink p-5 lg:pl-8">
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-col gap-0 lg:gap-3">
                <h5 className="text-base lg:text-2xl font-bold">
                  {currentMonthIndex + 1} сарын шагнал
                </h5>
                <h2 className="text-3xl lg:text-4xl font-bold">
                  {compInfoData?.PrizeName}
                </h2>
              </div>
              <p className="text-lg pr-8 leading-none lg:leading-normal">
                {compInfoData?.PrizeInformation}
              </p>
            </div>
            <div className="rounded-[30px] border border-geni-green mt-4 lg:mt-0 overflow-hidden">
              <Image
                src={compInfoData?.PrizePicUrl}
                alt="reward"
                sizes="100vw"
                width={0}
                height={0}
                className="w-full max-w-40 h-40 lg:h-auto"
              />
            </div>
          </div>
          <div className="flex-[4] flex flex-col justify-between px-5 py-4 rounded-[30px] bg-white">
            <Badge
              className="max-w-fit bg-geni-blue hover:bg-geni-blue text-lg lg:text-xl py-1 px-2 lg:px-4 uppercase text-center
            leading-none lg:leading-normal"
            >
              ӨМНӨХ сарын шилдэг бүтээгч
            </Badge>
            <div className="flex flex-col items-center lg:flex-row gap-5 mt-2 lg:mt-0">
              <div className="relative inline-flex justify-center items-center size-32 lg:size-24">
                <img
                  src="/landing/common/competition/masks/winner-crown.png"
                  alt="Laurel Wreath Crown"
                  className="absolute w-full h-full z-10"
                />

                <div className="absolute bottom-1 z-0 size-28 lg:size-20 rounded-full overflow-hidden">
                  <img
                    src={compInfoData?.PreviousWinner?.ProPicUrl}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center lg:items-start">
                <div className="flex gap-3">
                  <p className="text-base lg:text-2xl font-bold">
                    {compInfoData?.PreviousWinner?.Nickname}
                  </p>
                  {/* <Image src='' alt="badge" height={24} width={24}/> */}
                </div>
                <p className="text-sm lg:text-lg">
                  Цуглуулсан оноо: {compInfoData?.PreviousWinner?.Xp} XP
                </p>
              </div>
            </div>
            <p className="text-base lg:text-2xl font-bold text-center lg:text-start">
              Шагнал: {compInfoData?.PreviousCompPrizeName}
            </p>
          </div>
        </div>
        <h6 className="my-7 lg:my-4 text-base lg:text-2xl font-medium text-[#6F6F6F]">
          Энэ сарын шилдэг бүтээгчид
        </h6>
        <div className="space-y-5 lg:space-y-3">
          {compInfoData?.TopParticipants?.map((ptc, index) => (
            <div key={index} className="lg:relative flex items-center gap-3">
              <div className="size-14 lg:size-20 relative lg:static">
                <Image
                  src={`/landing/common/competition/ranks/${
                    index === 0
                      ? "1"
                      : index === 1
                      ? "2"
                      : index === 2
                      ? "3"
                      : "other"
                  }.png`}
                  alt="rank"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto relative"
                />
                <p
                  className={cn(
                    "absolute top-[25px] left-[25px] lg:top-[36px] lg:left-[36px] transform -translate-x-1/2 -translate-y-1/2 text-3xl font-black leading-none tracking-tighter",
                    ![0, 1, 2].includes(index) &&
                      "top-[26px] left-[27px] lg:top-[38px] lg:left-[38px] font-normal"
                  )}
                >
                  {index + 1}
                </p>
                {/* transform -translate-x-1/2 -translate-y-1/2 text-3xl font-black leading-none tracking-tighter */}
              </div>
              <div
                className="absolute left-[5rem] -right-4 overflow-x-scroll flex items-center justify-between 
              space-x-10 lg:space-x-0 rounded-r-none md:rounded-r-[30px] rounded-[30px] p-2 pr-5 lg:p-4 bg-white"
              >
                <div className="flex-1 flex gap-2 lg:gap-5">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={ptc?.ProPicUrl}
                      className="object-cover"
                    />
                    <AvatarFallback>{ptc?.Nickname}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-3 w-56 md:w-auto whitespace-nowrap">
                    <p className="text-2xl font-bold">{ptc?.Nickname}</p>
                    <Image
                      src={getImageSrc(ptc?.LvlName)}
                      alt="badge"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className={cn(
                        "w-14 h-auto",
                        ptc?.LvlName === "Certified creator" && "w-6"
                      )}
                    />
                    {/* <Badge className="border-black text-black font-black bg-[#FFC12F] hover:bg-[#FFC12F] py-1 px-2.5 text-xl !leading-[1rem] tracking-wide">
                      PRO
                    </Badge> */}
                  </div>
                </div>
                <div className="flex flex-1 justify-center w-56 md:w-auto whitespace-nowrap">
                  <p className="text-lg">Нийт хамтрал: {ptc?.ContentCount}</p>
                </div>
                <div className="flex-1 flex justify-center w-56 md:w-auto whitespace-nowrap">
                  <p className="text-lg">Цуглуулсан оноо: {ptc?.Xp} XP</p>
                </div>
                <div className="flex-1 flex gap-2 justify-center w-56 md:w-auto whitespace-nowrap">
                  <Image
                    src="/star.png"
                    alt="star"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <p className="text-lg">
                    {ptc?.AvgStar}/5 ({ptc?.ContentCount} контент)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
