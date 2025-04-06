import React from "react";
import ContainerLayout from "../ui/container-layout";
import { StatsCard } from "./stats-card";
import Image from "next/image";
function Statistics() {
  return (
    <ContainerLayout className="mt-4 md:mt-20 grid grid-cols-7 gap-5">
      <StatsCard
        count={520}
        subtitle="Geni Student"
        wrapperClassName="col-span-full md:col-span-2"
        className="text-geni-green"
        imgSrc="/landing/student-stats.png"
      />
      <StatsCard
        count={90}
        subtitle="Geni Creator"
        wrapperClassName="col-span-full md:col-span-2"
        className="text-geni-pink col-span-2"
        imgSrc="/landing/creator-stats.png"
      />
      <StatsCard
        count={70}
        subtitle="Geni Brand"
        wrapperClassName="col-span-full md:col-span-2"
        className="text-geni-blue col-span-2"
        imgSrc="/landing/brand-stats.png"
      />
      <div
        className="hidden md:flex relative col-span-1 row-span-2 flex-col items-start justify-center bg-primary-bg rounded-[30px]
      border border-border-gray/60"
      >
        <Image
          src={"/landing/common/stats/rocket.png"}
          alt=""
          className="absolute w-auto h-full object-contain"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <StatsCard
        count={900}
        subtitle="Контент бүтээгдсэн"
        wrapperClassName="col-span-full md:col-span-2"
        className="col-span-2"
        imgSrc="/landing/black-stats.png"
        addImgSrc="/landing/play-bw-icon.png"
      />
      <StatsCard
        count={75_000_000}
        mobileCount={75}
        postfix={<span className="text-7xl md:hidden">сая</span>}
        subtitle="Үнэ бүхий бүтээгдэхүүнүүд бүтээгчдэд хүргэгдсэн"
        wrapperClassName="col-span-full md:col-span-4"
        className="col-span-2"
        imgSrc="/landing/black-stats.png"
        addImgSrc="/landing/present-bw-icon.png"
      />
    </ContainerLayout>
  );
}

export default Statistics;
