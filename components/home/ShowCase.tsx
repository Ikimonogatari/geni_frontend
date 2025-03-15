"use client";
import React from "react";
import ContainerLayout from "../ui/container-layout";
import SingleConcavedCard from "../common/SingleConcavedCard";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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
        <motion.div
          className="flex items-stretch gap-5"
          animate={{ x: ["0%", "-100%"], opacity: 1 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15, // Smooth out the scroll speed
          }}
        >
          {[...Array(3)].map((_, index) => (
            <Image
              key={index}
              className="border-[1px] border-black/15 aspect-[9/16] w-[250px] min-h-[444px] h-full rounded-2xl object-cover"
              alt=""
              width={64}
              height={150}
              src={"/landing/showcase1.png"}
            />
          ))}
          {[...Array(3)].map((_, index) => (
            <Image
              key={index}
              className="border-[1px] border-black/15 aspect-[9/16] w-[250px] min-h-[444px] h-full rounded-2xl object-cover"
              alt=""
              width={64}
              height={150}
              src={"/landing/showcase1.png"}
            />
          ))}
        </motion.div>
      </div>
    </ContainerLayout>
  );
}

export default ShowCase;
