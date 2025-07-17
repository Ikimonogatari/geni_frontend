"use client";

import { useGetCreatorBadgesQuery } from "@/app/services/service";
import AchievementCard from "@/components/AchievementCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import _ from "lodash";

const AchievementsPage = () => {
  const router = useRouter();
  const { data: badges, isLoading, error } = useGetCreatorBadgesQuery();
  const badgesData = badges?.flatMap((badge) => badge.BadgeProcess);

  const earnedAchievements = badgesData?.filter(
    (v) => v.CurrentTarget == v.NextTarget || v.CurrentTarget > 1
  );
  const unearnedAchievements = _.differenceBy(badgesData, earnedAchievements, 'BadgeId');

  if (isLoading) {
    return (
      <div className="max-w-6xl min-h-screen mx-auto px-7 py-11 container">
        <div className="text-center">Цолуудыг авч байна...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl min-h-screen mx-auto px-7 py-11 container">
        <div className="text-center text-red-500">
          Цол авч байхад алдаа гарлаа
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl min-h-screen mx-auto px-7 py-11 container">
      <button
        onClick={() => router.back()}
        className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4 mb-4"
      >
        <Image
          src={"/arrow-left.png"}
          width={24}
          height={24}
          alt="arrow-left"
        />
      </button>
      <h1 className="text-3xl font-bold mb-6">Таны цол</h1>
      <div className="mb-2 text-lg">Авсан цолнууд</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {earnedAchievements.map((ach, idx) => (
          <AchievementCard key={idx} achievement={ach} />
        ))}
      </div>
      <div className="mb-2 text-lg">Аваагүй цолнууд</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {unearnedAchievements.map((ach, idx) => (
          <AchievementCard key={idx} achievement={ach} isEarned={false} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
