import { Card } from "@/components/ui/card";
import { BadgeProgress } from "@/components/ui/badge-progress";
import Image from "next/image";
import { LockIcon } from "lucide-react";
import {
  BADGE_STATE,
  BadgeProcess,
} from "@/app/profile/_components/creator/badge.services";
import Link from "next/link";

type AchievementCardProps = {
  achievement: BadgeProcess;
  isEarned?: boolean;
  big?: boolean;
};

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isEarned = true,
  big = false,
}) => {
  const Wrapper = big ? "div" : Link;

  return (
    <Wrapper
      href={`/profile/achievements/${achievement.BadgeId}`}
      className={`${big ? "w-full" : ""}`}
    >
      <Card
        className={`h-full flex flex-col items-center p-4 pb-6 min-h-[200px]  ${
          big
            ? "border-[#E6E6E6] border-2"
            : "border-geni-gray cursor-pointer px-10"
        } ${
          big
            ? "bg-white"
            : isEarned
            ? "bg-primary-bg"
            : "bg-[#F5F4F0] opacity-60"
        }`}
      >
        <div className={`relative mb-2`}>
          <Image
            src={achievement.BadgeImageUrl}
            alt="icon"
            width={big ? 300 : 150}
            height={big ? 300 : 150}
            className={`mb-2 ${!isEarned ? "grayscale" : ""} ${
              big ? "w-[300px] h-[300px]" : "w-[150px] h-[150px]"
            } object-cover`}
          />
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
          <div className="flex-basis-full">
            {achievement.BadgeState == BADGE_STATE.MONTHLY ? (
              <div className={`text-sm mb-1 ${"text-[#6F6F6F]"}`}>
                {achievement.CurrentLvlName}
              </div>
            ) : (
              <>
                <div className={`text-sm mb-1 ${"text-[#6F6F6F]"}`}>
                  Түвшин {achievement.CurrentLvl}
                </div>
                <div className="flex items-center justify-center">
                  <BadgeProgress
                    currentTarget={achievement.CurrentTarget}
                    nextTarget={achievement.NextTarget}
                    className={`h-4 w-3/4 border border-black border-solid mt-2`}
                    bgcolor={isEarned || big ? "bg-geni-green" : "bg-[#E0E0E0]"}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default AchievementCard;
