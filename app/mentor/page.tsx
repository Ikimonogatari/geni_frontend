import { ElevatedButton } from "@/components/common/ElevatedButton";
import { Badge } from "@/components/ui/badge";
import ContainerLayout from "@/components/ui/container-layout";
import { ArrowRight, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mentors = [
  {
    name: "Wavex",
    description: "Video shooting master",
    igLink: "",
    fbLink: "",
  },
  {
    name: "Pinkonoo",
    description: "Creator tools master",
    igLink: "",
    fbLink: "",
  },
  { name: "Ulamsaikhan", description: "Script master", igLink: "", fbLink: "" },
  { name: "Meira", description: "Content master", igLink: "", fbLink: "" },
];

export default function Page() {
  return (
    <ContainerLayout className="container mt-9 mb-20 md:my-28">
      <div className="w-full flex flex-col items-start lg:items-center">
        <Image
          src="/genimentor-logo.svg"
          alt="img"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-7 lg:h-11"
        />
        <h1 className="text-start lg:text-center text-2xl leading-tight lg:leading-normal tracking-tighter lg:tracking-normal lg:text-3xl md:text-4xl font-black mt-5 lg:mt-14">
          Чадварлаг контент бүтээгчдийн чадвар, мэдлэгт суралцаад бүтээгчийн
          чадвар, сэтгэлгээгээ дараагийн түвшинд хөгжүүлээрэй
        </h1>
        <p className="text-lg lg:text-2xl mt-4 lg:mt-7">
          Зөвхөн Geni Бүтээгчдийн хүрээлэлд нээлттэй.
        </p>
        <Badge className="bg-[#F75423] hover:bg-[#F75423] text-2xl lg:text-3xl px-4 lg:px-7 py-1 lg:py-2 -rotate-[5.38deg] mt-3 mx-auto">
          Тун удахгүй ...
        </Badge>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-7 mt-10 lg:mt-6">
          {mentors.map(({ name, description, igLink, fbLink }, index) => (
            <div className="col-span-full sm:col-span-6 lg:col-span-3">
              <div className="bg-primary-bg border border-border-gray/60 rounded-[30px]">
                <div className="flex flex-col">
                  <div className="flex flex-[3]">
                    <Image
                      src={`/landing/mentor/mentors/${index + 1}.png`}
                      alt="wavex"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-full md:w-full md:h-[310px] object-cover rounded-t-[30px]"
                    />
                  </div>
                  <div className="flex-[1] flex flex-col gap-3.5 items-center my-4">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <div className="flex gap-3">
                      <Link href={igLink}>
                        <Instagram className="text-[#6F6F6F]" />
                      </Link>
                      <Link href={fbLink}>
                        <Facebook className="text-[#6F6F6F]" />
                      </Link>
                    </div>
                    <p className="text-lg text-[#6F6F6F]">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerLayout>
  );
}
