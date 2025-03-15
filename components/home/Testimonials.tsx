import React from "react";
import Image from "next/image";
import ContainerLayout from "../ui/container-layout";
import { EmblaOptionsType } from "embla-carousel";

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
];

const OPTIONS: EmblaOptionsType = {
  loop: true,
  //   draggable: true,
};

function Testimonials() {
  return (
    <ContainerLayout className="w-full overflow-hidden relative">
      {testimonialData.map((testimonial, index) => (
        <div
          key={index}
          className="min-w-[300px] flex flex-col gap-4 border border-primary bg-primary-bg p-10 rounded-[30px]"
        >
          <span className="text-lg">{testimonial.text}</span>
          <div className="flex flex-row items-center gap-6">
            <Image
              src={testimonial.image}
              alt=""
              width={74}
              height={74}
              className="rounded-full border border-primary"
            />
            <div className="flex flex-col text-[#6F6F6F]">
              <span className="text-xl font-bold">{testimonial.name}</span>
              <span className="text-xl">{testimonial.position}</span>
            </div>
          </div>
        </div>
      ))}
    </ContainerLayout>
  );
}

export default Testimonials;
