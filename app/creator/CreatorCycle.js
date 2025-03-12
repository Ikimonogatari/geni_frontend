import React from "react";
import Image from "next/image";

function CreatorCycle() {
  return (
    <>
      <Image
        loading="lazy"
        src={"/creator-cycle.png"}
        width={1348}
        height={442}
        alt="cycle-image"
        className="hidden lg:block mx-auto"
      />
      <Image
        loading="lazy"
        src={"/creator-cycle-mobile.png"}
        width={335}
        height={1505}
        alt="cycle-image-mobile"
        className="block lg:hidden mx-auto"
      />
    </>
  );
}

export default CreatorCycle;
