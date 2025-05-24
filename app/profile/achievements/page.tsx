"use client";

import AchievementCard from "@/components/AchievementCard";
import { useRouter } from "next/navigation";

const earnedAchievements = [
  {
    icon: "/verified-icon.png",
    title: "Certified creator",
    subtitle: "Гүйцэтгэсэн!",
    progress: 100,
    level: null,
    date: null,
  },
  {
    icon: "/content-status-icon1.png",
    title: "Monthly streak",
    subtitle: "Түвшин 1",
    progress: 60,
    level: 1,
    date: null,
    badge: {
      icon: "/star.png",
      text: "1",
      color: "bg-[#4FB755]",
    },
  },
  {
    icon: "/content-status-icon3.png",
    title: "Monthly winner",
    subtitle: "2025/5 сар",
    progress: null,
    level: null,
    date: "2025/5 сар",
    badge: null,
  },
  {
    icon: "/content-status-icon2.png",
    title: "Shining star",
    subtitle: "Түвшин 2",
    progress: 80,
    level: 2,
    date: null,
    badge: {
      icon: "/star.png",
      text: "2",
      color: "bg-[#CA7FFE]",
    },
  },
];

const unearnedAchievements = Array(5).fill({
  icon: "/verified-icon.png",
  title: "Certified creator",
  subtitle: "Level 1",
  progress: 0,
  locked: true,
});

const AchievementsPage = () => {
  const router = useRouter();
  return (
    // <div className="min-h-screen bg-[#FCFCFC] px-6 pt-4 pb-10">
    <div className="max-w-6xl min-h-screen mx-auto px-7 py-11 container">
      <button
        className="mb-4 flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[#F5F4F0]"
        onClick={() => router.back()}
      >
        <span className="inline-block w-7 h-7 bg-[#F5F4F0] rounded-lg flex items-center justify-center">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path
              d="M13 16l-5-5 5-5"
              stroke="#2D262D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <h1 className="text-3xl font-bold mb-6">Таны цол</h1>
      <div className="mb-2 font-semibold text-lg">Авасан цолнууд</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {earnedAchievements.map((ach, idx) => (
          <AchievementCard key={idx} achievement={ach} />
        ))}
      </div>
      <div className="mb-2 font-semibold text-lg">Аваагүй цолнууд</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {unearnedAchievements.map((ach, idx) => (
          <AchievementCard key={idx} achievement={ach} isEarned={false} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
