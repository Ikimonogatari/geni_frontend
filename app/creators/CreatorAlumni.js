import React from "react";
import Image from "next/image";

function CreatorAlumni() {
  return (
    <div className="mt-12 sm:mt-20">
      <div className="flex flex-col-reverse md:flex-row p-5 sm:p-8 gap-4 sm:gap-10 items-center rounded-3xl border-[#2D262D] border-[1px] bg-[#CA7FFE] text-white">
        <div className="flex flex-col-reverse md:flex-col gap-4 md:gap-10">
          <span className="text-base sm:text-xl lg:text-2xl xl:text-3xl">
            Жаахан хүүхдээ харангаа гэрээсээ онлайнаар, дуртай бүтээгдэхүүнээ
            үнэгүй авч, контентоор хуваалцаад тухайн брэндээ дэмжиж, түгээж
            байгаагаа мэдэх урамтай байдаг.
          </span>
          <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
            Creator program student: <br className="block sm:hidden"></br>{" "}
            Urtnasan Batsukh
          </span>
        </div>
        <Image
          loading="lazy"
          src={"/creator-alumni-image.png"}
          width={302}
          height={302}
          alt="creator-alumni"
          className="max-w-[302px] max-h-[302px] w-full h-full aspect-square"
        />
      </div>
    </div>
  );
}

export default CreatorAlumni;
