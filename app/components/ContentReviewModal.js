import React, { useState } from "react";
import Image from "next/image";
import { DialogContent, Dialog, DialogTrigger } from "./ui/dialog";

function ContentReviewModal({ p }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function renderStars(score) {
    return [1, 2, 3, 4, 5].map((star, index) => (
      <span key={index}>
        <Image
          src={star <= score ? "/star.png" : "/empty-star.png"}
          alt="Star"
          width={28}
          height={28}
        />
      </span>
    ));
  }

  const renderAvgStar = (instruction, context, creation) => {
    const validScores = [instruction, context, creation].filter(
      (score) => typeof score === "number" && !isNaN(score)
    );

    if (validScores.length === 0) return 0; // Avoid division by zero

    return (
      validScores.reduce((sum, score) => sum + score, 0) / validScores.length
    ).toFixed(1);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        type="submit"
        className="bg-[#4D55F5] whitespace-nowrap border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
      >
        Сэтгэгдэл харах
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full flex flex-col rounded-3xl">
        <span className="text-3xl font-bold">Брэндийн сэтгэгдэл</span>
        <div className="flex flex-row items-center gap-4 mt-4">
          <Image
            src={
              p?.BrandProfileLink
                ? p?.BrandProfileLink
                : "/white-placeholder.png"
            }
            width={84}
            height={84}
            className="w-[84px] h-[84px] aspect-square rounded-full border border-[#2D262D]"
          />
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold">{p?.BrandName}</span>
            <div className="bg-[#4D55F5] text-white text-center text-xs rounded-3xl px-4 py-2">
              {p?.BrandTypes?.[0]?.TypeName}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center gap-2">
          <span>Таньд өгсөн дундаж оноо:</span>
          <Image
            src={"/star.png"}
            width={28}
            height={28}
            alt=""
            className="w-7 h-7"
          />
          <span>
            {p &&
              renderAvgStar(
                p?.BrandInstructionPnt || 0,
                p?.ContextPnt || 0,
                p?.CreationPnt || 0
              )}
          </span>
        </div>

        <div className="border-[1px] border-[#000000] rounded-2xl bg-[#F5F4F0] p-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm">
              Брэндийн өгсөн чиглүүлэгийн дагуу хийсэн эсэх
            </span>
            <div className="flex flex-row gap-[6px] items-center">
              {renderStars(p?.BrandInstructionPnt)}
            </div>
            <span className="text-sm">Контентын агуулга</span>
            <div className="flex flex-row gap-[6px] items-center">
              {renderStars(p?.ContextPnt)}
            </div>
            <span className="text-sm">Контентын хийцлэл</span>
            <div className="flex flex-row gap-[6px] items-center">
              {renderStars(p?.CreationPnt)}
            </div>
          </div>
        </div>
        {p?.BrandComment !== "" && (
          <div className="flex flex-col gap-4">
            <span>Танд өгсөн сэтгэгдэл</span>
            <span className="bg-[#F5F4F0] border-[1px] border-[#000000] p-3 rounded-2xl min-h-[67px] overflow-y-auto">
              {p?.BrandComment}
            </span>
          </div>
        )}
        <button
          onClick={() => setIsDialogOpen(false)}
          className="mt-2 w-full py-4 text-white font-semibold bg-[#CA7FFE] text-xl border border-[#2D262D] rounded-2xl"
        >
          Баярлалаа
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default ContentReviewModal;
