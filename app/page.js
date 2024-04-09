import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="mt-32">
        <div className="container max-w-7xl mx-auto px-7 flex flex-col lg:flex-row justify-start items-start sm:justify-center sm:items-center gap-5 sm:gap-10 lg:gap-20 pt-14 lg:pt-[111px] pb-[158px]">
          <div className="flex flex-col relative text-black text-4xl sm:text-6xl font-bold">
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
        <div className="container mx-auto px-7 w-full border-[1px] border-[#2D262D] min-h-[652px] bg-[#F5F4F0] rounded-full pt-24"></div>
        <div className="container mx-auto px-7 w-full border-t-[1px] border-b-[1px] border-[#2D262D] mt-[133px] flex flex-row">
          <div className="flex flex-col border-r-[1px] border-[#2D262D] w-1/2"></div>
          <div className="flex flex-col w-1/2"></div>
        </div>
      </div>
    </main>
  );
}
