"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EmptyList from "@/components/common/EmptyList";
import CreatorTier from "@/components/CreatorTier";

function BrandContentGallery({ contentsGallery }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  const handleMouseEnter = (e) => {
    const vid = e.target;
    vid.muted = true;
    vid.play();
    vid.poster = vid.dataset.thumbnail;
  };

  const handleMouseLeave = (e) => {
    const vid = e.target;
    vid.muted = false;
    vid.currentTime = 0;
    vid.pause();
  };

  const renderAvgStar = (instruction, context, creation) => {
    const validScores = [instruction, context, creation].filter(
      (score) => typeof score === "number" && !isNaN(score)
    );

    if (validScores.length === 0) return 0; // Avoid division by zero

    return (
      validScores.reduce((sum, score) => sum + score, 0) / validScores.length
    ).toFixed(1);
  };
  function renderStars(score) {
    return [1, 2, 3, 4, 5].map((star, index) => (
      <span key={index} className="">
        <Image
          src={star <= score ? "/star.png" : "/empty-star.png"}
          alt="Star"
          width={28}
          height={28}
        />
      </span>
    ));
  }

  return (
    <div>
      {contentsGallery?.length === 0 ? (
        <EmptyList
          text="Контент хараахан ирээгүй байна"
          imageClassName="w-[149px] h-[153px]"
          image="/no-content-image.png"
        />
      ) : (
        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
          {contentsGallery ? (
            contentsGallery?.map((content, id) => {
              const avgScore = renderAvgStar(
                content?.BrandInstructionPnt || 0,
                content?.ContextPnt || 0,
                content?.CreationPnt || 0
              );
              return (
                <Dialog key={id}>
                  <DialogTrigger>
                    <div className="cursor-pointer z-0 col-span-1 relative w-full h-full aspect-[9/16] rounded-2xl">
                      <video
                        preload="metadata"
                        className="border-[1px] border-black/15 aspect-[9/16] w-full h-full rounded-2xl object-cover"
                        muted
                        loop
                        // onMouseEnter={handleMouseEnter}
                        // onMouseLeave={handleMouseLeave}
                        poster={content?.ContentThumbnail}
                      >
                        <source type="video/mp4" src={content?.ContentVideo} />
                      </video>
                      <div className="absolute z-10 w-full h-full top-0">
                        <button className="z-20 absolute top-3 right-3 p-2 rounded-lg bg-[#F5F4F0]">
                          <Image
                            src={"/expand-icon.png"}
                            width={24}
                            height={24}
                            alt="expand"
                            className="w-3 h-3 sm:w-6 sm:h-6"
                          />
                        </button>
                        <div className="absolute w-full bottom-3 sm:bottom-4 px-3 sm:px-4 object-bottom z-20 flex flex-col text-xs md:text-base text-white">
                          <div className="bg-black/20 w-full px-3 py-2 rounded-lg flex flex-col items-start">
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src={
                                  content?.CreatorProfileLink
                                    ? content?.CreatorProfileLink
                                    : "/dummy-creator.png"
                                }
                                width={20}
                                height={20}
                                className="rounded-full w-4 h-4 sm:w-5 sm:h-5"
                                alt=""
                              />
                              <span className="text-base sm:text-lg font-semibold">
                                {content?.Nickname
                                  ? content?.Nickname
                                  : "Geni Бүтээгч"}
                              </span>
                              <CreatorTier
                                tier={content?.LvlName}
                                isSwiper={false}
                              />
                            </div>
                            <span>{content?.ProductName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  {/* @ts-ignore */}
                  <DialogContent className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start gap-6 max-h-[739px] w-full sm:w-auto lg:w-full max-w-[1000px] rounded-3xl">
                    <div className="flex flex-col gap-4 w-full h-full sm:min-w-[272px]">
                      <span className="text-lg font-semibold">Контент</span>

                      <video
                        controls
                        className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                      >
                        <source src={content?.ContentVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    <div className="flex flex-col gap-4 w-full h-full sm:min-w-[272px]">
                      <span className="text-lg font-semibold">
                        Thumbnail зураг
                      </span>

                      <img
                        src={content?.ContentThumbnail}
                        alt=""
                        className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                      />
                    </div>

                    <div className="flex flex-col gap-4 h-full justify-between w-full">
                      <span className="text-lg font-semibold">Дэлгэрэнгүй</span>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                          <span className="text-base">Контентын тайлбар</span>
                          <span className="p-3 rounded-xl bg-[#F5F4F0] text-sm sm:text-base text-[#6F6F6F]">
                            {content?.Caption}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-base">
                            Контент бүтээгчид өгсөн үнэлгээ
                          </span>
                          <div className="flex flex-col gap-2">
                            <div className="border-[1px] border-[#000000] rounded-2xl bg-[#F5F4F0] p-5">
                              <div className="flex flex-col gap-2">
                                <span className="text-sm">
                                  Брэндийн өгсөн чиглүүлэгийн дагуу хийсэн эсэх
                                </span>
                                <div className="flex flex-row gap-[6px] items-center">
                                  {renderStars(content?.BrandInstructionPnt)}
                                </div>
                                <span className="text-sm">
                                  Контентын агуулга
                                </span>
                                <div className="flex flex-row gap-[6px] items-center">
                                  {renderStars(content?.ContextPnt)}
                                </div>
                                <span className="text-sm">
                                  Контентын хийцлэл
                                </span>
                                <div className="flex flex-row gap-[6px] items-center">
                                  {renderStars(content?.CreationPnt)}
                                </div>
                                <span className="text-sm">Дундаж үнэлгээ</span>
                                <div className="flex flex-row gap-[6px] items-center">
                                  {renderStars(avgScore)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-base">
                            Контентод үлдээсэн сэтгэгдэл
                          </span>
                          <span className="p-3 rounded-xl bg-[#F5F4F0] text-sm sm:text-base text-[#6F6F6F]">
                            {content.BrandComment}
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default BrandContentGallery;
