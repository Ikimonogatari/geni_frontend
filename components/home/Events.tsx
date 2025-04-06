import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
function Events() {
  return (
    <div className="my-40 md:my-0">
      <div className="flex flex-row bg-primary-bg rounded-3xl border border-border-gray/60 overflow-hidden">
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
            {[...Array(1)].map((_, index) => (
              <CarouselItem
                key={index}
                className="min-w-[250px] h-[calc(100vh-160px)] md:h-[444px]"
              >
                <Image
                  src="/landing/common/banner.png"
                  priority
                  height={0}
                  width={0}
                  alt="Event img"
                  sizes="100vw"
                  // style={{ height: "auto", width: "100%" }}
                  className="h-full w-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default Events;
