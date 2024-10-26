import React from "react";
import Image from "next/image";

function CreatorTier({ tier }) {
  const getImageSrc = (tier) => {
    switch (tier) {
      case "gold":
        return "/gold-tier.png";
      case "silver":
        return "/silver-tier.png";
      case "bronze":
        return "/bronze-tier.png";
      default:
        return "/verified-icon.png";
    }
  };

  return (
    <div>
      <Image
        src={getImageSrc(tier)}
        width={58}
        height={22}
        alt=""
        className={tier ? "w-[58px] h-[22px]" : "w-4 h-4 sm:w-6 sm:h-6"}
      />
    </div>
  );
}

export default CreatorTier;
