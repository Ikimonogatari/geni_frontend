import React from "react";
import Image from "next/image";

function page() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-3xl container flex flex-col items-center gap-5">
        <div className="flex flex-row items-center gap-2">
          <Image
            src={"geni-logo.svg"}
            width={160}
            height={48}
            alt=""
            className="max-w-24 sm:max-w-[160px] aspect-[160/48]"
          />
          <span className="bg-primary py-1 sm:py-3 px-3 sm:px-5 text-lg sm:text-3xl uppercase font-bold text-white rounded-full">
            PLATFORM
          </span>
        </div>
        <img src={"/v0.2-image.png"} />
        <div className="flex flex-col sm:flex-row items-center gap-5 md:gap-10">
          <span className="text-4xl md:text-6xl text-geni-blue font-bold">
            Oops!
          </span>
          <span className="text-lg sm:text-2xl text-center sm:text-start max-w-sm">
            Шинэ хувилбар нэвтрүүлж байгаа тул та түр хүлээгээрэй.
          </span>
        </div>
      </div>
    </div>
  );
}

export default page;
