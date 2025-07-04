import React from "react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { LockIcon } from "lucide-react";
import { BadgeProcess } from "@/app/profile/_components/creator/badge.services";

type AchievementCardProps = {
  achievement: BadgeProcess;
  isEarned?: boolean;
};

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isEarned = true,
}) => {
  const currentNextTarget =
    achievement.CurrentLvl == achievement.NextLvl
      ? achievement.NextTarget
      : achievement.NextTarget - 1;

  const calculateProgress = () => {
    if (achievement.NextTarget === 0) return 100;
    return Math.round((achievement.CurrentTarget / currentNextTarget) * 100);
  };

  const progress = calculateProgress();

  return (
    <Card
      className={`flex flex-col items-center p-4 pb-6 min-h-[200px] border-geni-gray ${
        isEarned ? "bg-primary-bg" : "bg-[#F5F4F0] opacity-60"
      }`}
    >
      <div className={`relative mb-2`}>
        <Image
          src={achievement.BadgeImageUrl}
          alt="icon"
          width={150}
          height={150}
          className={`mb-2 ${
            !isEarned ? "grayscale" : ""
          } w-[150px] h-[150px] object-cover`}
        />
        {/* Badge for earned achievements */}
        {/* {isEarned && (
          <span
            className={`absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full border-2 border-white text-white text-base font-bold bg-[#4FB755]`}
          >
            <Image
              src="/star.png"
              alt="badge"
              width={20}
              height={20}
              className="mr-1"
            />
            {achievement.CurrentLvl}
          </span>
        )} */}
        {/* Locked icon for unearned achievements */}
        {!isEarned && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-9 h-9 bg-white border border-[#E0E0E0] rounded-full flex items-center justify-center">
              <LockIcon />
            </span>
          </span>
        )}
      </div>
      <div className="text-center w-full">
        <div
          className={`font-semibold text-xl mb-1 ${
            isEarned ? "text-[#2D262D]" : "text-[#BDBDBD]"
          }`}
        >
          {achievement.BadgeName}
        </div>
        <div className={`text-sm mb-1 ${"text-[#6F6F6F]"}`}>
          Түвшин {achievement.CurrentLvl}
        </div>
        {/* {achievement.NextTarget > 0 && (
          <div className="text-xs text-[#666] mb-1">
            {achievement.CurrentTarget} / {currentNextTarget}
          </div>
        )} */}
        <div className="flex items-center justify-center">
          <Progress
            value={progress}
            className={`h-4 w-3/4 border border-black border-solid mt-2 ${
              isEarned ? "bg-geni-green" : "bg-[#E0E0E0]"
            }`}
          />
        </div>
      </div>
    </Card>
  );
};

export default AchievementCard;
