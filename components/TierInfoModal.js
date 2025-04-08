import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

function TierInfoModal() {
  return (
    <Dialog>
      <DialogTrigger className="py-4 px-7 sm:max-w-min w-full sm:w-auto whitespace-nowrap sm:min-w-[271px] text-center border border-primary rounded-lg font-bold text-base sm:text-lg">
        Онооны түвшин
      </DialogTrigger>
      <DialogContent className="h-full sm:h-auto overflow-y-auto max-w-sm w-full sm:max-w-5xl flex flex-col gap-10">
        <span className="text-2xl sm:text-3xl font-medium">Creator түвшин</span>
        <div className="flex flex-col gap-4 text-[7px] sm:text-xs">
          <div className="font-medium grid grid-cols-[2fr,1fr,1fr,2fr,2fr] border-b-[1px] border-[#000000] pb-4">
            <div className="col-span-1">Түвшин нэр</div>
            <div className="col-span-1">Цол</div>
            <div className="col-span-1">XP оноо</div>
            <div className="col-span-1">Geni credit point</div>
            <div className="col-span-1">Үүсэх давуу тал</div>
          </div>
          {creator_level.map((c, i) => (
            <div key={i} className="grid grid-cols-[2fr,1fr,1fr,2fr,2fr]">
              <div className="col-span-1">{c.level_name}</div>
              <div className="col-span-1">
                <Image
                  src={c.badge}
                  alt=""
                  width={58}
                  height={24}
                  className={`${c.badge_size}`}
                />
              </div>
              <div className="col-span-1">{c.xp}</div>
              <div className="col-span-1">{c.price}</div>
              <div className="col-span-1">{c.advantage}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 text-[7px] sm:text-xs">
          <span className="font-medium border-b-[1px] border-[#000000] pb-4">
            Мөнгөн шагнал болон XP оноо бодогдох дэлгэрэнгүй
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creator_stars.map((c, i) => (
              <div key={i} className="flex flex-col gap-5">
                <div className="flex flex-row items-center gap-2">
                  Pro creator {c.tier}
                  <Image
                    src={`/rating-${c.tier}.png`}
                    width={58}
                    height={22}
                    alt=""
                    className="w-[29px] h-[11px] sm:w-[58px] sm:h-[22px]"
                  />
                </div>
                <div className="col-span-1 flex flex-row items-center gap-8">
                  <div className="flex flex-col gap-1">
                    {[...Array(5)].map((_, rowIndex) => (
                      <div key={rowIndex} className="flex gap-1">
                        {[...Array(5)].map((_, starIndex) => (
                          <img
                            key={starIndex}
                            src={
                              starIndex < 5 - rowIndex
                                ? "/star.png"
                                : "/empty-star.png"
                            }
                            alt={""}
                            className="w-5 h-5"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    {c.amounts.map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    {[100, 80, 30, 20, 10].map((s, i) => (
                      <span className="whitespace-nowrap" key={i}>
                        {s} XP
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TierInfoModal;

const creator_level = [
  {
    level_name: "Geni creator",
    badge: "/rating-geni.png",
    badge_size: "h-4 w-4 sm:w-6 sm:h-6",
    xp: "-",
    price: "%",
    advantage: "-",
  },
  {
    level_name: "Pro creator gold",
    badge: "/rating-gold.png",
    badge_size: "w-[29px] h-[11px] sm:w-[58px] sm:h-[22px]",
    xp: "15’000",
    price: "₮48’000 - ₮80’000",
    advantage: "3 бүтээгдэхүүн зэрэг хүсэх эрх",
  },
  {
    level_name: "Pro creator silver",
    badge: "/rating-silver.png",
    badge_size: "w-[29px] h-[11px] sm:w-[58px] sm:h-[22px]",
    xp: "5’000",
    price: "₮30’000 - ₮50’000",
    advantage: "2 бүтээгдэхүүн зэрэг хүсэх эрх",
  },
  {
    level_name: "Pro creator bronze",
    badge: "/rating-bronze.png",
    badge_size: "w-[29px] h-[11px] sm:w-[58px] sm:h-[22px]",
    xp: "1’000",
    price: "₮6’000 - ₮30’000",
    advantage: "2 бүтээгдэхүүн зэрэг хүсэх эрх",
  },
  {
    level_name: "Certified creator",
    badge: "/verified-icon.png",
    badge_size: "h-4 w-4 sm:w-6 sm:h-6",
    xp: "100",
    price: "-",
    advantage: "1 бүтээгдэхүүн хүсэх эрх",
  },
];

const creator_stars = [
  {
    amounts: ["₮30’000", "₮24’000", "₮18’000", "₮12’000", "₮6’000"],
    tier: "bronze",
  },
  {
    amounts: ["₮50’000", "₮40’000", "₮30’000", "₮20’000", "₮10’000"],
    tier: "silver",
  },
  {
    amounts: ["₮80’000", "₮64’000", "₮64’000", "₮32’000", "₮16’000"],
    tier: "gold",
  },
];
