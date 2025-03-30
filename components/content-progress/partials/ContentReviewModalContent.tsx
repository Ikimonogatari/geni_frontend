import React from "react";
import Image from "next/image";

function ContentReviewModalContent({ p }) {
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
    <>
      <div className="mt-4 flex flex-row items-center gap-2">
        <span className="text-[#6F6F6F]">Танд өгсөн дундаж оноо:</span>
        <Image
          src={"/star.png"}
          width={28}
          height={28}
          alt=""
          className="w-7 h-7"
        />
        <span>
          {p && (
            <span className="text-lg font-bold">
              {renderAvgStar(
                p?.BrandInstructionPnt || 0,
                p?.ContextPnt || 0,
                p?.CreationPnt || 0
              )}
            </span>
          )}
        </span>
      </div>

      <div className="border-[1px] border-[#E6E6E6] rounded-2xl p-5">
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
          <span className="text-[#6F6F6F]">Танд өгсөн сэтгэгдэл</span>
          <span className="bg-[#F5F4F0] border-[1px] border-[#000000] p-3 rounded-2xl min-h-[67px] overflow-y-auto">
            {p?.BrandComment}
          </span>
        </div>
      )}
      {p?.BrandComment !== "" && (
        <div className="flex flex-col gap-4">
          <span className="text-[#6F6F6F]">Контент пост хийх хүсэлт</span>
          <span className="bg-[#F5F4F0] border-[1px] border-[#000000] p-3 rounded-2xl min-h-[67px] overflow-y-auto">
            {p?.BrandComment}
          </span>
        </div>
      )}

      <span className="text-[#6F6F6F]">Таны цуглуулсан оноо</span>
      <div className="w-full py-4 text-white font-semibold bg-geni-green text-xl text-center rounded-2xl">
        30 XP
      </div>
    </>
  );
}

export default ContentReviewModalContent;
