import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useBrandReceiveContentMutation,
  useGetImagePresignedUrlMutation,
  useGetVideoPresignedUrlMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StatusIndicator from "@/components/StatusIndicator";
import EmptyList from "@/components/common/EmptyList";
import ContentReceiveModal from "./ContentReceiveModal";
import CreatorTier from "@/components/CreatorTier";
import ContentProgressModalContent from "@/components/content-progress/ContentProgressModal";

function renderStars(score, setScore, playSound) {
  return [1, 2, 3, 4, 5].map((star, index) => (
    <span
      key={index}
      onClick={() => {
        setScore(star);
        playSound();
      }}
      className="cursor-pointer"
    >
      <Image
        src={star <= score ? "/star.png" : "/empty-star.png"}
        alt="Star"
        width={28}
        height={28}
      />
    </span>
  ));
}

function ContentProgress({ currentContents }) {
  const [contentThumbnail, setContentThumbnail] = useState(null);
  const [contentVideo, setContentVideo] = useState(null);
  const [qualityScore, setQualityScore] = useState(null);
  const [guidelineScore, setGuidelineScore] = useState(null);
  const [conceptScore, setConceptScore] = useState(null);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const [
    getImagePresignedUrl,
    {
      data: getImagePresignedUrlData,
      error: getImagePresignedUrlError,
      isLoading: getImagePresignedUrlLoading,
    },
  ] = useGetImagePresignedUrlMutation();

  const [
    getVideoPresignedUrl,
    {
      data: getVideoPresignedUrlData,
      error: getVideoPresignedUrlError,
      isLoading: getVideoPresignedUrlLoading,
    },
  ] = useGetVideoPresignedUrlMutation();

  useEffect(() => {
    if (getImagePresignedUrlError) {
    }
    if (getImagePresignedUrlData) {
      setContentThumbnail(getImagePresignedUrlData.url);
    }
  }, [getImagePresignedUrlData, getVideoPresignedUrlError]);

  useEffect(() => {
    if (getVideoPresignedUrlError) {
    }
    if (getVideoPresignedUrlData) {
      setContentVideo(getVideoPresignedUrlData.url);
    }
  }, [getVideoPresignedUrlData, getVideoPresignedUrlError]);

  const [
    brandReceiveContent,
    {
      data: brandReceiveContentData,
      error: brandReceiveContentError,
      isLoading: brandReceiveContentLoading,
      isSuccess: brandReceiveContentSuccess,
    },
  ] = useBrandReceiveContentMutation();

  useEffect(() => {
    if (brandReceiveContentError) {
      //@ts-ignore
      toast.error(brandReceiveContentError?.data?.error);
    }
    if (brandReceiveContentSuccess) {
      toast.success("Амжилттай");
    }
  }, [brandReceiveContentSuccess, brandReceiveContentError]);

  const handleDialogTrigger = (thumbnailId, contentId) => {
    getImagePresignedUrl({ FileId: thumbnailId });
    getVideoPresignedUrl({ FileId: contentId });
  };

  const handleContentReceive = (contentId) => {
    brandReceiveContent({
      ContentId: contentId,
      Comment: comment,
      InstructionStar: guidelineScore,
      ContextStar: conceptScore,
      CreationStar: qualityScore,
    });
  };

  const playSound = () => {
    const audio = new Audio("/star-sound.mp3");
    audio.play();
  };

  const copyCaptionToClipboard = (caption) => {
    navigator.clipboard
      .writeText(caption)
      .then(() => {
        toast.success("Тайлбарыг хууллаа!");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
        toast.error("Тайлбарыг хуулж чадсангүй!");
      });
  };

  return (
    <div className="w-full overflow-x-auto">
      {currentContents?.length === 0 ? (
        <EmptyList
          text="Хамтрал хараахан хийгдээгүй байна"
          image="/no-content-status-image.png"
          imageClassName="w-[212px] h-[154px]"
        />
      ) : (
        <div className="min-w-[900px] sm:min-w-[1200px] mt-7 pt-3 px-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
          <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[3fr,3fr,4fr,1fr] gap-6 w-full items-center text-[#6F6F6F]">
            <div className="col-span-1 flex flex-row items-center justify-between">
              <span className="">Бүтээгдэхүүн</span>

              <Image
                src={"/brand-profile-arrow-icon.png"}
                width={24}
                height={24}
                alt="arrow"
              />
            </div>
            <span className="col-span-1">Бүтээгч</span>
            <div className="col-span-1 flex flex-row items-center justify-between">
              <span>Статус</span>
              <Image
                src={"/brand-profile-arrow-icon.png"}
                width={24}
                height={24}
                alt="arrow"
              />
            </div>
            <span className="col-span-1">Үйлдэл</span>
          </div>
          {currentContents.map((p, i) => (
            <div
              key={i}
              className="text-[10px] sm:text-base w-full grid grid-cols-[3fr,3fr,4fr,1fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
            >
              <span className="col-span-1">{p.ProductName}</span>
              <div className="col-span-1 flex flex-row items-center gap-3">
                <a
                  className="hover:underline"
                  href={`/public-profile/${p?.CreatorId}`}
                >
                  {p.Nickname ? p.Nickname : "Geni бүтээгч"}
                </a>
                <CreatorTier tier={p?.LevelName} />
              </div>
              {/* <span className="col-span-1">{p.ContentPhase}</span> */}
              <StatusIndicator
                status={
                  p.Status === null || p.Status === ""
                    ? p.CurrentStepName.String
                    : p.Status
                }
              />
              <div className="col-span-1 flex justify-end">
                {p.Status === null || p.Status === "" ? (
                  <ContentProgressModalContent content={p} />
                ) : p.Status === "ContentApproved" ? (
                  <ContentReceiveModal
                    contentVideoFileId={p.ContentVideoFileId}
                    contentThumbnailFileId={p.ContentThumbnailFileId}
                    caption={p.Caption}
                    handleDialogTrigger={handleDialogTrigger}
                    contentVideo={contentVideo}
                    contentThumbnail={contentThumbnail}
                    handleContentReceive={handleContentReceive}
                    copyCaptionToClipboard={copyCaptionToClipboard}
                    guidelineScore={guidelineScore}
                    setGuidelineScore={setGuidelineScore}
                    conceptScore={conceptScore}
                    setConceptScore={setConceptScore}
                    qualityScore={qualityScore}
                    setQualityScore={setQualityScore}
                    isCommenting={isCommenting}
                    setIsCommenting={setIsCommenting}
                    comment={comment}
                    setComment={setComment}
                    renderStars={renderStars}
                    playSound={playSound}
                    p={p}
                  />
                ) : (
                  <></>
                )}
                <ContentProgressModalContent content={p} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContentProgress;
