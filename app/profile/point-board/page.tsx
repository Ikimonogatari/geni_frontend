import TierInfoModal from "@/components/TierInfoModal";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="mt-20 sm:mt-32 pb-12 sm:pb-24">
        <div className="max-w-7xl mx-auto container py-11 sm:py-20 flex flex-col gap-4 sm:gap-6">
          <span className="text-3xl sm:text-5xl font-bold">
            Таны онооны самбар
          </span>
          <div className="bg-primary-bg rounded-2xl w-full p-8 flex flex-col md:flex-row sm:items-center justify-between gap-5 md:gap-0">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 md:gap-20">
              <div className="flex flex-col">
                <span>Таны түвшин:</span>
                <span className="flex flex-row items-center gap-2 text-3xl font-bold">
                  Pro bronze{" "}
                  <Image src="/bronze-tier.png" width={74} height={28} alt="" />
                </span>
              </div>
              <div className="flex flex-col">
                <span>Нийт оноо:</span>
                <span className="text-3xl font-bold">1000 XP</span>
              </div>
            </div>

            <TierInfoModal />
          </div>
          <div className="flex flex-col gap-4 px-7">
            <span className="font-bold text-2xl">XP оноо түүх</span>
            <div className="min-w-[540px] w-full flex flex-col gap-3">
              <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[2fr,2fr,2fr,2fr,2fr] sm:grid-cols-5 gap-6 w-full items-center text-[#6F6F6F]">
                <span className="col-span-1">Ашиглагдсан оноо</span>
                <span className="col-span-1">Үлдэгдэл оноо</span>
                <span className="col-span-1">Тайлбар</span>
                <span className="col-span-1">Хугацаа</span>
                <span className="col-span-1">Төлөв</span>
              </div>
              {history.map((h, i) => (
                <div
                  key={i}
                  className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[2fr,2fr,2fr,2fr,2fr] sm:grid-cols-5 gap-6 w-full items-center text-primary"
                >
                  <span className="col-span-1">{h.usedXp} XP</span>
                  <span className="col-span-1">{h.remainingXp} XP</span>
                  <span className="col-span-1">{h.desc}</span>
                  <span className="col-span-1">{h.date}</span>
                  <span
                    className={`col-span-1 max-w-min text-white rounded-full px-4 py-[6px] text-center ${
                      h.status === "added" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {h.status === "added" ? " Нэмэгдсэн" : "Хасагдсан"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

const history = [
  {
    usedXp: 80,
    remainingXp: 100,
    desc: "Брэндээс цуглуулсан",
    date: "18/05/2024",
    status: "added",
  },
  {
    usedXp: 80,
    remainingXp: 1340,
    desc: "Контент хоцроосон",
    date: "18/05/2024",
    status: "removed",
  },
];
