import React from "react";
import Image from "next/image";
import { useGetCreatorBadgesQuery } from "@/app/services/service";

function CreatorBadges() {
  const { data: badges } = useGetCreatorBadgesQuery();
  console.log('badges', badges);

  return (
    <div className="flex flex-row items-center gap-2 overflow-x-auto border border-primary rounded-2xl p-2 sm:p-4 h-full">
      <Image
        src={"/verified-icon.png"}
        width={47}
        height={47}
        alt=""
        className="w-7 h-7 sm:w-10 sm:h-10"
      />
    </div>
  );
}

export default CreatorBadges;
