import React from "react";
import ContainerLayout from "../ui/container-layout";
import ConcaveCard from "../common/ConcaveCard";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";
import SingleConcavedCard from "../common/SingleConcavedCard";
import Image from "next/image";

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
              итгэлтэй харилцаа үүсгээрэй.W
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
      <div className="flex flex-grow items-stretch w-full overflow-x-auto gap-5 [scrollbar-width:none] [-ms-overflow-style:none]">
        <Image
          className="border-[1px] border-black/15 aspect-[9/16] w-full h-full rounded-2xl object-cover min-w-[250px]"
          alt=""
          width={64}
          height={150}
          src={"/landing/showcase1.png"}
        />
        <Image
          className="border-[1px] border-black/15 aspect-[9/16] w-full h-full rounded-2xl object-cover"
          alt=""
          width={64}
          height={150}
          src={"/landing/showcase1.png"}
        />
        <Image
          className="border-[1px] border-black/15 aspect-[9/16] w-full h-full rounded-2xl object-cover"
          alt=""
          width={64}
          height={150}
          src={"/landing/showcase1.png"}
        />
      </div>
    </ContainerLayout>
  );
}

export default ShowCase;
