import React from "react";
import Image from "next/image";
import BecomeGeniButton from "../components/common/BecomeGeniButton";

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

          <BecomeGeniButton
            width={"hidden lg:flex w-full lg:max-w-[371px] h-[84px]"}
            link={
              "https://docs.google.com/forms/d/e/1FAIpQLSdrBB6Hjs2cnrLWe4Z48HHCr56RcRFXvK8klYB5VifU-YckYw/viewform"
            }
            bg={"bg-[#CA7FFE]"}
            shadowbg={"#9c44da"}
            text={"Geni Creator болох"}
          />
        </div>
        <Image
          loading="lazy"
          src={"/become-creator-image.png"}
          width={455}
          height={385}
          alt="become-creator"
        />
        <BecomeGeniButton
          width={"mt-4 flex lg:hidden w-full lg:max-w-[371px] h-[84px]"}
          link={
            "https://docs.google.com/forms/d/e/1FAIpQLSdrBB6Hjs2cnrLWe4Z48HHCr56RcRFXvK8klYB5VifU-YckYw/viewform"
          }
          bg={"bg-[#CA7FFE]"}
          shadowbg={"#9c44da"}
          text={"Geni Creator болох"}
        />
      </div>
    </div>
  );
}

export default BecomeCreatorSection;
