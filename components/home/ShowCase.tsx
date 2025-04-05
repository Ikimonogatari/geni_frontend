"use client";

import ContainerLayout from "../ui/container-layout";
import SingleConcavedCard from "../common/SingleConcavedCard";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useRouter } from "next/navigation";

function ShowCase() {
  const router = useRouter();

  const routeToJoin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push("/join");
  };

  return (
    <ContainerLayout className="flex flex-grow items-stretch gap-5">
      <div className="flex flex-col md:hidden gap-36">
        <div className="mx-6">
          <ElevatedButton
            className="w-full mt-8"
            theme="pink"
            onClick={routeToJoin}
          >
            <div className="flex gap-2 items-center justify-center whitespace-nowrap">
              <span className="whitespace-nowrap text-lg md:text-xl font-bold">
                Платформд нэгдэх
              </span>
              <ArrowRight size={20} />
            </div>
          </ElevatedButton>
        </div>
        <div className="flex flex-col md:hidden">
          <div className="flex flex-col gap-6 w-full p-7 rounded-[30px] bg-primary-bg">
            <span className="text-2xl font-extrabold uppercase">
              Хэрэглэгчдийн бодит туршлага дээр суурилсан бүтээлч контент
            </span>
            <p className="text-lg leading-tight">
              Брэндийн бүтээгдэхүүнээ илгээгээд маркетингаа хэрэглэгчийн
              сэтгэгдэл бүхий бүтээлч контентоор цэнэглэж хэрэглэгчидтэйгээ
              итгэлтэй харилцаа үүсгээрэй.
            </p>
          </div>
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            // autoplay={true}
            autoplayInterval={3000}
            className="-mx-5 mt-4"
          >
            <CarouselContent>
              {[...Array(6)].map((_, index) => (
                <CarouselItem key={index} className="py-4 pr-0 pl-10 basis-4/5">
                  <Image
                    className="border-[1px] border-border-gray/60 w-full h-auto object-cover rounded-[30px]"
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={"/landing/common/videos/image.png"}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="hidden md:block">
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
          <ElevatedButton
            className="w-full"
            theme={"pink"}
            onClick={routeToJoin}
          >
            <div className="flex gap-2 items-center justify-center whitespace-nowrap">
              <span className="whitespace-nowrap text-lg md:text-xl">
                Платформд нэгдэх
              </span>
              <ArrowRight size={20} />
            </div>
          </ElevatedButton>
        </SingleConcavedCard>
      </div>

      {/* Auto-Scrolling Section */}
      <div className="relative w-full overflow-hidden hidden md:block">
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
