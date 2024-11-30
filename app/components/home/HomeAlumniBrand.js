import React from "react";
import Image from "next/image";

function HomeAlumniBrand() {
  return (
    <div className="py-10 sm:py-20 lg:py-32 flex flex-col-reverse lg:flex-row gap-14 items-center h-full">
      <div className="flex flex-col gap-6 sm:gap-12 relative w-full lg:w-1/2">
        <Image
          src={"/quotes.png"}
          width={62}
          height={50}
          alt="quotes"
          className="absolute -top-10 sm:-top-20 left-0 lg:-left-5 max-w-[31px] max-h-[25px] lg:max-w-[62px] lg:max-h-[50px]"
        />
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Сэтгэл шингээж хийсэн бүтээгдэхүүнийг маань бодит хэрэглэгчид бидний
          өмнөөс танилцуулж, хайрлаж байгаа бодит контентууд харах үнэхээр
          урамтай байдаг.
        </span>
        <div className="flex flex-row items-center gap-6">
          <Image
            src={"/lhamour.png"}
            width={56}
            height={56}
            alt="lhamour"
            className="w-14 h-14 border rounded-full shadow-sm"
          />
          <span className="text-sm sm:text-xl lg:text-2xl">
            Founder & CEO: Khulan Davaadorj
          </span>
        </div>
        <Image
          src={"/quotes.png"}
          width={62}
          height={50}
          alt="quotes"
          className="absolute bottom-16 sm:bottom-10 right-0 lg:-right-5 rotate-180 max-w-[31px] max-h-[25px] lg:max-w-[62px] lg:max-h-[50px]"
        />
      </div>
      <div className="relative">
        <Image
          src={"/home-alumni-khulan.png"}
          width={618}
          height={563}
          alt=""
          className="mx-auto shadow-sm"
        />
      </div>
    </div>
  );
}

export default HomeAlumniBrand;
