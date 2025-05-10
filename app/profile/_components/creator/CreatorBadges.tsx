import React from "react";
import Image from "next/image";
function CreatorBadges() {
  return (
    <div className="flex flex-row items-center gap-2 overflow-x-auto border border-primary rounded-2xl p-4 h-full max-h-24">
      <Image
        src={"/verified-icon.png"}
        width={47}
        height={47}
        alt=""
        className="w-8 h-8 sm:w-10 sm:h-10"
      />
    </div>
  );
}

export default CreatorBadges;
