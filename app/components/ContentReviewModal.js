import React from "react";
import Image from "next/image";
import { DialogContent, Dialog, DialogTrigger } from "./ui/dialog";

function ContentReviewModal({ p }) {
  function getRatingWord(points) {
    if (points == 100) {
      return "Маш сайн"; // Very Good
    } else if (points == 80) {
      return "Сайн"; // Good
    } else if ((points = 60)) {
      return "Дунд"; // Average
    } else if (points == 40) {
      return "Муу"; // Bad
    } else {
      return "Маш муу"; // Very Bad
    }
  }
  return (
    <Dialog>
      <DialogTrigger
        type="submit"
        className="bg-[#4D55F5] whitespace-nowrap border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
      >
        Сэтгэгдэл харах
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-w-lg flex flex-col">
        <span className="text-3xl font-bold">Брэндийн сэтгэгдэл</span>
        <div className="mt-10 flex flex-row items-center gap-4">
          <Image
            src={p?.BrandPic ? p?.BrandPic : "/dummy-brand.png"}
            width={84}
            height={84}
            className="w-[84px] h-[84px] aspect-square rounded-full border border-[#2D262D]"
          />
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold">{p?.BrandName}</span>
            <div className="bg-[#CA7FFE] text-white text-center text-xs rounded-3xl px-4 py-2">
              {p?.BrandType}
            </div>
          </div>
        </div>
        <span className="mt-5">Танд өгсөн оноо</span>
        <div className="flex gap-2">
          {[20, 40, 60, 80, 100].map((point, i) => (
            <div
              key={i}
              className={`py-2 px-5 text-sm rounded-xl ${
                p?.BrandGivenPoint === point
                  ? "bg-[#4FB755] border-[#4FB755] border text-white"
                  : "bg-transparent border-[#CDCDCD] border text-[#CDCDCD]"
              }`}
            >
              {point}
            </div>
          ))}
        </div>

        <span className="py-1 px-3 text-sm bg-[#FFD28F] rounded-3xl w-fit">
          {getRatingWord(p?.BrandGivePoints)}
        </span>

        <span>Танд өгсөн сэтгэгдэл</span>
        <span className="bg-[#F5F4F0] p-4 rounded-2xl min-h-[127px] overflow-y-auto">
          {p?.BrandComment}
        </span>
      </DialogContent>
    </Dialog>
  );
}

export default ContentReviewModal;
