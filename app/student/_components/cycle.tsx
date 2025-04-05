import React from "react";
import Image from "next/image";

function Cycle() {
  return (
    <>
      <Image
        loading="lazy"
        src="/landing/student/cycle.png"
        width={0}
        height={0}
        alt="cycle-image"
        sizes="100vw"
        className="hidden lg:block w-full h-auto mx-auto"
      />
      <Image
        loading="lazy"
        src="/landing/student/mobile-cycle.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="cycle-image-mobile"
        className="block lg:hidden mx-auto w-full h-auto"
      />
    </>
  );
}

export default Cycle;
