"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface PublicContentGalleryProps {
  contentsGallery: any[];
}

function PublicContentGallery({ contentsGallery }: PublicContentGalleryProps) {
  const renderAvgStar = (
    instruction: number,
    context: number,
    creation: number
  ) => {
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
    <>
      <div className="px-3 relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
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
                  <div className="cursor-pointer z-0 col-span-1 relative w-full h-full aspect-[9/16] rounded-2xl border">
                    <video
                      preload="metadata"
                      className="border-[1px] border-black/15 aspect-[9/16] w-full h-full rounded-2xl object-cover"
                      muted
                      loop
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
                              {content?.BrandName
                                ? content?.BrandName
                                : "Geni Бүтээгч"}
                            </span>
                          </div>
                          <span>{content?.ProductName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                {/* @ts-ignore */}
                <DialogContent className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start gap-6 max-h-[739px] w-full sm:w-auto lg:w-full max-w-[1000px] rounded-3xl">
                  <div className="flex flex-col gap-4 w-full h-full">
                    <span className="text-lg font-semibold">Контент</span>

                    <video
                      controls
                      className="aspect-[9/16] w-full h-full rounded-2xl"
                    >
                      <source src={content?.ContentVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="flex flex-col gap-4 w-full h-full">
                    <span className="text-lg font-semibold">
                      Thumbnail зураг
                    </span>

                    <img
                      src={content?.ContentThumbnail}
                      alt=""
                      className="aspect-[9/16] w-full h-full rounded-2xl border"
                    />
                  </div>

                  <div className="h-full justify-between w-full lg:mt-10">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2 sm:gap-5 border rounded-2xl bg-[#F5F4F0] p-5">
                        <div className="flex flex-col gap-2">
                          <span className="font-bold">
                            Брэндийн өгсөн оноо:
                          </span>
                          <div className="flex flex-row gap-[6px] items-center">
                            {renderStars(avgScore)}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-bold">Брэндийн сэтгэгдэл:</span>
                          <span className="text-sm sm:text-base">
                            {content.BrandComment} Wadada яасан хөөрхөнийн
                            😍😍😍😍 үнэхээр гоё болсон байна 💛🧡🤎
                          </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <Image
                            src={content?.BrandProfileLink}
                            alt=""
                            width={46}
                            height={46}
                            className="rounded-full border"
                          />
                          <div className="flex flex-col text-[#6F6F6F]">
                            <span className="text-base">
                              {content?.BrandName}
                            </span>
                            <span className="text-[11px]">12.04.2025</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-5 border rounded-2xl bg-[#F5F4F0] p-5">
                        <div className="flex flex-col gap-2">
                          <span className="font-bold">
                            Контент бүтээгчийн сэтгэгдэл::
                          </span>
                          <span className="text-sm sm:text-base">
                            {content.BrandComment} Wadada яасан хөөрхөнийн
                            😍😍😍😍 үнэхээр гоё болсон байна 💛🧡🤎
                          </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <Image
                            src={content?.BrandProfileLink}
                            alt=""
                            width={46}
                            height={46}
                            className="rounded-full border"
                          />
                          <div className="flex flex-col text-[#6F6F6F]">
                            <span className="text-base">Anudelger</span>
                            <span className="text-[11px]">12.04.2025</span>
                          </div>
                        </div>
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
    </>
  );
}

export default PublicContentGallery;
