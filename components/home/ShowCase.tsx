"use client";

import ContainerLayout from "../ui/container-layout";
import SingleConcavedCard from "../common/SingleConcavedCard";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { ClipLoader } from "react-spinners";
import VideoPlayer from "@/components/common/VideoPlayer";

const showcases = [
  {
    videoSrc:
      "https://s3.ap-southeast-1.amazonaws.com/public.storage.geni.mn/public/1.mp4",
    brandImgSrc: "/landing/common/showcase/brand-1.png",
    creatorImgSrc: "/landing/common/showcase/creator-1.png",
  },
  {
    videoSrc:
      "https://s3.ap-southeast-1.amazonaws.com/public.storage.geni.mn/public/2.mp4",
    brandImgSrc: "/landing/common/showcase/brand-2.png",
    creatorImgSrc: "/landing/common/showcase/creator-2.png",
  },
  {
    videoSrc:
      "https://s3.ap-southeast-1.amazonaws.com/public.storage.geni.mn/public/3.mp4",
    brandImgSrc: "/landing/common/showcase/brand-3.png",
    creatorImgSrc: "/landing/common/showcase/creator-3.png",
  },
  {
    videoSrc:
      "https://s3.ap-southeast-1.amazonaws.com/public.storage.geni.mn/public/4.mp4",
    brandImgSrc: "/landing/common/showcase/brand-4.png",
    creatorImgSrc: "/landing/common/showcase/creator-4.png",
  },
];

// Video loading fallback component
const VideoLoadingFallback = () => {
  return (
    <div className="flex justify-center items-center bg-[#F5F4F0] rounded-[30px] h-full w-full">
      <ClipLoader
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        size={50}
        color="#CA7FFE"
      />
    </div>
  );
};

interface ShowcaseVideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoSrc: string;
  brandImgSrc: string;
  creatorImgSrc: string;
}

const ShowcaseVideo = ({
  videoSrc,
  brandImgSrc,
  creatorImgSrc,
  ...props
}: ShowcaseVideoProps) => {
  return (
    <div className="relative">
      <VideoPlayer
        src={videoSrc}
        autoplay={true}
        loop={true}
        muted={true}
        playsinline={true}
        controls={false}
        className="border-[1px] border-border-gray/60 object-cover rounded-[30px] w-full h-full"
      />
      <div className="absolute left-3 bottom-3 rounded-full bg-background flex -space-x-2 p-2">
        <Avatar className="size-[3.25rem]">
          <AvatarImage asChild src={brandImgSrc}>
            <Image
              src={brandImgSrc}
              width={0}
              height={0}
              alt="b"
              sizes="100vw"
              className="w-full h-auto"
            />
          </AvatarImage>
          <AvatarFallback />
        </Avatar>
        <Avatar className="size-[3.25rem]">
          <AvatarImage asChild src={creatorImgSrc}>
            <Image
              src={creatorImgSrc}
              width={0}
              height={0}
              alt="b"
              sizes="100vw"
              className="w-full h-auto"
            />
          </AvatarImage>
          <AvatarFallback />
        </Avatar>
      </div>
    </div>
  );
};

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
              {showcases.map((showcase) => (
                <CarouselItem
                  key={showcase.videoSrc}
                  className="py-4 pr-0 pl-10 max-w-[290px] h-full basis-4/5"
                >
                  <AspectRatio ratio={9 / 16}>
                    <Suspense fallback={<VideoLoadingFallback />}>
                      <ShowcaseVideo {...showcase} />
                    </Suspense>
                  </AspectRatio>
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
            {showcases.map((showcase) => (
              <CarouselItem
                key={showcase.videoSrc}
                className="py-1 basis-[40%] max-w-[290px] h-full"
              >
                <AspectRatio ratio={9 / 16}>
                  <Suspense fallback={<VideoLoadingFallback />}>
                    <ShowcaseVideo {...showcase} />
                  </Suspense>
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </ContainerLayout>
  );
}

export default ShowCase;
