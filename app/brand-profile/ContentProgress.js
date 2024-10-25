import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useBrandReceiveContentMutation,
  useGetImagePresignedUrlMutation,
  useGetVideoPresignedUrlMutation,
} from "../services/service";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

function ContentProgress({ currentContents }) {
  const [contentThumbnail, setContentThumbnail] = useState(null);
  const [contentVideo, setContentVideo] = useState(null);
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");

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
      Point: score,
    });
  };
  const getColorClass = (status) => {
    switch (status) {
      case "Request":
        return "text-[#4D55F5]";
      case "ProdApproved":
        return "text-[#4FB755]";
      case "ProdRejected":
        return "text-[#F41919]";
      case "ProdDelivering":
        return "text-[#F49D19]";
      case "ContentInProgress":
        return "text-[#F49D19]";
      case "ContentInReview":
        return "text-[#4D55F5]";
      case "ContentSent":
        return "text-[#4FB755]";
      case "ContentRejected":
        return "text-[#F41919]";
      case "ContentReceived":
        return "text-[#4FB755]";
      default:
        return "text-[#4D55F5]";
    }
  };

  const getStatusImage = (status) => {
    switch (status) {
      case "ProdDelivering":
        return "/stage-icon1.png";
      case "ContentInProgress":
        return "/stage-icon2.png";
      case "ContentInReview":
        return "/stage-icon3.png";
      case "ContentSent":
        return "/stage-icon4.png";
      default:
        return "/stage-icon1.png"; // Default to the first image if status doesn't match
    }
  };

  const getStatusName = (status) => {
    switch (status) {
      case "Request":
        return "Хүсэлт илгээгдсэн";
      case "ProdApproved":
        return "Geni-гээс зөвшөөрсөн";
      case "ProdRejected":
        return "Geni-гээс зөвшөөрөгдөөгүй";
      case "ProdDelivering":
        return "Бүтээгдэхүүн хүргэж байна";
      case "ContentInProgress":
        return "Контент хүлээгдэж байна";
      case "ContentInReview":
        return "Geni шалгаж байна";
      case "ContentSent":
        return "Контент илгээсэн";
      case "ContentRejected":
        return "Контент буцаагдсан";
      case "ContentApproved":
        return "Контент зөвшөөрөгдсөн";
      case "ContentReceived":
        return "Контент хүлээн авсан";
      default:
        return status;
    }
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
            <span className="col-span-1">{p.Status}/5</span>
            <div
              className={`${getColorClass(
                p.Status
              )} col-span-1 flex flex-row items-center gap-3`}
            >
              <Image
                src={getStatusImage(p.Status)}
                width={24}
                height={24}
                alt=""
                className="w-4 h-4 sm:w-6 sm:h-6"
              />
              <span className="">{getStatusName(p.Status)}</span>
            </div>
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
                        <span className="text-lg font-semibold">Контент</span>
                        {contentVideo ? (
                          <video
                            controls
                            className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                          >
                            <source src={contentVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="flex flex-col gap-4 h-full">
                        <span className="text-lg font-semibold">
                          Thumbnail зураг
                        </span>

                        {contentThumbnail ? (
                          <img
                            src={contentThumbnail}
                            alt=""
                            className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                          />
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="flex flex-col justify-between gap-4">
                        <span className="text-lg font-semibold">Тайлбар</span>
                        <div className="w-full h-full flex flex-col justify-between">
                          <div className="flex flex-col gap-6">
                            <span className="text-sm text-[#6F6F6F] p-3 bg-[#F5F4F0] rounded-xl">
                              {p.Caption}
                            </span>
                            <div className="flex flex-col gap-2">
                              <span className="text-sm">
                                Та контент бүтээгчид оноо өгнө үү
                              </span>
                              <div className="flex flex-row items-center gap-[6px]">
                                {scores.map((s, i) => (
                                  <span
                                    onClick={() => setScore(s)}
                                    key={i}
                                    className={`transition-all duration-150 cursor-pointer py-2 px-4 ${
                                      score == s
                                        ? "bg-[#4FB755] text-white border-[1px] border-white"
                                        : "bg-none text-[#CDCDCD] border-[#CDCDCD] border-[1px]"
                                    } text-sm rounded-xl`}
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <span className="text-sm">
                                Та контент бүтээгчид сэтгэгдэлээ үлдээнэ үү
                              </span>
                              <textarea
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="text-sm p-3 h-[127px] w-full lg:max-w-[445px] bg-[#F5F4F0] outline-none border rounded-xl"
                              />
                            </div>
                          </div>
                        </div>
                        {comment && score ? (
                          <button
                            onClick={() => handleContentReceive(p.ContentId)}
                            className="bg-[#4D55F5] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
                          >
                            Хүлээж авлаа
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

const scores = ["20", "40", "60", "80", "100"];
