import React from "react";
import Image from "next/image";

function BecomeCreatorSection() {
  return (
    <div className="bg-[#F5F4F0] border-y-[1px] border-[#2D262D] mt-12 sm:mt-20 py-12">
      <div className="container max-w-7xl px-7 mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col gap-9">
          <Image
            loading="lazy"
            src={"/genicreatorprogram-logo.svg"}
            width={160}
            height={29}
            alt="geni-creator-logo"
          />
          <span className="text-[#2D262D]">
            Онлайн хөтөлбөрт хамрагдан суралцангаа бодит туршлага хуримтлуулан
            хэрэглэгчээс бүтээгч болоорой.
          </span>
          <div className="hidden lg:block relative w-full lg:max-w-[371px] h-[84px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9c44da]">
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
        <Image
          loading="lazy"
          src={"/become-creator-image.png"}
          width={455}
          height={385}
          alt="become-creator"
        />
        <div className="block lg:hidden relative mt-9 w-full lg:max-w-[371px] h-[84px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9c44da]">
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
    </div>
  );
}

export default BecomeCreatorSection;
