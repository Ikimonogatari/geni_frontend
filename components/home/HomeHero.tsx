import React from "react";
import Image from "next/image";
import ContainerLayout from "../ui/container-layout";

function HomeHero() {
  return (
    <ContainerLayout>
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div className="col-span-full md:col-span-8 flex flex-col space-y-6 mt-0 md:mt-6 max-w-2xl">
          <h1 className="text-2xl md:text-[2.5rem] font-black tracking-tight leading-tight md:leading-none pr-12 md:pr-0">
            <span className="text-geni-pink">КОНТЕНТ БҮТЭЭГЧИД </span>
            БОЛОН
            <span className="text-geni-blue"> БРЭНДҮҮДИЙН </span>
            ХАМТРАН ХАМТДАА ӨСӨХ ШИЙДЭЛ
          </h1>
          <Image
            src="/landing/image-1.png"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="block md:hidden w-full h-auto pt-2"
            // sizes="100vw"
            // style={{ width: "100%", height: "auto" }}
          />
          <p className="text-xl md:text-lg leading-5 pr-10 md:pr-0 pt-10 md:mt-0">
            Хамгийн олон туршлагатай бүтээгчидтэй хамтран брэндийн үнэ цэнээ
            өсгөж, мөн тэр контент бүтээгчдийн нэг болж кариэрээ эхлүүлэх цогц
            шийдэл.
          </p>
        </div>
        <Image
          src="/landing/image-1.png"
          alt=""
          width={421}
          height={229}
          className="hidden md:block"
          // sizes="100vw"
          // style={{ width: "100%", height: "auto" }}
        />
      </div>
    </ContainerLayout>
  );
}

export default HomeHero;
