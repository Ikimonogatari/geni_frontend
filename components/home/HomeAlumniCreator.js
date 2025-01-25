import React from "react";
import Image from "next/image";
function HomeAlumniCreator() {
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
          Олон ажил давхар эрхэлдэг ч гэсэн өөрийн завд тааруулан контент бүтээж
          дуртай брэндтэйгээ хамтрах их амар бас урамтай байдаг.
        </span>

        <span className="text-sm sm:text-xl lg:text-2xl">
          Geni Creator: Meira Davaajargal
        </span>

        <Image
          src={"/quotes.png"}
          width={62}
          height={50}
          alt="quotes"
          className="absolute bottom-5 sm:bottom-10 right-0 lg:-right-5 rotate-180 max-w-[31px] max-h-[25px] lg:max-w-[62px] lg:max-h-[50px]"
        />
      </div>

      <Image
        src={"/home-alumni-meira.png"}
        width={628}
        height={604}
        alt=""
        className="mx-auto shadow-sm"
      />
    </div>
  );
}

export default HomeAlumniCreator;
