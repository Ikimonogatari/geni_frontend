import React from "react";
import Image from "next/image";
function Events() {
  return (
    <div className="flex flex-row bg-primary-bg p-14 rounded-3xl border border-primary">
      <div className="flex flex-col gap-4 w-auto uppercase font-extrabold">
        <span className="text-3xl font-normal">
          Geni Платформын beta v0.2 нээлтийн урамшуулал
        </span>
        <div className="flex flex-col">
          <p className="text-4xl">
            geni сурагчын хөтөлбөр <br />
            72 цагын хугацаанд
          </p>
          <div className="flex flex-row gap-1">
            <span className="bg-geni-green text-white px-6 py-2 rounded-[30px] rotate-3 font-extrabold text-5xl">
              50%
            </span>
            <span className="text-4xl">хөнгөлөлттэй</span>
          </div>
        </div>
      </div>
      <Image
        src="/pro100/1.png"
        priority
        height={335}
        width={461}
        alt=""
        className=""
      />
    </div>
  );
}

export default Events;
