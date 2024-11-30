import React from "react";
import Image from "next/image";

function BecomeCreatorBanner() {
  return (
    <div className="rounded-2xl px-6 py-8 sm:p-14 border-[1px] border-[#2D262D] bg-[#F5F4F0] mt-12 sm:mt-20 flex flex-col lg:flex-row items-end gap-6 lg:gap-0 justify-between">
      <div className="flex flex-col gap-4">
        <Image
          loading="lazy"
          src={"/genicreatorprogram-logo.svg"}
          width={160}
          height={29}
          alt="geni-creator-logo"
        />
        <span className="text-lg sm:text-2xl font-bold text-[#6F6F6F]">
          Онлайн хөтөлбөрт хамрагдан суралцангаа бодит туршлага хуримтлуулан
          хэрэглэгчээс бүтээгч болоорой.
        </span>
      </div>
      <div className="w-full relative lg:max-w-[371px] h-[84px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9c44da]">
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdrBB6Hjs2cnrLWe4Z48HHCr56RcRFXvK8klYB5VifU-YckYw/viewform"
          className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full lg:max-w-[371px] h-[84px] rounded-xl border-[1px] border-[#2D262D] bg-[#CA7FFE] flex flex-row gap-2 items-center justify-center"
        >
          <span>Geni Creator болох</span>
          <Image
            loading="lazy"
            src={"/arrow-right-icon.png"}
            alt="arrow"
            width={16}
            height={16}
          />
        </a>
      </div>
    </div>
  );
}

export default BecomeCreatorBanner;
