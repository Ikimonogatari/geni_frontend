"use client";

import { useState } from "react";
import ContainerLayout from "@/components/ui/container-layout";
import { ElevatedButton } from "@/components/common/ElevatedButton";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Hero from "@/components/landing/hero";
import Statistics from "@/components/home/Statistics";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container my-16 lg:my-28 px-5 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4">
        <div className="flex flex-col max-w-lg gap-4 md:gap-8">
          <div className="flex items-center mb-4">
            <Image
              src="/landing/common/logo.png"
              alt="img"
              width={0}
              height={0}
              sizes="100vw"
              className="w-min h-8 md:h-14"
            />
          </div>
          <p className="text-lg lg:text-2xl leading-tight lg:leading-normal">
            Geni платформ нь контент бүтээгчид болон брэндүүд хамтрах орон зайг
            үүсгэн, бүтээлч маркетинг шийдэл олгодог технологийн бүтээгдэхүүн
            юм.
          </p>
        </div>
        <div className="flex items-center">
          <img
            src="/landing/common/about-hero.png"
            alt="Colorful blob characters"
            className="h-56 object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-7 md:p-16 rounded-[30px] bg-geni-blue text-white mt-16">
        <h3 className="text-3xl">БИДНИЙ ТУХАЙ</h3>
        <p className="text-lg md:text-2xl font-normal">
          Бид энгийн хэрэглэгээс контент бүтээгчид болж өсөх орчныг үүсгэн
          бүтээгчдийн зах зээлийг хөгжүүлэх замаар Монголд дахь бизнес
          маркетингийн зах зээлийг тогтворжуулах бүтээлч хамтрал бүхий шийдэл
          нэвтрүүлэх зорилготой.
        </p>
      </div>

      <div className="mt-10 md:mt-0">
        <Statistics />
      </div>

      <div className="flex flex-col md:flex-row gap-5 mt-16">
        <div className="flex-1 rounded-[30px] border border-border-gray/60 p-5 md:p-10">
          <Image
            src="/landing/common/mobile-feature-1.png"
            alt="img"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto object-contain md:hidden"
          />
          <Image
            src="/landing/common/feature-1.png"
            alt="img"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto object-contain hidden md:block"
          />
        </div>
        <div className="flex-1 rounded-[30px] border border-border-gray/60 p-5 md:p-10 md:pl-1">
          <Image
            src="/landing/common/mobile-feature-2.png"
            alt="img"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto object-contain md:hidden"
          />
          <Image
            src="/landing/common/feature-2.png"
            alt="img"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto object-contain hidden md:block"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-7 md:p-16 rounded-[30px] bg-geni-pink text-white mt-16">
        <h3 className="text-3xl">БИДНИЙ ТҮҮХ</h3>
        <p className="text-lg md:text-2xl font-normal">
          Бид маркетинг заавал үнэтэй, төвөгтэй байх албагүй гэж итгэдэг. Тухайн
          брэндийн үнэ цэнийг мэдэхгүй ямар нэг маркетинг студи, инфлүүнсэр,
          төлбөртэй зар суртчилгаанаас илүү брэндийн бүтээгдэхүүн үйлчилгээг аль
          хэдийн мэддэг хэрэглэгчид тэдний хамгийн сайн маркетинг сувгууд байж
          чадна.
          <br />
          <br className="md:hidden" />
          Тиймээс энгийн хэрэглэгчээс бүтээгч болж брэндтэй хамтрахын тулд
          заавал их дагагчтай болж урт хугацааг зарцуулах хэрэггүйгээр хамтран
          ажиллах хялбар системийг бид бүтээхээр зорьсон.
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full mt-16">
        <div className="flex flex-[7] w-full bg-primary-bg rounded-[30px] rounded-bl-none md:rounded-bl-[30px] md:rounded-tr-none">
          <div className="flex gap-28">
            <div className="flex-[3] w-full py-10 px-7 md:p-14 flex flex-col gap-11">
              <h2 className="text-4xl md:text-5xl font-black">
                Geni багт нэгдэх
              </h2>
              <div className="md:pr-24">
                <p className="text-lg md:text-2xl">
                  Та өөрөө өөрийнхөө БОСС нь байж чаддаг, үр дүнд тулгуурлан
                  ажилладаг, менежмент болон онлайн харилцаа сайтай бол манай
                  багт орох хүсэлтээ илгээгээд үзээрэй.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[3] flex flex-col rounded-r-[30px] md:rounded-br-[30px]">
          <div className="grow hidden md:block rounded-r-[30px] bg-primary-bg"></div>
          <div className="grow-0 flex md:block">
            <div className="flex-[2] md:hidden bg-primary-bg p-2 rounded-b-[30px]"></div>
            <div className="flex-[8] md:flex-[9] bg-primary-bg">
              <div className="bg-white h-full rounded-tl-[30px] pt-3 pl-3 md:pt-7 md:pl-7">
                <ElevatedButton
                  className="flex gap-2 items-center justify-center px-10 md:px-14 w-full bg-[#2D262D] shadow-[0.25rem_0.25rem_#000]"
                  asChild
                >
                  <Link
                    href="https://forms.gle/CbJHNqfzK8HtYGtL9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-base md:text-2xl font-bold">
                      Geni Багт нэгдэх
                    </span>
                    <ArrowRight size={24} />
                  </Link>
                </ElevatedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
