import React from "react";
import Image from "next/image";
import { useGetCreatorBadgesQuery } from "@/app/services/service";

function CreatorBadges() {
  const { data: badges } = useGetCreatorBadgesQuery();
  const badgesData = badges?.flatMap((badge) => badge.BadgeProcess);

  const earnedAchievements = badgesData?.filter(
    (v) => v.CurrentTarget == v.NextTarget || v.CurrentTarget > 1
  ).slice(0, 3);

  return (
    <div className="flex flex-row items-center gap-2 overflow-x-auto border rounded-2xl p-2 sm:p-4 h-full">
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
