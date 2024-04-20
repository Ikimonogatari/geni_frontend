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
            className="hidden lg:block mx-auto"
          />
          <Image
            src={"/cycle-image-mobile.png"}
            width={335}
            height={725}
            alt="cycle-image-mobile"
            className="block lg:hidden mx-auto"
          />
        </div>
        <div className="w-full h-full px-7 border-t-[1px] border-b-[1px] border-[#2D262D] bg-[#F5F4F0] mt-[133px]">
          <div className="py-12 lg:py-0 flex gap-6 lg:gap-0 flex-col lg:flex-row mx-auto container max-w-7xl h-full">
            <div className="lg:py-[144px] flex flex-col gap-8 text-[#2D262D] lg:w-1/2 w-full">
              <Image
                src={"/genicreator-logo.svg"}
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
            <div className="flex flex-col justify-center items-center gap-4 sm:gap-8 lg:gap-14 lg:w-1/2">
              <div className="mx-auto flex flex-row items-center relative">
                <Image
                  src={"/creator-image1.png"}
                  alt="creator-image"
                  width={361}
                  height={276}
                  className="max-w-[180px] sm:max-w-[270px] 2xl:max-w-[361px]"
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
                  className="max-w-[164px] sm:max-w-[252px] 2xl:max-w-[335px]"
                />
              </div>
              <div className="relative w-full max-w-[532px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9c44da]">
                <a
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdrBB6Hjs2cnrLWe4Z48HHCr56RcRFXvK8klYB5VifU-YckYw/viewform"
                  className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full max-w-[532px] h-[90px] rounded-xl border-[1px] border-[#2D262D] bg-[#CA7FFE] flex flex-row gap-2 items-center justify-center"
                >
                  <span>Geni Creator болох</span>
                  <Image
                    src={"/arrow-right-icon.png"}
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full px-7 text-[#2D262D] border-[#2D262D]">
          <div className="py-10 sm:py-20 lg:py-32 flex flex-col-reverse lg:flex-row gap-14 items-center mx-auto container max-w-7xl h-full">
            <div className="flex flex-col gap-6 sm:gap-12 relative w-full lg:w-1/2">
              <Image
                src={"/quotes.png"}
                width={62}
                height={50}
                alt="quotes"
                className="absolute -top-10 sm:-top-20 left-0 lg:-left-5 max-w-[31px] max-h-[25px] lg:max-w-[62px] lg:max-h-[50px]"
              />
              <span className="text-2xl lg:text-3xl font-bold">
                Жаахан хүүхдээ харангаа гэрээсээ онлайнаар, дуртай
                бүтээгдэхүүнээ үнэгүй авч, контентоор хуваалцаад тухайн брэндээ
                дэмжиж, түгээж байгаагаа мэдэх урамтай байдаг.
              </span>

              <span className="text-sm sm:text-xl lg:text-2xl">
                Geni Creator: Meira Davaajargal
              </span>

              <Image
                src={"/quotes.png"}
                width={62}
                height={50}
                alt="quotes"
                className="absolute bottom-5 sm:bottom-10 right-0 lg:-right-5 rotate-180 max-w-[31px] max-h-[25px] lg:max-w-[62px] lg:max-h-[50px]"
              />
            </div>
            <div className="relative">
              <Image
                src={"/creator-icon3.png"}
                width={109}
                height={99}
                alt="founder-icon"
                className="absolute left-0 -top-5 sm:-top-10  max-w-[61px] max-h-[55px] sm:max-w-[109px] sm:max-h-[99px]"
              />
              <Image
                src={"/creator-icon2.png"}
                width={195}
                height={211}
                alt="founder-icon"
                className="absolute -right-5 sm:right-0 top-5  max-w-[140px] max-h-[107px] sm:max-w-[251px] sm:max-h-[192px]"
              />

              <Image
                src={"/creator-image.png"}
                width={546}
                height={547}
                alt="founder"
                className="mx-auto"
              />
              <Image
                src={"/creator-icon1.png"}
                width={123}
                height={40}
                alt="founder-icon"
                className="absolute bottom-14 sm:bottom-24 right-0 max-w-[77px] max-h-[22px] sm:max-w-[138px] sm:max-h-[40px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full px-7 border-t-[1px] border-b-[1px] border-[#2D262D] bg-[#F5F4F0]">
          <div className="py-12 lg:py-0 flex gap-6 lg:gap-0 flex-col lg:flex-row mx-auto container max-w-7xl h-full">
            <div className="lg:py-[144px] flex flex-col gap-8 text-[#2D262D] w-full">
              <Image
                src={"/genibrand-logo.svg"}
                width={154}
                height={28}
                alt="creator-logo"
                className=""
              />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase">
                Хэрэглэгчидтэй-гээ хамтран брэндийн Үнэ цэнээ өсгөөрэй
              </span>
              <span className="">
                Өндөр хийцлэлтэй, төлбөртэй зар суртчилгаанаас хүмүүс залхсан.
                Оронд нь хэрэглэгчдэд илүү ойр, хэрэглэгчээс хэрэглэгчид санал
                болгосон бодит контент илүү үр дүнтэй байна. <br /> <br />
                Таны хэрэглэгчдийн бүтээсэн контент 35%-р илүү их хүнд хүрэн,
                24%-р их зарагддаг. Бодит хэрэглэгчидтэйгээ хамтран илүү үнэн,
                ойр, өндөр үр дүнтэй контент хүргээрэй.
              </span>
            </div>
            <div className="w-[1px] mx-4 bg-[#2D262D] hidden lg:block">
              &nbsp;
            </div>
            <div className="flex flex-col justify-center items-center gap-4 sm:gap-8 lg:gap-14 w-full">
              <Image
                src={"/brand-image.png"}
                width={625}
                height={347}
                alt="brand-image"
                className="lg:ml-10"
              />
              <div className="relative w-full max-w-[532px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#131aaf]">
                <a
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLScJw4vWyiKFErCKmIwrmFFCjTsnXfXIEuuNPlVkg4l3U7xjCg/viewform?usp=send_form"
                  className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full max-w-[532px] h-[90px] rounded-xl border-[1px] border-[#2D262D] bg-[#4D55F5] flex flex-row gap-2 items-center justify-center"
                >
                  <span>Geni Brand болох</span>
                  <Image
                    src={"/arrow-right-icon.png"}
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full px-7 text-[#2D262D] border-[#2D262D]">
          <div className="py-10 sm:py-20 lg:py-32 flex flex-col-reverse lg:flex-row gap-14 items-center mx-auto container max-w-7xl h-full">
            <div className="flex flex-col gap-6 sm:gap-12 relative w-full lg:w-1/2">
              <Image
                src={"/quotes.png"}
                width={62}
                height={50}
                alt="quotes"
                className="absolute -top-10 sm:-top-20 left-0 lg:-left-5 max-w-[31px] max-h-[25px] lg:max-w-[62px] lg:max-h-[50px]"
              />
              <span className="text-2xl lg:text-3xl font-bold">
                Сэтгэл шингээж хийсэн бүтээгдэхүүнийг маань бодит хэрэглэгчид
                бидний өмнөөс танилцуулж, хайрлаж байгаа бодит контентууд харах
                үнэхээр урамтай байдаг.
              </span>
              <div className="flex flex-row items-center gap-6">
                <Image
                  src={"/lhamour.png"}
                  width={56}
                  height={56}
                  alt="lhamour"
                />
                <span className="text-sm sm:text-xl lg:text-2xl">
                  Founder & CEO: Khulan Davaadorj
                </span>
              </div>
              <Image
                src={"/quotes.png"}
                width={62}
                height={50}
                alt="quotes"
                className="absolute bottom-16 sm:bottom-10 right-0 lg:-right-5 rotate-180 max-w-[31px] max-h-[25px] lg:max-w-[62px] lg:max-h-[50px]"
              />
            </div>
            <div className="relative">
              <Image
                src={"/founder-icon3.png"}
                width={71}
                height={93}
                alt="founder-icon"
                className="absolute left-0 top-0  max-w-[41px] max-h-[54px] sm:max-w-[71px] sm:max-h-[93px]"
              />
              <Image
                src={"/founder-icon2.png"}
                width={195}
                height={211}
                alt="founder-icon"
                className="absolute right-0 top-0  max-w-[114px] max-h-[123px] sm:max-w-[195px] sm:max-h-[211px]"
              />

              <Image
                src={"/founder-image.png"}
                width={546}
                height={547}
                alt="founder"
                className="mx-auto"
              />
              <Image
                src={"/founder-icon1.png"}
                width={123}
                height={40}
                alt="founder-icon"
                className="absolute bottom-14 sm:bottom-24 right-0 max-w-[72px] max-h-[23px] sm:max-w-[123px] sm:max-h-[40px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full px-7 py-6 sm:py-10 lg:py-20 flex flex-row justify-center items-center gap-3 sm:gap-8 bg-[#2D262D]">
          <Image
            src={"/comingsoon-icon.png"}
            width={151}
            height={152}
            alt="coming-soon"
            className="max-w-[54px] max-h-[54px] sm:max-w-[151px] sm:max-h-[152px]"
          />
          <span className="text-sm sm:text-xl lg:text-3xl font-normal sm:font-bold text-white">
            Платформ Тун Удахгүй...
          </span>
        </div>
      </div>
    </main>
  );
}
