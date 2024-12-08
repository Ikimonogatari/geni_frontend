import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Image from "next/image";

function InfoHover({ contentText }) {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <Image
          src={"/info-icon.png"}
          width={24}
          height={24}
          className="w-6 h-6 rounded-full"
        />
      </HoverCardTrigger>
      <HoverCardContent className="bg-[#F49D19] rounded-2xl p-3 text-white text-sm font-normal">
        {contentText}
      </HoverCardContent>
    </HoverCard>
  );
}

export default InfoHover;
