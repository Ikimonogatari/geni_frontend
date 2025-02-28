"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

import clsx from "clsx";

const ElevatedButton = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        "relative flex items-center justify-start border border-primary px-14 py-6 rounded-[30px] bg-geni-pink text-white cursor-pointer shadow-[2px_3px_0px_#9C44DA,2px_3px_0px_1px_#2D262D] transition duration-150 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const features = [
  {
    src: "feature-1.png",
    title: "Geni Платформоор дамжуулан 100% онлайнаар гэрээсээ ажилладаг",
  },
  {
    src: "feature-2.png",
    title: "Хүссэн үедээ Брэндүүдтэй контент бүтээж хамтардаг",
  },
  {
    src: "feature-3.png",
    title: "Үнэгүй бүтээгдэхүүн хүргүүлэн авдаг",
  },
  {
    src: "feature-4.png",
    title: "Хамтрал бүрээсээ мөнгөн урамшуулал авдаг",
  },
];

const steps = [
  {
    src: "step-1.png",
    title: "Geni Сурагч болж контент бүтээгчийн чадварт суралцаад",
  },
  {
    src: "step-2.png",
    title: "Даалгавар илгээн тэнцэж албан ёсны контент бүтээгч болоод",
  },
  {
    src: "step-3.png",
    title: "Брэндүүдтэй хамтран ажиллаж 1000 XP оноо цуглуулаад",
  },
  { src: "step-4.png", title: "Энхий 100 ПРО контент бүтээгчийн нэг болоорой" },
];

const Step = ({
  isLast,
  src,
  title,
}: {
  isLast: boolean;
  src: string;
  title: string;
}) => {
  return (
    <div className="flex md:flex-col gap-6 md:gap-0 items-center text-center relative">
      <div className="size-6 rounded-full bg-geni-pink mt-[7px] mb-3 md:hidden">
        <div
          className={clsx(
            "bg-geni-pink absolute w-0.5 top-1/2 left-2.5 right-0",
            isLast ? "h-[0px]" : "h-[calc(100%+5.5rem)]"
          )}
        />
      </div>
      <div className="flex-1 flex flex-col items-center relative">
        <div className="flex-1 flex justify-center mb-4 md:mb-0">
          <Image
            src={`/pro100/${src}`}
            alt="Feature"
            height={0}
            width={0}
            sizes="100vw"
            className="h-full w-full min-w-32 min-h-36 max-w-52 max-h-36 object-contain lg:object-cover"
          />
        </div>
        <div className="size-6 rounded-full bg-geni-pink mt-[7px] mb-3 hidden md:block relative">
          <div
            className={clsx(
              "bg-geni-pink absolute h-0.5 top-1/2 left-0 right-0",
              isLast ? "w-0" : "md:w-48 lg:w-[260px]"
            )}
          />
        </div>
        <p className="flex-1 text-lg md:text-sm md:w-3/4">{title}</p>
      </div>
    </div>
  );
};

const Feature = ({ src, title }: { src: string; title: string }) => {
  return (
    <div className="flex flex-col text-center items-center">
      <div className="flex-1 flex justify-center mb-4">
        <Image
          src={`/pro100/${src}`}
          alt="Feature"
          height={0}
          width={0}
          sizes="100vw"
          className="h-full w-full min-w-32 min-h-36 max-w-52 max-h-36 object-contain lg:object-cover"
        />
      </div>
      <p className="flex-1 text-lg md:text-sm w-4/5 md:w-full">{title}</p>
    </div>
  );
};

const Pro100: React.FC = () => {
  const [days, setDays] = useState(13);
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(48);

  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes > 0) {
        setMinutes(minutes - 1);
      } else {
        setMinutes(59);
        if (hours > 0) {
          setHours(hours - 1);
        } else {
          setHours(23);
          if (days > 0) {
            setDays(days - 1);
          } else {
            clearInterval(timer);
          }
        }
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [days, hours, minutes]);

  return (
    <div className="max-w-6xl mx-auto pt-14 px-4">
      <div className="flex flex-col items-center">
        {/* Left Side - Logo */}
        <div className="flex flex-col md:flex-row items-center justify-between md:px-10 py-4">
          {/* Logo Section */}
          <div className="relative md:flex-1 h-[266px] w-screen md:h-full md:w-full">
            {/* w-[366px] h-[266px] */}
            <Image
              src="/pro100/1.png"
              alt="pro-100"
              height={0}
              width={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              className="px-6 md:px-11 object-contain max-h-full"
            />
          </div>

          {/* Separator Line */}
          <Separator
            orientation="vertical"
            className="hidden md:block h-40 bg-gray-200 mx-8"
          />
          {/* Countdown Section */}
          <div className="flex-1 hidden md:flex">
            <div className="flex flex-col items-center md:ml-8">
              <h2 className="text-xl font-bold mb-6">Pre-order дууссахад</h2>
              <div className="flex justify-between gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                    <span className="text-5xl font-bold text-geni-blue">
                      {days.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-gray-500">Өдөр</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                    <span className="text-5xl font-bold text-geni-blue">
                      {hours.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-gray-500">Цаг</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                    <span className="text-5xl font-bold text-geni-blue">
                      {minutes.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-gray-500">Минут</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-order Info */}
        <div className="flex-1 max-w-2xl text-center flex flex-col items-center px-2 md:px-0">
          <div className="w-full mb-4">
            <div className="flex justify-center mb-2">
              <span className="text-base font-bold md:text-2xl md:font-medium">
                102/1000
              </span>
            </div>
            <Progress value={10.2} className="h-6 border border-primary" />
          </div>

          <p className="text-lg mb-4">
            Geni Platform дээр PRO 100 контент бүтээгчийн нэг болох Geni
            сурагчын хөтөлбөр эхлэх өмнө Pre-order хийсэн 1000 хүнд 80%
            хөнгөлөлтэй.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 mb-6">
            <span className="text-3xl font-medium line-through">₮480'000</span>
            <span className="text-3xl font-medium text-geni-green">
              ₮96'000
            </span>
          </div>

          {/* Mobile countdown section */}
          <div className="flex-1 flex md:hidden">
            <div className="flex flex-col items-center md:ml-8">
              <h2 className="text-xl font-bold mb-6">Pre-order дууссахад</h2>
              <div className="flex justify-between gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                    <span className="text-5xl font-bold text-geni-blue">
                      {days.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-gray-500">Өдөр</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                    <span className="text-5xl font-bold text-geni-blue">
                      {hours.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-gray-500">Цаг</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                    <span className="text-5xl font-bold text-geni-blue">
                      {minutes.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-gray-500">Минут</span>
                </div>
              </div>
            </div>
          </div>
          <ElevatedButton className="mt-6 md:mt-0">
            <p className="text-xl font-bold">Pre-order хийх ✨</p>
          </ElevatedButton>
        </div>
      </div>

      {/* Features Section */}
      <section className="mt-16 mb-6 border border-primary rounded-xl p-6 px-5 mx-3 sm:mx-10 md:mx-16 pb-8 bg-primary-bg">
        <h2 className="text-xl font-semibold mb-8 w-2/3">
          Geni ПРО Бүтээгч гэж хэн бэ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16 border border-primary rounded-xl p-6 px-5 mx-3 sm:mx-10 md:mx-16 pb-8 bg-primary-bg">
        <h2 className="text-xl font-semibold mb-8 w-2/3">
          Хэрхэн Geni ПРО Бүтээгч болох вэ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 md:gap-6 px-5 md:px-0 relative z-10">
          {steps.map((step, index) => (
            <Step
              key={step.title}
              {...step}
              isLast={steps.length - 1 === index}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pro100;
