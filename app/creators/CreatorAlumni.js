import React from "react";
import Image from "next/image";

function CreatorAlumni() {
  return (
    <div className="mt-12 sm:mt-20">
      <div className="flex flex-col lg:flex-row p-8 gap-10 items-center rounded-3xl border-[#2D262D] border-[1px] bg-[#CA7FFE] text-white">
        <div className="flex flex-col gap-4 lg:gap-10">
          <span className="text-2xl sm:text-3xl font-bold">
            Жаахан хүүхдээ харангаа гэрээсээ онлайнаар, дуртай бүтээгдэхүүнээ
            үнэгүй авч, контентоор хуваалцаад тухайн брэндээ дэмжиж, түгээж
            байгаагаа мэдэх урамтай байдаг.
          </span>
          <span className="text-2xl hidden sm:block">
            Creator program student: Urtnasan Batsukh
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
        <span className="text-base block sm:hidden">
          Creator program student: Urtnasan Batsukh
        </span>
      </div>
    </div>
  );
}

export default CreatorAlumni;
