import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="mt-32">
        <div className="container max-w-7xl mx-auto px-7 flex flex-col lg:flex-row justify-start items-start sm:justify-center sm:items-center gap-5 sm:gap-10 lg:gap-20 pt-14 lg:pt-[111px] pb-[158px]">
          <div className="flex flex-col relative text-[#2D262D] text-4xl sm:text-6xl font-bold">
            <Image
              src={"/hero-image2.png"}
              width={154}
              height={116}
              alt="hero-image"
              className="absolute -top-24 -right-10 xl:right-0 hidden lg:block"
            />
            <div className="flex flex-row">
              <span className="text-[#ca7ffe]">ХЭРЭГЛЭГЧ</span>
              <Image
                src={"/hero-image2.png"}
                width={96}
                height={73}
                alt="hero-image"
                className="absolute -top-8 sm:-top-4 -right-12 block lg:hidden"
              />
            </div>
            <div className="flex flex-row">
              БОЛОН&nbsp;<span className="text-[#4d55f5]">БРЭНД</span>
            </div>
            <div className="xl:flex flex-row hidden">ХАМТРАН ҮНЭ ЦЭН</div>
            <div className="xl:hidden flex flex-row">ХАМТРАН ҮНЭ</div>
            <div className="xl:hidden flex flex-row">ЦЭН БҮТЭЭХ</div>
            <div className="flex flex-wrap">
              <span className="hidden xl:block">БҮТЭЭХ&nbsp;</span>
              <div className="flex flex-row">
                <span className="text-[#4fb755]">ОРОН ЗАЙ</span>
                <Image
                  src={"/hero-image1.png"}
                  width={80}
                  height={64}
                  alt="hero-image"
                  className="absolute -bottom-5 sm:-bottom-2 -right-8 block lg:hidden"
                />
              </div>
            </div>
            <Image
              src={"/hero-image1.png"}
              width={139}
              height={111}
              alt="hero-image"
              className="absolute -bottom-32 left-24 hidden lg:block"
            />
          </div>
          <div className="relative">
            <Image
              src={"/hero-image4.png"}
              width={154}
              height={45}
              alt="hero-image"
              className="absolute -left-3 sm:-left-7 top-7 max-w-[88px] sm:max-w-[154px]"
            />
            <Image
              src={"/hero-image5.png"}
              width={138}
              height={48}
              alt="hero-image"
              className="absolute -right-3 sm:-right-7 top-7 max-w-[92px] sm:max-w-[138px]"
            />
            <Image
              src={"/hero-image3.png"}
              width={502}
              height={378}
              alt="hero-image"
              className=""
            />
          </div>
        </div>
        <div className="container mx-auto px-7 w-full pt-12">
          <Image
            src={"/cycle-image.png"}
            width={1348}
            height={625}
            alt="cycle-image"
            className="hidden md:block mx-auto"
          />
          <Image
            src={"/cycle-image-mobile.png"}
            width={335}
            height={725}
            alt="cycle-image-mobile"
            className="block md:hidden mx-auto"
          />
        </div>
        <div className="w-full h-full px-7 border-t-[1px] border-b-[1px] border-[#2D262D] bg-[#F5F4F0] mt-[133px]">
          <div className="py-12 lg:py-0 flex gap-6 lg:gap-0 flex-col lg:flex-row mx-auto container h-full">
            <div className="lg:py-[144px] flex flex-col gap-8 text-[#2D262D] w-full">
              <Image
                src={"/genicreator-logo.png"}
                width={154}
                height={28}
                alt="creator-logo"
                className=""
              />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase">
                Хэрэглэгчээс бYтээгч болж орлогоо нэмээрэй
              </span>
              <span className="">
                Инфлүүнсэр болж брэндүүдийн санал хүлээлгүйгээр дуртай
                брэндүүдтэйгээ шууд контент хийн хамтран ажиллаж орлого олж
                эхлээрэй. Хэн ч хаанаас ч ажиллах боломжтой.
              </span>
            </div>
            <div className="w-[1px] mx-4 bg-[#2D262D] hidden lg:block">
              &nbsp;
            </div>
            <div className="flex flex-col justify-center items-center gap-4 sm:gap-8 lg:gap-14 w-full">
              <div className="mx-auto flex flex-row items-center relative">
                <Image
                  src={"/creator-image1.png"}
                  alt="creator-image"
                  width={361}
                  height={276}
                />
                <Image
                  src={"/creator-image2.png"}
                  alt="creator-image"
                  width={160}
                  height={211}
                  className="-mx-20 mb-32"
                />
                <Image
                  src={"/creator-image3.png"}
                  alt="creator-image"
                  width={335}
                  height={247}
                />
              </div>
              <div className="relative w-full max-w-[532px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9c44da]">
                <button className="absolute -top-[6px] -left-[6px] z-50 text-white text-lg font-bold w-full max-w-[532px] h-[90px] rounded-xl border-[1px] border-[#2D262D] bg-[#CA7FFE] flex flex-row gap-2 items-center justify-center">
                  <span>Geni Creator болох</span>
                  <Image
                    src={"/arrow-right-icon.png"}
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
