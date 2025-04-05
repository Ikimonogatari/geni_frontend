import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CreatorTierProps {
  isSwiper?: boolean;
  tier: string;
  className?: string;
}

export default function CreatorTier({
  isSwiper,
  tier,
  className,
}: CreatorTierProps) {
  const proTierSwiperClassName = "aspect-[58/22] w-[44px]";
  const proTierClassName = "w-[29px] h-[11px] sm:w-[58px] sm:h-[22px]";
  const certifiedSwiperClassName = "w-[20px] h-[20px]";
  const certifiedClassName = "w-[16px] h-[16px] sm:w-[24px] sm:h-[24px]";

  const getImageSrc = (tier) => {
    switch (tier) {
      case "Pro creator gold":
        return "/gold-tier.png";
      case "Pro creator silver":
        return "/silver-tier.png";
      case "Pro creator bronze":
        return "/bronze-tier.png";
      case "Certified creator":
        return "/verified-icon.png";
      default:
        return ""; // Default case for no image
    }
  };

  const getClasses = (tier, isSwiper) => {
    switch (tier) {
      case "Pro creator gold":
        return isSwiper ? proTierSwiperClassName : proTierClassName;
      case "Pro creator silver":
        return isSwiper ? proTierSwiperClassName : proTierClassName;
      case "Pro creator bronze":
        return isSwiper ? proTierSwiperClassName : proTierClassName;
      case "Certified creator":
        return isSwiper ? certifiedSwiperClassName : certifiedClassName;
      default:
        return ""; // No class for "Creator" or other cases
    }
  };

  const src = getImageSrc(tier);
  const classes = getClasses(tier, isSwiper);

  return (
    <div>
      {src ? (
        <Image
          src={src}
          alt=""
          width={58}
          height={22}
          className={cn(classes, className)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
