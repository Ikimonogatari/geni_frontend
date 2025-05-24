import React from "react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { LockIcon } from "lucide-react";

type AchievementCardProps = {
  achievement: any;
  isEarned?: boolean;
};

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isEarned = true,
}) => {
  return (
    <Card
      className={`flex flex-col items-center p-4 min-h-[200px] border-[#F5F4F0] ${
        isEarned ? "bg-white" : "bg-[#F5F4F0] opacity-60"
      }`}
    >
      <div className={`relative mb-2`}>
        <Image
          src={achievement.icon}
          alt="icon"
          width={72}
          height={72}
          className={`mb-2 ${!isEarned ? "grayscale" : ""}`}
        />
        {/* Badge for earned achievements */}
        {isEarned && achievement.badge && (
          <span
            className={`absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full border-2 border-white text-white text-base font-bold ${achievement.badge.color}`}
          >
            <Image
              src={achievement.badge.icon}
              alt="badge"
              width={20}
              height={20}
              className="mr-1"
            />
            {achievement.badge.text}
          </span>
        )}
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
          className={`font-semibold text-base mb-1 ${
            isEarned ? "text-[#2D262D]" : "text-[#BDBDBD]"
          }`}
        >
          {achievement.title}
        </div>
        <div
          className={`text-xs mb-1 ${
            isEarned ? "text-[#4FB755]" : "text-[#BDBDBD]"
          }`}
        >
          {achievement.subtitle}
        </div>
        {achievement.date && isEarned && (
          <div className="text-xs text-[#4FB755] mb-1">{achievement.date}</div>
        )}
        {achievement.progress !== null && (
          <Progress
            value={achievement.progress}
            className={`h-2 mt-2 ${isEarned ? "bg-[#F5F4F0]" : "bg-[#E0E0E0]"}`}
          />
        )}
      </div>
    </Card>
  );
};

export default AchievementCard;
