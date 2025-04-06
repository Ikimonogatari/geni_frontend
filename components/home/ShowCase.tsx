"use client";

import ContainerLayout from "../ui/container-layout";
import SingleConcavedCard from "../common/SingleConcavedCard";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";

const showcaseVideos = [
  "https://s3.ap-southeast-1.amazonaws.com/public.storage.geni.mn/public/1.mp4",
  "https://s3.ap-southeast-1.amazonaws.com/public.storage.geni.mn/public/2.mp4",
  "https://s3.ap-southeast-1.amazonaws.com/public.storage.geni.mn/public/3.mp4",
  "https://s3.ap-southeast-1.amazonaws.com/public.storage.geni.mn/public/4.mp4",
];

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
            autoplayInterval={3000}
            className="-mx-5 mt-4"
          >
            <CarouselContent>
              {showcaseVideos.map((videoSrc) => (
                <CarouselItem
                  key={videoSrc}
                  className="py-4 pr-0 pl-10 basis-4/5"
                >
                  <video
                    className="border-[1px] border-border-gray/60 w-auto h-full object-cover rounded-[30px]"
                    autoPlay
                    loop
                    muted
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>
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
          contextClassName="flex items-center h-full pl-10 pt-20"
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
          <ElevatedButton className="w-full" theme="pink" onClick={routeToJoin}>
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
          className="w-full h-full"
          plugins={[Autoplay({ stopOnMouseEnter: true, delay: 3000 })]}
        >
          <CarouselContent className="h-full">
            {showcaseVideos.map((videoSrc) => (
              <CarouselItem
                key={videoSrc}
                className="py-1 basis-[40%] min-w-[250px] max-h-[500px]"
              >
                <video
                  className="border-[1px] border-black/15 aspect-[9/16] h-full rounded-2xl object-cover w-full"
                  autoPlay
                  loop
                  muted
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </ContainerLayout>
  );
}

export default ShowCase;
