"use client";

import { useGetCreatorBadgeByIdQuery } from "@/app/services/service";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import AchievementCard from "@/components/AchievementCard";
import { BadgeDetail } from "@/app/profile/_components/creator/badge.services";

const AchievmentDetailPage = () => {
  const router = useRouter();
  const { badgeId } = useParams();

  const { data: badgeDetail, isLoading: badgeDetailLoading } =
    useGetCreatorBadgeByIdQuery(badgeId as string);

  console.log("badge detail", badgeDetail);

  if (badgeDetailLoading) {
    return (
      <div className="max-w-6xl min-h-screen mx-auto px-7 py-11 container flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!badgeDetail) {
    return (
      <div className="max-w-6xl min-h-screen mx-auto px-7 py-11 container flex items-center justify-center">
        <div>Badge not found</div>
      </div>
    );
  }

  const detail = badgeDetail as BadgeDetail;

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
      <div className="flex flex-col md:flex-row gap-8">
        {/* Enlarged AchievementCard */}
        <div className="basis-2/5 flex justify-center items-start">
          {/* <div className="scale-150 w-full max-w-xs"> */}
          <AchievementCard achievement={detail} isEarned={true} big />
          {/* </div> */}
        </div>
        {/* Badge Rules List */}
        <div className="basis-3/5 bg-white rounded-xl border-[#E6E6E6] border-2 p-6">
          <div className="text-2xl font-bold mb-4">Тайлбар</div>
          <div className="mb-4 text-base text-[#6F6F6F]">
            {detail.BadgeDescription}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2 font-semibold">Түвшин</th>
                  <th className="py-2 px-2 font-semibold">Нөхцөл</th>
                  <th className="py-2 px-2 font-semibold">Шагнал</th>
                </tr>
              </thead>
              <tbody>
                {detail.BadgeRules.map((rule, idx) => (
                  <tr key={rule.LvlId} className="border-b last:border-b-0">
                    <td className="py-2 px-2">
                      <span className="inline-flex items-center gap-2">
                        <Image
                          src="/star.png"
                          width={24}
                          height={24}
                          alt={`level-${idx + 1}`}
                        />
                        <span className="font-bold text-lg">{idx + 1}</span>
                      </span>
                    </td>
                    <td className="py-2 px-2">{rule.LvlName}</td>
                    <td className="py-2 px-2">
                      {rule.RewardValue} {rule.RewardType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievmentDetailPage;
