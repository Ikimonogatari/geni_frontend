import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useBrandReceiveContentMutation,
  useGetImagePresignedUrlMutation,
  useGetVideoPresignedUrlMutation,
} from "../services/service";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import StatusIndicator from "../components/StatusIndicator";

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

  console.log(currentContents);

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
      console.log(getImagePresignedUrlData.url);
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
      Star: guidelineScore,
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
      <div className="min-w-[900px] sm:min-w-[1200px] mt-7 pt-3 px-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[3fr,2fr,2fr,4fr,2fr] gap-6 w-full items-center text-[#6F6F6F]">
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
          <span className="col-span-1">Үе шат</span>
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
            className="text-[10px] sm:text-base w-full grid grid-cols-[3fr,2fr,2fr,4fr,2fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
          >
            <span className="col-span-1">{p.ProductName}</span>
            <div className="col-span-1 flex flex-row items-center gap-3">
              <span>{p.FirstName}</span>
              <Image
                src={"/verified-icon.png"}
                width={24}
                height={24}
                alt="verified"
                className="w-4 h-4 sm:w-6 sm:h-6"
              />
            </div>
            <span className="col-span-1">{p.ContentPhase}</span>
            <StatusIndicator status={p.Status} />
            <div className="col-span-1">
              {p.Status === "ContentApproved" ? (
                <Dialog>
                  <DialogTrigger
                    onClick={() =>
                      handleDialogTrigger(
                        p.ContentThumbnailFileId,
                        p.ContentVideoFileId
                      )
                    }
                    type="submit"
                    className="bg-[#4D55F5] border-[1px] border-[#2D262D] whitespace-nowrap px-5 py-2 rounded-lg text-white font-bold"
                  >
                    Контент авах
                  </DialogTrigger>
                  <DialogContent className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start p-6 max-h-[739px] max-w-[1000px] w-full sm:w-auto lg:w-full rounded-3xl">
                    <div className="flex flex-col lg:flex-row gap-6 h-full">
                      <div className="flex flex-col gap-4 h-full">
                        <span className="text-base font-semibold">Контент</span>
                        {contentVideo ? (
                          <video
                            controls
                            className="aspect-[9/16] w-full h-full sm:max-w-[272px] rounded-2xl"
                          >
                            <source src={contentVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="flex flex-col gap-4 h-full">
                        <span className="text-base font-semibold">
                          Thumbnail зураг
                        </span>

                        {contentThumbnail ? (
                          <img
                            src={contentThumbnail}
                            alt=""
                            className="aspect-[9/16] w-full h-full sm:max-w-[272px] rounded-2xl"
                          />
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="flex flex-col justify-between gap-4">
                        <div className="w-full flex flex-row items-center justify-between">
                          <span className="text-base font-semibold">
                            Тайлбар
                          </span>
                          <button
                            className="p-2 bg-[#CA7FFE] rounded-xl hidden lg:block"
                            onClick={() => copyCaptionToClipboard(p.Caption)}
                          >
                            <Image
                              src={"/copy-button.png"}
                              alt=""
                              width={24}
                              height={24}
                              className="w-6 h-6"
                            />
                          </button>
                        </div>
                        <div className="w-full h-full flex flex-col justify-between">
                          <div className="flex flex-col gap-6">
                            <div className="flex flex-row items-start gap-2">
                              <span className="text-sm text-[#6F6F6F] p-3 bg-[#F5F4F0] rounded-xl">
                                {p.Caption}
                              </span>
                              <button
                                className="p-2 bg-[#CA7FFE] rounded-xl block lg:hidden"
                                onClick={() =>
                                  copyCaptionToClipboard(p.Caption)
                                }
                              >
                                <Image
                                  src={"/copy-button.png"}
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="min-w-4 min-h-4 sm:min-w-6 sm:min-h-6"
                                />
                              </button>
                            </div>
                            <div className="flex flex-col gap-2">
                              <span className="text-base font-semibold">
                                Та контент бүтээгчид оноо өгнө үү
                              </span>
                              <div className="border-[1px] border-[#000000] rounded-2xl bg-[#F5F4F0] p-5">
                                <div className="flex flex-col gap-2">
                                  <span className="text-sm">
                                    Брэндийн өгсөн чиглүүлэгийн дагуу хийсэн
                                    эсэх
                                  </span>
                                  <div className="flex flex-row gap-[6px] items-center">
                                    {renderStars(
                                      guidelineScore,
                                      setGuidelineScore,
                                      playSound
                                    )}
                                  </div>
                                  <span className="text-sm">
                                    Контентын агуулга
                                  </span>
                                  <div className="flex flex-row gap-[6px] items-center">
                                    {renderStars(
                                      conceptScore,
                                      setConceptScore,
                                      playSound
                                    )}
                                  </div>
                                  <span className="text-sm">
                                    Контентын хийцлэл
                                  </span>
                                  <div className="flex flex-row gap-[6px] items-center">
                                    {renderStars(
                                      qualityScore,
                                      setQualityScore,
                                      playSound
                                    )}
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <button
                                      onClick={() => setIsCommenting(true)}
                                      className="text-sm text-[#4D55F5] underline text-start"
                                    >
                                      Та контент бүтээгчид сэтгэгдэлээ үлдээнэ
                                      үү
                                    </button>
                                    {isCommenting ? (
                                      <textarea
                                        type="text"
                                        value={comment}
                                        onChange={(e) =>
                                          setComment(e.target.value)
                                        }
                                        className="text-sm p-3 h-[127px] w-full lg:max-w-[445px] bg-white outline-none border rounded-xl"
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {guidelineScore != 0 &&
                        qualityScore != 0 &&
                        conceptScore != 0 ? (
                          <button
                            onClick={() => handleContentReceive(p.ContentId)}
                            className="bg-[#4D55F5] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
                          >
                            Хүлээж авах
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentProgress;
