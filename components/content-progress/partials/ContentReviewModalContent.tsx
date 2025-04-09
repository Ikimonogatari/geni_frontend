import React from "react";
import Image from "next/image";
import { Content } from "../content.services";
import { GetFinalContentXpResponse } from "../content.services";

type ContentReviewModalContentProps = {
  p: Content;
  finalContentXpData: GetFinalContentXpResponse;
};

const ContentReviewModalContent: React.FC<ContentReviewModalContentProps> = ({
  p,
  finalContentXpData,
}) => {
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
          <span className="border-[1px] border-[#E6E6E6] p-3 rounded-2xl min-h-[67px] overflow-y-auto">
            {p?.BrandComment}
          </span>
        </div>
      )}
      {finalContentXpData?.FeedBack?.length > 0 && (
        <div className="flex flex-col gap-4">
          <span className="text-[#6F6F6F]">Контент пост хийх хүсэлт</span>
          <span className="border-[1px] border-[#E6E6E6] p-3 rounded-2xl min-h-[67px] overflow-y-auto flex flex-col gap-2">
            {finalContentXpData?.FeedBack?.map((item, index) => (
              <label
                key={index}
                className="flex items-center justify-between p-2 pl-4 border rounded-xl"
              >
                <span>{item.Feedback}</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    name="BrandFeedBack"
                    id={`BrandFeedBack-${item.FeedbackId}`}
                    className="peer hidden"
                    checked={item.IsChecked}
                    disabled={true}
                  />
                  <label
                    htmlFor={`BrandFeedBack-${item.FeedbackId}`}
                    className="w-6 h-6 rounded-lg border-2 border-orange-300 flex items-center justify-center transition-all peer-checked:border-green-300"
                  >
                    <span
                      className={`text-sm sm:text-base ${
                        item.IsChecked ? "text-green-300" : "text-orange-300"
                      } text-center select-none peer-checked:inline-block w-3 h-5 border-white`}
                    >
                      ✓
                    </span>
                  </label>
                </div>
              </label>
            ))}
          </span>
        </div>
      )}

      <span className="text-[#6F6F6F]">Таны цуглуулсан оноо</span>
      <div className="w-full py-4 text-white font-semibold bg-geni-green text-xl text-center rounded-2xl">
        {finalContentXpData?.Xp} XP
      </div>
    </>
  );
};

export default ContentReviewModalContent;
