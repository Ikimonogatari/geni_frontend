import React from "react";
import Image from "next/image";
function BrandCycle() {
  return (
    <div className="container px-7 mx-auto mt-7">
      <Image
        src={"/brand-cycle.png"}
        width={1348}
        height={442}
        alt="cycle-image"
        className="hidden lg:block mx-auto"
      />
      <Image
        src={"/brand-cycle-mobile.png"}
        width={335}
        height={1505}
        alt="cycle-image-mobile"
        className="block lg:hidden mx-auto"
      />
    </div>
  );
}

export default BrandCycle;
