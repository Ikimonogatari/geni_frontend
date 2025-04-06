import React from "react";
import Image from "next/image";
import ContainerLayout from "../ui/container-layout";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

type TestimonialsProps = {
  testimonials: {
    text: string;
    name: string;
    position: string;
    image: string;
    type?: string;
  }[];
};

function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <ContainerLayout className="w-full overflow-hidden relative my-28 md:my-0">
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
          {testimonials.map((testimonial, index) => {
            const { type = "creator" } = testimonial;
            const typeImgSrc = `/landing/common/testimonials/${type}.png`;
            return (
              <CarouselItem
                key={index}
                className="p-0 pl-4 md:p-4 sm:basis-1/2"
              >
                <div className="flex flex-col gap-4 border border-border-gray/60 p-10 pt-9 rounded-[30px] hover:bg-primary-bg select-none">
                  <div className="w-full flex items-start gap-2">
                    <p className="text-lg">{testimonial.text}</p>
                    <Image
                      src={typeImgSrc}
                      alt="type"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-row items-center gap-6">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={74}
                      height={74}
                      className="rounded-full"
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
            );
          })}
        </CarouselContent>
      </Carousel>
    </ContainerLayout>
  );
}

export default Testimonials;
