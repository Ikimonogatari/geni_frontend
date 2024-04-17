"use client";
import Image from "next/image";
import Contents from "../Contents";

export default function Profile() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32">
        <div className="container mx-auto px-7 max-w-7xl flex flex-col lg:flex-row items-center gap-10 pt-10">
          <div className="flex flex-col lg:flex-row w-full lg:w-1/2 lg:items-center gap-8">
            <Image
              src={"/dummy-creator.png"}
              width={261}
              height={400}
              alt="dummy-creator"
            />
            <div className="flex flex-col">
              <div className="flex flex-row gap-3">
                <span className="text-[#2D262D] text-2xl">Davaanaa Bayraa</span>
                <Image
                  src={"/verified-icon.png"}
                  width={24}
                  height={24}
                  alt="verified-icon"
                />
              </div>
              <span className="mt-2 text-[#6F6F6F] text-[18px]">
                Bio baih bolnoo bio baih bolnoooooodf fijwrhfijr1
              </span>
              <div className="mt-3 flex flex-row items-center gap-2 text-[#2D262D]">
                <button className="bg-[#CA7FFE] rounded-full px-4 py-2">
                  Beauty
                </button>
                <button className="bg-[#CA7FFE] rounded-full px-4 py-2">
                  Health
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <span className="text-[#6F6F6F] text-[18px]">Collab brands: 3</span>
            <div className="flex flex-row gap-[10px]">
              <Image
                src={"/dummy-brand-logo.png"}
                width={54}
                height={54}
                alt="dummy-brand-logo"
              />
              <Image
                src={"/dummy-brand-logo.png"}
                width={54}
                height={54}
                alt="dummy-brand-logo"
              />
              <Image
                src={"/dummy-brand-logo.png"}
                width={54}
                height={54}
                alt="dummy-brand-logo"
              />
            </div>
          </div>
        </div>
        <Contents />
        <div className="container max-w-7xl px-7 mx-auto pb-20 mt-6">
          <div className="static lg:relative bg-[#F5F4F0] flex flex-col lg:flex-row items-center gap-10 px-10 py-6 rounded-2xl border-[1px] border-[#2D262D]">
            <button className="hidden lg:block absolute top-6 right-6 px-10 py-[10px] text-2xl rounded-full bg-[#4FB755] border-[1px] border-[#2D262D] text-white">
              Review
            </button>
            <Image
              src={"/review-image.png"}
              width={172}
              height={306}
              alt="review-image"
              className="relative lg:static"
            />
            <button className="block lg:hidden w-full sm:w-1/2 px-10 py-[10px] text-2xl rounded-full bg-[#4FB755] border-[1px] border-[#2D262D] text-white">
              Review
            </button>
            <div className="flex flex-col text-[#2D262D] text-[18px]">
              <div className="flex flex-row items-center gap-6">
                <Image
                  src={"/lhamour.png"}
                  width={56}
                  height={56}
                  alt="lhamour"
                />
                <span className="">Founder & CEO: Khulan Davaadorj</span>
              </div>
              <span className="mt-5">Brand review:</span>
              <span className="mt-6">
                Lily's video review of the I'm Prep! Balm - Corner in Corner
                color by I'M MEME highlights the product's impressive
                performance. She mentions that the balm provides a flawless
                finish, with long-lasting wear that stays intact even during
                dancing. The color payoff is excellent, and the balm's ability
                to adhere well to the skin is commendable. Lily also appreciates
                the product's versatility, as it can be used for both day and
                night looks.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
