import React from "react";
import Image from "next/image";

function HomeCycle() {
  return (
    <div className="container mx-auto px-7 w-full pt-12 pb-12 sm:pb-20">
      <Image
        src={"/cycle-image.png"}
        width={1348}
        height={625}
        alt="cycle-image"
        className="hidden lg:block mx-auto"
      />
      <Image
        src={"/cycle-image-mobile.png"}
        width={335}
        height={725}
        alt="cycle-image-mobile"
        className="block lg:hidden mx-auto"
      />
    </div>
  );
}

export default HomeCycle;
