import React from "react";
import Image from "next/image";
import ContainerLayout from "../ui/container-layout";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const testimonialData = [
  {
    text: "“Ad creative-ийн хувьд худалдан авалтад хамгийн их нөлөөлдөг хэлбэр нь UGC гэж боддог...”",
    name: "Erkhbayar M",
    position: "Founder of Titem brand",
    image: "/dummy-brand.png",
  },
  {
    text: "“Creative content has the biggest impact on purchases...”",
    name: "Gankhuyag T",
    position: "Marketing Director at XYZ Corp",
    image: "/dummy-brand2.png",
  },
  {
    text: "“Creative content has the biggest impact on purchases...”",
    name: "Gankhuyag T",
    position: "Marketing Director at XYZ Corp",
    image: "/dummy-brand2.png",
  },
  {
    text: "“Creative content has the biggest impact on purchases...”",
    name: "Gankhuyag T",
    position: "Marketing Director at XYZ Corp",
    image: "/dummy-brand2.png",
  },
];

function Testimonials() {
  return (
    <ContainerLayout className="w-full overflow-hidden relative">
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        autoplay={true}
        autoplayInterval={3000}
        className="w-full"
      >
        <CarouselContent>
          {testimonialData.map((testimonial, index) => (
            <CarouselItem key={index} className="p-4 sm:basis-1/2">
              <div className="flex flex-col gap-4 border border-border-bg/60 p-10 pt-9 rounded-[30px] hover:bg-primary-bg">
                <span className="text-lg">{testimonial.text}</span>
                <div className="flex flex-row items-center gap-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={74}
                    height={74}
                    className="rounded-full border border-primary"
                  />
                  <div className="flex flex-col text-[#6F6F6F]">
                    <span className="text-xl font-bold">
                      {testimonial.name}
                    </span>
                    <span className="text-xl">{testimonial.position}</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ContainerLayout>
  );
}

export default Testimonials;
