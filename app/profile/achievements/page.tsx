"use client";

import { useGetCreatorBadgesQuery } from "@/app/services/service";
import AchievementCard from "@/components/AchievementCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AchievementsPage = () => {
  const router = useRouter();
  const { data: badges, isLoading, error } = useGetCreatorBadgesQuery();
  console.log("achievements", badges);

  // Get earned achievements from backend data
  // const earnedAchievements =
  //   badges?.flatMap((badge) =>
  //     badge.BadgeProcess.filter(
  //       (v) => v.CurrentTarget != 0 && v.CurrentLvl != 1
  //     )
  //   ) || [];
  const earnedAchievements = badges?.[badges.length - 1].BadgeProcess;

  const unearnedAchievements =
    badges?.flatMap((v) =>
      v.BadgeProcess.filter((v) => v.CurrentTarget == 0 && v.CurrentLvl == 1)
    ) || [];

  // Create unearned achievements (placeholder for now)
  // const unearnedAchievements = Array(5).fill({
  //   BadgeImageUrl: "/verified-icon.png",
  //   BadgeName: "Certified creator",
  //   CurrentLvlName: "Level 1",
  //   CurrentLvl: 0,
  //   CurrentTarget: 0,
  //   NextLvl: 1,
  //   NextTarget: 10,
  //   BadgeColorCode: "#BDBDBD",
  //   locked: true,
  // });

  if (isLoading) {
    return (
      <div className="max-w-6xl min-h-screen mx-auto px-7 py-11 container">
        <div className="text-center">Loading achievements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl min-h-screen mx-auto px-7 py-11 container">
        <div className="text-center text-red-500">
          Error loading achievements
        </div>
      </div>
    );
  }

  return (
    // <div className="min-h-screen bg-[#FCFCFC] px-6 pt-4 pb-10">
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
