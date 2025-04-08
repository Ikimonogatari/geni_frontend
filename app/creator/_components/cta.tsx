"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ElevatedButton } from "@/components/common/ElevatedButton";
import { useRouter } from "next/navigation";

type CallToActionProps = {
  headerImgSrc: string;
  imgSrc: string;
  title: string;
  description: string;
  btnText: string;
  btnColor: "pink" | "blue" | "green" | "orange";
  descriptionRightPadding: number;
  imgWidth?: string | number;
  imgClass?: string;
  mobileImgSrc?: string;
};

export default function CallToAction({}) {
  const router = useRouter();

  const handleRoute = () => {
    router.push("/apply");
  };
  return (
    <>
      <div className="flex flex-col gap-4 lg:hidden w-full bg-primary-bg px-5 py-8 rounded-[30px]">
        <Image
          src="/pro100/1.png"
          alt="pro-100"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
        <h2 className="text-2xl font-bold">
          Тогтмол брэндтэй хамтран, оноо цуглуулж, бүтээгч түвшнөө ахиулаад
          хамтрал бүрээс нэмэлт мөнгөн урамшуулал ол
        </h2>
        <p className="text-lg leading-tight">
          Их контент хийж, хаяг хөгжүүлэн, брэндийн санал хүлээхгүйгээр
          брэндүүдтэй тогтмол хамтран, бүтээлч чадвараараа орлогоо нэм
        </p>
        <ElevatedButton
          theme="pink"
          className="px-14 w-full mt-2"
          onClick={handleRoute}
        >
          <div className="flex gap-2 items-center justify-center">
            <span className="text-nowrap md:text-2xl font-bold">
              Өргөдөл илгээх
            </span>
            <ArrowRight size={24} />
          </div>
        </ElevatedButton>
      </div>
      <div className="hidden lg:inline-block w-full">
        <div className="flex w-full bg-primary-bg rounded-[30px] rounded-br-none">
          <div className="flex gap-28">
            <div className="flex-[3] w-full p-14 flex flex-col gap-11">
              <h2 className="text-3xl font-bold">
                Тогтмол брэндтэй хамтран, оноо цуглуулж, бүтээгч түвшнөө
                ахиулаад хамтрал бүрээс нэмэлт мөнгөн урамшуулал ол
              </h2>
              <p className="text-2xl">
                Их контент хийж, хаяг хөгжүүлэн, брэндийн санал хүлээхгүйгээр
                брэндүүдтэй тогтмол хамтран, бүтээлч чадвараараа орлогоо нэм
              </p>
            </div>
            <div className="flex-[2] relative">
              <Image
                src="/pro100/1.png"
                alt="pro-100"
                width={0}
                height={0}
                sizes="100vw"
                className="absolute w-full max-w-96 h-auto -bottom-5"
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-[3] bg-primary-bg">
            <div className="bg-white h-full rounded-tr-[30px] pt-7 pr-7">
              <ElevatedButton
                theme="pink"
                className="px-14 w-full"
                onClick={handleRoute}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span className="text-lg md:text-2xl font-bold">
                    Өргөдөл илгээх
                  </span>
                  <ArrowRight size={24} />
                </div>
              </ElevatedButton>
            </div>
          </div>
          <div className="flex-[7] bg-primary-bg text-white p-4 rounded-b-[30px]"></div>
        </div>
      </div>
    </>
  );
}
