import React from "react";
import Image from "next/image";
import { useGetCreatorBadgesQuery } from "@/app/services/service";
import { ClipLoader } from "react-spinners";

function CreatorBadges() {
  const { data: badges, isLoading: badgesLoading } = useGetCreatorBadgesQuery();
  const badgesData = badges?.flatMap((badge) => badge.BadgeProcess);

  const earnedAchievements = badgesData
    ?.filter((v) => v.CurrentTarget == v.NextTarget || v.CurrentLvl > 1)
    .slice(0, 3);

  return (
    <div className="flex flex-row items-center gap-2 overflow-x-auto border rounded-2xl p-2 sm:p-4 h-full">
      <ClipLoader
        loading={badgesLoading}
        aria-label=""
        data-testid="loader"
        className="aspect-[9/16] w-full h-full rounded-2xl"
        size={30}
      />
      {earnedAchievements?.map((v) => (
        <div key={v.BadgeId}>
          <Image
            src={v.BadgeImageUrl}
            width={47}
            height={47}
            alt=""
            className="w-7 h-7 sm:w-10 sm:h-10"
          />
        </div>
      ))}
    </div>
  );
}

export default CreatorBadges;
