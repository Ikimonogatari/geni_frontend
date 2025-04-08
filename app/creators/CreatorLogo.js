import React from "react";
import Image from "next/image";

function CreatorLogo() {
  return (
    <Image
      loading="lazy"
      src={"/genicreator-logo.svg"}
      width={160}
      height={29}
      alt="geni-creator-logo"
      className="w-[160px] h-[29px] sm:w-[256px] sm:h-[47px]"
    />
  );
}

export default CreatorLogo;
