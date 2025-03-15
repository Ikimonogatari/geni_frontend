"use client";
import React from "react";
import ContainerLayout from "../ui/container-layout";
import SingleConcavedCard from "../common/SingleConcavedCard";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

function ShowCase() {
  return (
    <ContainerLayout className="flex flex-grow items-stretch gap-5">
      <SingleConcavedCard
        layoutHorizontally="left"
        layoutVertically="top"
        contextClassName="flex items-end h-full"
        context={
          <div className="flex flex-col gap-6 w-full">
            <span className="text-xl font-extrabold uppercase">
              Хэрэглэгчдийн бодит туршлага дээр суурилсан бүтээлч контент
            </span>
            <span>
              Брэндийн бүтээгдэхүүнээ илгээгээд маркетингаа хэрэглэгчийн
              сэтгэгдэл бүхий бүтээлч контентоор цэнэглэж хэрэглэгчидтэйгээ
              итгэлтэй харилцаа үүсгээрэй.
            </span>
          </div>
        }
      >
        <ElevatedButton className="rounded-[30px] w-full" theme={"pink"}>
          <div className="flex gap-2 items-center justify-center whitespace-nowrap">
            <span className="whitespace-nowrap">Платформд нэгдэх</span>
            <ArrowRight size={20} />
          </div>
        </ElevatedButton>
      </SingleConcavedCard>

      {/* Auto-Scrolling Section */}
      <div className="relative w-full overflow-hidden">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          autoplay={true}
          autoplayInterval={3000}
          className="w-full"
        >
          <CarouselContent>
            {[...Array(6)].map((_, index) => (
              <CarouselItem
                key={index}
                className="p-4 basis-1/3 min-w-[250px] h-[444px]"
              >
                <Image
                  className="border-[1px] border-black/15 aspect-[9/16] h-full rounded-2xl object-cover"
                  alt=""
                  width={250}
                  height={444}
                  src={"/landing/showcase1.png"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </ContainerLayout>
  );
}

export default ShowCase;
