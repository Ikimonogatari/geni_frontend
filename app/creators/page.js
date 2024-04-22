import React from "react";
import Image from "next/image";
import Creators from "./Creators";

export const metadata = {
  title: "Geni | Creators",
  description: "Geni Creators",
};

function creators() {
  return (
    <div className="min-h-screen w-full bg-white text-[#2D262D]">
      <div className="mt-32">
        <div className="pt-20 container max-w-7xl mx-auto px-7">
          <Image
            src={"/genicreator-logo.svg"}
            width={160}
            height={29}
            alt="geni-creator-logo"
          />
          <div className="flex flex-col lg:flex-row gap-5 mt-6">
            <div className="w-full lg:w-1/2 flex flex-col gap-6 p-8 rounded-2xl bg-[#F5F4F0]">
              <Image
                src={"/creators-image1.png"}
                width={254}
                height={225}
                alt="creators-image"
                className="mx-auto"
              />
              <span className="text-2xl sm:text-4xl font-bold">
                Онлайнаар, хэн ч, хаанаас ч ажиллах боломжтой
              </span>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6 p-8 rounded-2xl bg-[#F5F4F0]">
              <Image
                src={"/creators-image2.png"}
                width={258}
                height={236}
                alt="creators-image"
                className="mx-auto"
              />
              <span className="text-2xl sm:text-4xl font-bold">
                Их дагагч, хаяг хөгжүүлэлт шаардлагагүй
              </span>
            </div>
          </div>
          <div className="rounded-2xl px-6 py-8 sm:p-14 border-[1px] border-[#2D262D] bg-[#F5F4F0] mt-6 flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between">
            <div className="flex flex-col gap-4">
              <Image
                src={"/genicreatorprogram-logo.svg"}
                width={160}
                height={29}
                alt="geni-creator-logo"
              />
              <span className="text-2xl font-bold text-[#6F6F6F]">
                2-р ээлжийн өргөдөл хүлээн авч байна.
              </span>
            </div>
            <div className="relative w-full lg:max-w-[371px] h-[84px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9c44da]">
              <a
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdrBB6Hjs2cnrLWe4Z48HHCr56RcRFXvK8klYB5VifU-YckYw/viewform"
                className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full lg:max-w-[371px] h-[84px] rounded-xl border-[1px] border-[#2D262D] bg-[#CA7FFE] flex flex-row gap-2 items-center justify-center"
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
        <div className="container px-7 mx-auto mt-7">
          <Image
            src={"/creator-cycle.png"}
            width={1348}
            height={442}
            alt="cycle-image"
            className="hidden lg:block mx-auto"
          />
          <Image
            src={"/creator-cycle-mobile.png"}
            width={335}
            height={1505}
            alt="cycle-image-mobile"
            className="block lg:hidden mx-auto"
          />
        </div>
        <Creators />
        <div className="container max-w-7xl px-7 mx-auto pt-16 pb-20">
          <div className="flex flex-col lg:flex-row p-8 gap-10 items-center rounded-3xl border-[#2D262D] border-[1px] bg-[#CA7FFE] text-white">
            <div className="flex flex-col gap-4 lg:gap-10">
              <span className="text-2xl sm:text-3xl font-bold">
                Жаахан хүүхдээ харангаа гэрээсээ онлайнаар, дуртай
                бүтээгдэхүүнээ үнэгүй авч, контентоор хуваалцаад тухайн брэндээ
                дэмжиж, түгээж байгаагаа мэдэх урамтай байдаг.
              </span>
              <span className="text-2xl hidden sm:block">
                Creator program student: Urtnasan Batsukh
              </span>
            </div>
            <Image
              src={"/creator-alumni-image.png"}
              width={302}
              height={302}
              alt="creator-alumni"
              className=""
            />
            <span className="text-base block sm:hidden">
              Creator program student: Urtnasan Batsukh
            </span>
          </div>
        </div>
        <div className="bg-[#F5F4F0] border-y-[1px] border-[#2D262D] py-12">
          <div className="container max-w-7xl px-7 mx-auto flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col gap-9">
              <Image
                src={"/genicreatorprogram-logo.svg"}
                width={160}
                height={29}
                alt="geni-creator-logo"
              />
              <span className="text-[#2D262D]">
                Онлайн хөтөлбөрт хамрагдан суралцангаа бодит туршлага
                хуримтлуулан хэрэглэгчээс бүтээгч болоорой.
              </span>
              <div className="relative hidden lg:block w-full lg:max-w-[371px] h-[84px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9c44da]">
                <a
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdrBB6Hjs2cnrLWe4Z48HHCr56RcRFXvK8klYB5VifU-YckYw/viewform"
                  className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full lg:max-w-[371px] h-[84px] rounded-xl border-[1px] border-[#2D262D] bg-[#CA7FFE] flex flex-row gap-2 items-center justify-center"
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
            <Image
              src={"/become-creator-image.png"}
              width={455}
              height={385}
              alt="become-creator"
            />
            <div className="relative block lg:hidden mt-9 w-full lg:max-w-[371px] h-[84px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9c44da]">
              <a
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdrBB6Hjs2cnrLWe4Z48HHCr56RcRFXvK8klYB5VifU-YckYw/viewform"
                className="absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full lg:max-w-[371px] h-[84px] rounded-xl border-[1px] border-[#2D262D] bg-[#CA7FFE] flex flex-row gap-2 items-center justify-center"
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
        <div className="container max-w-7xl px-7 py-10 sm:py-20 mx-auto">
          <span className="text-2xl">
            Geni Creator Program-д сууж төгсөн Certified Creator болсноор:
          </span>
          <div className="flex flex-col lg:flex-row gap-5 mt-6">
            <div className="w-full lg:w-1/2 flex flex-col gap-8 p-8 rounded-2xl bg-[#F5F4F0]">
              <Image
                src={"/creators-image3.png"}
                width={172}
                height={220}
                alt="creators-image"
                className="mx-auto"
              />
              <span className="text-2xl sm:text-4xl font-bold">
                UGC creator болоход шаардлагатай бүх суурь чадваруудыг эзэмшинэ
              </span>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6 p-8 rounded-2xl bg-[#F5F4F0]">
              <Image
                src={"/creators-image4.png"}
                width={247}
                height={232}
                alt="creators-image"
                className="mx-auto"
              />
              <span className="text-2xl sm:text-4xl font-bold">
                Geni платформыг албан ёсны бүтээгч болон хамтрах боломж нээгдэнэ
              </span>
            </div>
          </div>
        </div>
        <div className="border-y-[1px] border-[#2D262D] flex flex-col xl:flex-row">
          <div className="w-full py-10 sm:py-28 px-7 bg-[#CA7FFE] text-white border-r-[1px] border-[#2D262D] flex flex-col gap-7 justify-center items-center">
            <span className=" 2xl:pl-7 text-2xl w-full text-start sm:text-center xl:text-start">
              Geni Creator хөтөлбөрт сууснаар:
            </span>
            <ul className="text-2xl sm:text-3xl font-bold list-disc pl-7 flex flex-col gap-2 sm:gap-9">
              <li>Үр дүнтэй content агуулга бичих</li>
              <li>UGC зах зээлийн талаар мэдлэгтэй болох</li>

              <li>Хамгийн эхний 1-3 брэндтэй шууд хамтран ажиллах</li>

              <li>Чанартай богино бичлэг контент хийх</li>

              <li>Өөрийн гэсэн Geni creator portfolio-той болох</li>
            </ul>
          </div>
          <div className="bg-[#F5F4F0] px-7 py-20 w-full flex flex-col justify-center items-center">
            <div className="relative w-[307px] h-[270px] sm:w-[587px] sm:h-[485px] flex justify-center items-center">
              <Image
                src={"/creator-pros-icon1.png"}
                width={145}
                height={144}
                alt="creators-icon"
                className="absolute top-0 left-0 max-w-[81px] max-h-[81px] sm:max-w-[145px] sm:max-h-[144px]"
              />
              <Image
                src={"/creator-pros-icon2.png"}
                width={136}
                height={197}
                alt="creators-icon"
                className="absolute top-0 right-0 max-w-[76px] max-h-[110px] sm:max-w-[136px] sm:max-h-[197px]"
              />
              <Image
                src={"/creators-pros-image.png"}
                width={311}
                height={371}
                alt="creators-image"
                className="max-w-[174px] max-h-[207px] sm:max-w-[311px] sm:max-h-[371px]"
              />
              <Image
                src={"/creator-pros-icon3.png"}
                width={180}
                height={140}
                alt="creators-icon"
                className="absolute bottom-0 left-0 max-w-[101px] max-h-[78px] sm:max-w-[180px] sm:max-h-[140px]"
              />
              <Image
                src={"/creator-pros-icon4.png"}
                width={160}
                height={99}
                alt="creators-icon"
                className="absolute bottom-0 right-0 max-w-[89px] max-h-[55px] sm:max-w-[160px] sm:max-h-[99px]"
              />
            </div>
            <div className="mt-10 sm:mt-[110px] relative w-full max-w-[532px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9c44da]">
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
    </div>
  );
}

export default creators;
