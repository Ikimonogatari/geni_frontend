"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetPublicProfileContentGalleryByIdQuery } from "@/app/services/service";
import { useDateFormatter } from "@/app/hooks/useDateFormatter";
import { ClipLoader } from "react-spinners";
import VideoPlayer from "@/components/common/VideoPlayer";

interface PublicContentGalleryProps {
  contentsGallery: any[];
  profileType: string;
  onCreditPurchase?: () => void;
}

function PublicContentGallery({
  contentsGallery,
  profileType,
  onCreditPurchase,
}: PublicContentGalleryProps) {
  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dateFormatter = useDateFormatter();
  const {
    data: contentData,
    isLoading: contentLoading,
    error: contentError,
  } = useGetPublicProfileContentGalleryByIdQuery(selectedContentId, {
    skip: !isDialogOpen || !selectedContentId,
  });

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

  const handleOpenDialog = (contentId: string) => {
    setSelectedContentId(contentId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedContentId(null);
    contentData.CreatorReview = null;
    contentData.CreatorReviewedAt = null;
  };

  // Handle credit purchase
  const handleCreditPurchase = () => {
    if (onCreditPurchase) {
      onCreditPurchase();
    }
  };

  return (
    <>
      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
        {contentsGallery ? (
          contentsGallery?.map((content, id) => (
            <Dialog
              key={id}
              onOpenChange={(open) => {
                if (open) {
                  handleOpenDialog(content?.ContentId);
                } else {
                  handleCloseDialog();
                }
              }}
              open={isDialogOpen && selectedContentId === content?.ContentId}
            >
              <DialogTrigger>
                <div className="cursor-pointer z-0 col-span-1 relative w-full h-full aspect-[9/16] rounded-2xl border">
                  <VideoPlayer
                    src={content?.ContentVideo}
                    poster={content?.ContentThumbnail}
                    preload="metadata"
                    className="border-[1px] border-black/15 aspect-[9/16] w-full h-full rounded-2xl object-cover"
                    muted={true}
                    loop={true}
                    controls={false}
                  />
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
                            className="rounded-full min-w-6 min-h-6 sm:min-w-8 sm:min-h-8 object-cover aspect-square"
                            alt=""
                          />
                          <span className="text-sm sm:text-base font-semibold text-start">
                            {content?.CreatorName
                              ? content?.CreatorName
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

                  <VideoPlayer
                    src={content?.ContentVideo}
                    controls={true}
                    className="aspect-[9/16] w-full h-full rounded-2xl"
                  />
                </div>

                <div className="flex flex-col gap-4 w-full h-full">
                  <span className="text-lg font-semibold">Thumbnail зураг</span>

                  <img
                    src={content?.ContentThumbnail}
                    alt=""
                    className="aspect-[9/16] w-full h-full rounded-2xl border object-cover"
                  />
                </div>

                <div className="h-full justify-between w-full lg:mt-10">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 sm:gap-5 border rounded-2xl bg-[#F5F4F0] p-5">
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">Брэндийн өгсөн оноо:</span>
                        <div className="flex flex-row gap-[6px] items-center">
                          {renderStars(contentData?.AvgStar)}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">Брэндийн сэтгэгдэл:</span>
                        <span className="text-sm sm:text-base">
                          {content?.BrandComment}
                        </span>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <Image
                          src={content?.BrandProfileLink}
                          alt=""
                          width={46}
                          height={46}
                          className="rounded-full border object-cover"
                        />
                        <div className="flex flex-col text-[#6F6F6F]">
                          <span className="text-base">
                            {contentData?.BrandName || content?.BrandName}
                          </span>
                          <span className="text-[11px]">
                            {dateFormatter.formatDate(
                              contentData?.BrandCommentedAt
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-5 border rounded-2xl bg-[#F5F4F0] p-5">
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">
                          Контент бүтээгчийн сэтгэгдэл:
                        </span>
                        <span className="text-sm sm:text-base">
                          {contentData?.CreatorReview}
                        </span>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <Image
                          src={
                            content?.CreatorProfileLink
                              ? content?.CreatorProfileLink
                              : "/dummy-creator.png"
                          }
                          alt=""
                          width={46}
                          height={46}
                          className="rounded-full border aspect-square object-cover"
                        />
                        <div className="flex flex-col text-[#6F6F6F]">
                          <span className="text-base">
                            {contentData?.CreatorName || "Anudelger"}
                          </span>
                          <span className="text-[11px]">
                            {dateFormatter.formatDate(
                              contentData?.CreatorReviewedAt
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default PublicContentGallery;
