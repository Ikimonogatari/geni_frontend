"use client";

import { ElevatedButton } from "@/components/common/ElevatedButton";
import ContainerLayout from "@/components/ui/container-layout";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const joinCallToActions = [
  {
    headImgSrc: "/genicreator-logo.svg",
    contentImgSrc: "/landing/creator/join-cta.png",
    content:
      "Чадвараа сориод шууд брэндтэй хамтрах эрхтэй Geni certified creator болж хамтрал бүрээс нэмэлт урамшуулал авч эхлээрэй.",
    btnText: "Өргөдөл илгээх",
    btnTheme: "purple",
    path: "/apply",
  },
  {
    headImgSrc: "/genibrand-logo.svg",
    contentImgSrc: "/landing/brand/join-cta.png",
    content:
      "Бүтээгдэхүүнээ илгээн бүтээгчидтэй тогтмол хамтрал хийж илүү хялбар, үр дүнтэй маркетинг хийж эхэл.",
    btnText: "Бүртгүүлэх",
    btnTheme: "blue",
    path: "/register/brand",
  },
  {
    headImgSrc: "/genistudent-logo.svg",
    contentImgSrc: "/landing/student/join-cta.png",
    content:
      "Контент бүтээх чадварт өөрийн хурдаар онлайнаар суралцангаа хамтрал хийн туршлага хуримтлуулж, Geni Certified Creator болоорой.",
    btnText: "Бүртгүүлэх",
    btnTheme: "green",
    path: "/register/student",
  },
  {
    headImgSrc: "/genimentor-logo.svg",
    contentImgSrc: "/landing/mentor/join-cta.png",
    content:
      "Чадварлаг бүтээгчдийн онлайн хичээлээс суралцан илүү өндөр үнэлгээтэй бүтээгч болоорой.",
    btnText: "Тухай",
    btnTheme: "orange",
    path: "/mentor",
  },
];

export default function Page() {
  const router = useRouter();
  const handleRoute = (path: string) => () => {
    router.push(path);
  };
  return (
    <ContainerLayout className="container mt-9 mb-20 md:my-28">
      <div className="flex flex-col gap-9">
        <h1 className="text-3xl md:text-4xl font-black">Платформд нэгдэх</h1>
        <div className="grid grid-cols-12 gap-6">
          {joinCallToActions.map((cta) => (
            <div
              key={cta.content}
              className="col-span-full md:col-span-6 lg:col-span-3 flex flex-col justify-between p-6 bg-primary-bg rounded-[30px]"
            >
              <div className="flex flex-col gap-6">
                <Image
                  src={cta.headImgSrc}
                  alt="head img"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto px-8 pt-4"
                />
                <Image
                  src={cta.contentImgSrc}
                  alt="content img"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-64 h-40 object-contain select-none"
                />
                <p className="text-lg">{cta.content}</p>
              </div>
              <div className="flex flex-col justify-between mt-6">
                <ElevatedButton
                  theme={cta.btnTheme as "blue" | "green" | "orange" | "pink"}
                  onClick={handleRoute(cta.path)}
                >
                  <div className="flex gap-2 items-center justify-center">
                    <span className="whitespace-nowrap text-lg md:text-xl font-bold">
                      {cta.btnText}
                    </span>
                    <ArrowRight size={24} />
                  </div>
                </ElevatedButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerLayout>
  );
}
