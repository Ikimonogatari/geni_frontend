"use client";

import Image from "next/image";
import { ElevatedButton } from "../common/ElevatedButton";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type HeroProps = {
  logoImgSrc: string;
  heroImgSrc: string;
  title: string;
  description: string;
  btnText: string;
  btnTheme: "blue" | "green" | "orange" | "pink";
  path?: string;
};

export default function Hero({
  logoImgSrc,
  heroImgSrc,
  title,
  description,
  btnTheme,
  btnText,
  path,
}: HeroProps) {
  const router = useRouter();
  const handleRoute = () => {
    path && router.push(path);
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full lg:col-span-7 flex flex-col items-start gap-5 lg:gap-12">
        <Image
          src={logoImgSrc}
          alt="img"
          width={0}
          height={0}
          sizes="100vw"
          className="w-min h-8"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl lg:text-6xl font-black">{title}</h1>
          <p className="text-lg lg:text-2xl leading-tight lg:leading-normal">
            {description}
          </p>
        </div>
        <Image
          src={heroImgSrc}
          alt="img"
          width={0}
          height={0}
          sizes="100vw"
          className="lg:hidden w-full max-w-80 h-auto px-16"
        />
        <ElevatedButton
          theme={btnTheme}
          className="w-full lg:w-fit px-14"
          onClick={handleRoute}
        >
          <div className="flex gap-2 items-center justify-center">
            <span className="text-lg md:text-2xl font-bold">{btnText}</span>
            <ArrowRight size={24} />
          </div>
        </ElevatedButton>
      </div>
      <div className="hidden lg:flex col-span-5 items-center justify-end pt-20">
        <Image
          src={heroImgSrc}
          alt="img"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full max-w-80 h-auto"
        />
      </div>
    </div>
  );
}
