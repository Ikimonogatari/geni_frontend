import React from "react";
import ContainerLayout from "../ui/container-layout";
import { StatsCard } from "./stats-card";
import Image from "next/image";
function Statistics() {
  return (
    <ContainerLayout className="mt-20 grid grid-cols-7 gap-5">
      <StatsCard
        count={120}
        subtitle="Geni Student"
        wrapperClassName="col-span-2"
        className="text-geni-green"
        imgSrc="/landing/student-stats.png"
      />
      <StatsCard
        count={80}
        subtitle="Geni Creator"
        wrapperClassName="col-span-2"
        className="text-geni-pink col-span-2"
        imgSrc="/landing/creator-stats.png"
      />
      <StatsCard
        count={60}
        subtitle="Geni Brand"
        wrapperClassName="col-span-2"
        className="text-geni-blue col-span-2"
        imgSrc="/landing/brand-stats.png"
      />
      <div className="relative col-span-1 row-span-2 flex flex-col items-start justify-center bg-primary-bg rounded-[30px]">
        <Image
          src={"/landing/stats-rocket.png"}
          alt=""
          className="absolute"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "100%" }}
        />
      </div>
      <StatsCard
        count={700}
        subtitle="Geni Brand"
        wrapperClassName="col-span-2"
        className="col-span-2"
        imgSrc="/landing/black-stats.png"
        addImgSrc="/landing/play-bw-icon.png"
      />
      <StatsCard
        count={65000000}
        subtitle="Geni Brand"
        wrapperClassName="col-span-4"
        className="col-span-2"
        imgSrc="/landing/black-stats.png"
        addImgSrc="/landing/present-bw-icon.png"
      />
    </ContainerLayout>
  );
}

export default Statistics;
