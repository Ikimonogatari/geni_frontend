import React from "react";
import Image from "next/image";
import ContainerLayout from "../ui/container-layout";

function HomeHero() {
  return (
    <ContainerLayout>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="col-span-8 flex flex-col space-y-6 mt-6 max-w-2xl">
          <h1 className="text-[2.5rem] font-black tracking-tight leading-none">
            КОНТЕНТ БҮТЭЭГЧИД БОЛОН БРЭНДҮҮДИЙН ХАМТРАН ХАМТДАА ӨСӨХ ШИЙДЭЛ
          </h1>
          <p className="text-lg leading-5">
            Хэрэглэгчдийн бодит туршлага дээр суурилсан бүтээлч контент
            Хэрэглэгчдийн бодит туршлага дээр суурилсан бүтээлч контент
          </p>
        </div>
        <Image
          src="/landing/image-1.png"
          alt=""
          width={421}
          height={229}
          // sizes="100vw"
          // style={{ width: "100%", height: "auto" }}
        />
      </div>
    </ContainerLayout>
  );
}

export default HomeHero;
