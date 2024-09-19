import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useCreatorContentSubmitMutation,
  useGetImagePresignedUrlMutation,
  useGetVideoPresignedUrlMutation,
  useUpdateContentStatusMutation,
  useUploadByPresignUrlMutation,
} from "../services/service";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";

function ContentProgress({ currentContents }) {
  console.log(currentContents);
  const [contentThumbnail, setContentThumbnail] = useState(null);
  const [contentVideo, setContentVideo] = useState(null);
  const [contentVideoId, setContentVideoId] = useState(null);
  const [contentThumbnailId, setContentThumbnailId] = useState(null);
  const [caption, setCaption] = useState("");
  const [resubmitting, setIsResubmitting] = useState(false);
  const [isContentSuccess, setIsContentSuccess] = useState(false);
  const userInfo = Cookies.get("user-info");
  console.log(userInfo ? userInfo : "");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  console.log(parsedUserInfo);
  const [
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
    },
  ] = useUploadByPresignUrlMutation();

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

  const [
    creatorContentSubmit,
    {
      data: creatorContentSubmitData,
      error: creatorContentSubmitError,
      isLoading: creatorContentSubmitLoading,
      isSuccess: creatorContentSubmitSuccess,
    },
  ] = useCreatorContentSubmitMutation();

  const [
    updateContentStatus,
    {
      data: updateContentStatusData,
      error: updateContentStatusError,
      isLoading: updateContentStatusLoading,
    },
  ] = useUpdateContentStatusMutation();

  useEffect(() => {
    if (updateContentStatusError) {
      toast.error("Алдаа гарлаа");
    }
    if (updateContentStatusData) {
      toast.success("Амжилттай");
    }
  }, [updateContentStatusData, updateContentStatusError]);

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
      console.log(getVideoPresignedUrlData.url);
      setContentVideo(getVideoPresignedUrlData.url);
    }
  }, [getVideoPresignedUrlData, getVideoPresignedUrlError]);

  useEffect(() => {
    if (creatorContentSubmitError) {
      toast.error("Алдаа гарлаа");
    }
    if (creatorContentSubmitSuccess) {
      setIsContentSuccess(true);
    }
  }, [creatorContentSubmitData, creatorContentSubmitError]);

  const handleContentSubmit = (contentId) => {
    creatorContentSubmit({
      ContentId: contentId,
      Caption: caption,
      ContentThumbnailFileId: contentThumbnailId,
      ContentVideoFileId: contentVideoId,
    });
  };

  const handleUpdateContentStatus = (contentId, status) => {
    updateContentStatus({
      ContentId: contentId,
      Status: status,
    });
  };

  const {
    getRootProps: getRootPropsForImage,
    getInputProps: getInputPropsForImage,
  } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        uploadFile({ FolderName: "content-thumbnail" })
          .then((response) => {
            if (response.data) {
              const { fileId, uploadURL } = response.data;
              setContentThumbnailId(fileId);
              uploadToS3(uploadURL, file).then(() => {
                getImagePresignedUrl({
                  FileId: fileId,
                });
              });
            }
          })
          .catch(() => {
            toast.error("Thumbnail upload failed");
          });
      }
    },
  });

  const {
    getRootProps: getRootPropsForVideo,
    getInputProps: getInputPropsForVideo,
  } = useDropzone({
    accept: { "video/mp4": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        uploadFile({ FolderName: "content-video" })
          .then((response) => {
            if (response.data) {
              const { fileId, uploadURL } = response.data;
              setContentVideoId(fileId);
              uploadToS3(uploadURL, file).then(() => {
                getVideoPresignedUrl({
                  FileId: fileId,
                });
              });
            }
          })
          .catch(() => {
            toast.error("Video upload failed");
          });
      }
    },
  });

  const uploadToS3 = async (url, file) => {
    console.log(url);
    console.log(file);

    try {
      const response = await axios.put(url, file, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (response.status == 200) {
        console.log(response);
      } else {
        throw new Error(`HTTP error! status: ${response}`);
      }
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (uploadFileError) {
      toast.error("Файл оруулахад алдаа гарлаа");
    }
  }, [uploadFileData, uploadFileError]);

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
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] sm:min-w-[1200px] mt-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
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
          <span className="col-span-1">Брэнд</span>
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
            <span className="col-span-1">{p.BrandName}</span>
            <span className="col-span-1">{p.ContentPhase}</span>
            <div
              className={`${getColorClass(
                p.Status
              )} col-span-1 flex flex-row items-center gap-[6px]`}
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
              {p.Status === "ProdApproved" ? (
                <button
                  onClick={() =>
                    handleUpdateContentStatus(p.ContentId, "ContentInProgress")
                  }
                  className="bg-[#4D55F5] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
                >
                  Хүлээж авсан
                </button>
              ) : null}
              {p.Status === "ContentRejected" ? (
                <Dialog>
                  <DialogTrigger
                    type="submit"
                    className="bg-[#F49D19] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
                  >
                    Дэлгэрэнгүй
                  </DialogTrigger>
                  {!resubmitting ? (
                    <DialogContent className="overflow-y-auto flex flex-col p-6 h-full max-h-[739px] max-w-[577px]">
                      <span className="text-3xl font-bold">Зөвлөгөө</span>
                      <div className="mt-4 flex flex-col gap-3">
                        <div className="flex flex-row items-center gap-6 p-5 bg-[#F5F4F0] rounded-3xl">
                          <div className="rounded-full w-3 h-3 bg-[#D9D9D9]"></div>
                          <span>Ёс бус хэллэг агуулагдсан байна.</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsResubmitting(true)}
                        className="mt-auto w-full py-4 text-white font-semibold bg-[#CA7FFE] text-2xl border border-[#2D262D] rounded-2xl"
                      >
                        Дахин илгээх
                      </button>
                    </DialogContent>
                  ) : (
                    <DialogContent className="overflow-y-auto flex flex-col p-6 max-h-[739px] max-w-[1000px]">
                      <span className="text-3xl font-bold">Контент илгээх</span>
                      <div className="w-full flex flex-col lg:flex-row gap-6">
                        <div className="w-full flex flex-col gap-4">
                          <span className="text-lg">Контент</span>

                          {contentVideo ? (
                            <video
                              controls
                              className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                            >
                              <source src={contentVideo} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : getVideoPresignedUrlLoading ? (
                            <div className="bg-[#F5F4F0] aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl flex justify-center items-center">
                              <ClipLoader
                                loading={getVideoPresignedUrlLoading}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                                size={50}
                              />
                            </div>
                          ) : (
                            <div
                              {...getRootPropsForVideo()}
                              className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl bg-[#F5F4F0]"
                            >
                              <input {...getInputPropsForVideo()} />

                              <div className="bg-[#F5F4F0] cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
                                <Image
                                  src={"/add-product-button.png"}
                                  width={54}
                                  height={54}
                                  alt=""
                                  className="w-[54px] h-[54px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="w-full flex flex-col gap-4">
                          <span className="text-lg">Thumbnail зураг</span>
                          {contentThumbnail ? (
                            <img
                              src={contentThumbnail}
                              alt=""
                              className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                            />
                          ) : getImagePresignedUrlLoading ? (
                            <div className="bg-[#F5F4F0] aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl flex justify-center items-center">
                              <ClipLoader
                                loading={getImagePresignedUrlLoading}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                                size={50}
                              />
                            </div>
                          ) : (
                            <div
                              {...getRootPropsForImage()}
                              className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                            >
                              <input {...getInputPropsForImage()} />

                              <div className="bg-[#F5F4F0] cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
                                <Image
                                  src={"/add-product-button.png"}
                                  width={54}
                                  height={54}
                                  alt=""
                                  className="w-[54px] h-[54px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="w-full flex flex-col h-full justify-between">
                          <div className="flex flex-col gap-4">
                            <span className="text-lg">Тайлбар</span>
                            <textarea
                              type="text"
                              value={caption}
                              onChange={(e) => setCaption(e.target.value)}
                              placeholder="Бүтээгдэхүүн үйлчилгээний талаарх хэрэглэгчийн сэтгэгдэл болон контентоор хуваалцахыг хүссэн зүйлээ тайлбарлан бичээрэй. Таны энэхүү бичвэрийг brand контент оруулахдаа ашиглах боломжтой."
                              className="p-2 min-h-[200px] w-full border border-gray-300 rounded-md"
                            />
                          </div>
                          {contentThumbnail && contentVideo && caption ? (
                            <button
                              onClick={() => handleContentSubmit(p.ContentId)}
                              className="mt-6 bg-[#4FB755] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
                            >
                              Илгээх
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              ) : (
                <></>
              )}
              {p.Status === "ContentInProgress" ? (
                <Dialog>
                  <DialogTrigger
                    type="submit"
                    className="bg-[#CA7FFE] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
                  >
                    Контент илгээх
                  </DialogTrigger>
                  <DialogContent className="overflow-y-auto flex flex-col p-6 max-h-[739px] max-w-[1000px]">
                    <span className="text-3xl font-bold">Контент илгээх</span>
                    <div className="w-full flex flex-col lg:flex-row gap-6">
                      <div className="w-full flex flex-col gap-4">
                        <span className="text-lg">Контент</span>

                        {contentVideo ? (
                          <video
                            controls
                            className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                          >
                            <source src={contentVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : getVideoPresignedUrlLoading ? (
                          <div className="bg-[#F5F4F0] aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl flex justify-center items-center">
                            <ClipLoader
                              loading={getVideoPresignedUrlLoading}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                              className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                              size={50}
                            />
                          </div>
                        ) : (
                          <div
                            {...getRootPropsForVideo()}
                            className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl bg-[#F5F4F0]"
                          >
                            <input {...getInputPropsForVideo()} />

                            <div className="bg-[#F5F4F0] cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
                              <Image
                                src={"/add-product-button.png"}
                                width={54}
                                height={54}
                                alt=""
                                className="w-[54px] h-[54px]"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="w-full flex flex-col gap-4">
                        <span className="text-lg">Thumbnail зураг</span>
                        {contentThumbnail ? (
                          <img
                            src={contentThumbnail}
                            alt=""
                            className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                          />
                        ) : getImagePresignedUrlLoading ? (
                          <div className="bg-[#F5F4F0] aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl flex justify-center items-center">
                            <ClipLoader
                              loading={getImagePresignedUrlLoading}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                              className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                              size={50}
                            />
                          </div>
                        ) : (
                          <div
                            {...getRootPropsForImage()}
                            className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                          >
                            <input {...getInputPropsForImage()} />

                            <div className="bg-[#F5F4F0] cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
                              <Image
                                src={"/add-product-button.png"}
                                width={54}
                                height={54}
                                alt=""
                                className="w-[54px] h-[54px]"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="w-full flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-4">
                          <span className="text-lg">Тайлбар</span>
                          <textarea
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Бүтээгдэхүүн үйлчилгээний талаарх хэрэглэгчийн сэтгэгдэл болон контентоор хуваалцахыг хүссэн зүйлээ тайлбарлан бичээрэй. Таны энэхүү бичвэрийг brand контент оруулахдаа ашиглах боломжтой."
                            className="p-2 min-h-[200px] w-full border border-gray-300 rounded-md"
                          />
                        </div>
                        {contentThumbnail && contentVideo && caption ? (
                          <button
                            onClick={() => handleContentSubmit(p.ContentId)}
                            className="mt-6 bg-[#4FB755] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
                          >
                            Илгээх
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : null}

              {creatorContentSubmitSuccess ? (
                <Dialog open={isContentSuccess}>
                  <DialogContent className="max-w-lg flex flex-col items-center gap-2">
                    <span className="text-[#4FB755] uppercase text-4xl sm:text-5xl text-center font-bold">
                      контент илгээгдлээ
                    </span>
                    <Image
                      src={"/content-sent.png"}
                      width={209}
                      height={220}
                      alt="recieved"
                    />

                    <div className="w-full flex flex-col gap-5">
                      <div className="w-full flex flex-row justify-between items-start bg-[#F5F4F0] rounded-3xl p-4 sm:p-5">
                        <div className="w-full flex flex-row items-center gap-5">
                          {parsedUserInfo ? (
                            <Image
                              src={
                                parsedUserInfo.ProfileLink
                                  ? parsedUserInfo?.ProfileLink
                                  : "/dummy-profile.jpg"
                              }
                              width={128}
                              height={128}
                              alt=""
                              className="w-[100px] h-[100px] aspect-square sm:w-[128px] sm:h-[128px] rounded-2xl"
                            />
                          ) : (
                            <></>
                          )}

                          <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex flex-row items-center gap-3">
                              <span className="font-bold text-xl">
                                {parsedUserInfo?.FirstName}
                                {parsedUserInfo?.Name}
                              </span>
                              <Image
                                src={"/verified-icon.png"}
                                width={24}
                                height={24}
                                alt="verified"
                                className="w-6 h-6"
                              />
                            </div>

                            <span className="text-lg">
                              {parsedUserInfo ? parsedUserInfo?.Point : 0}
                              xp
                            </span>
                          </div>
                        </div>
                      </div>

                      <DialogClose>
                        <button
                          onClick={() => setIsContentSuccess(false)}
                          className="w-full py-4 text-white font-semibold bg-[#CA7FFE] text-2xl border border-[#2D262D] rounded-2xl"
                        >
                          Баярлалаа
                        </button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <></>
              )}
              {p.Status === "ContentReceived" ? (
                <Dialog>
                  <DialogTrigger
                    type="submit"
                    className="bg-[#4D55F5] whitespace-nowrap border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
                  >
                    Сэтгэгдэл харах
                  </DialogTrigger>
                  <DialogContent className="overflow-y-auto max-w-lg flex flex-col">
                    <span className="text-3xl font-bold">
                      Брэндийн сэтгэгдэл
                    </span>
                    <div className="mt-10 flex flex-row items-center gap-4">
                      <Image
                        src={p.BrandPic ? p.BrandPic : "/dummy-brand.png"}
                        width={84}
                        height={84}
                        className="w-[84px] h-[84px] aspect-square rounded-full border border-[#2D262D]"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-lg font-bold">{p.BrandName}</span>
                        <div className="bg-[#CA7FFE] text-white text-center text-xs rounded-3xl px-4 py-2">
                          {p.BrandType}
                        </div>
                      </div>
                    </div>
                    <span className="mt-5">Танд өгсөн оноо</span>
                    <div className="flex gap-2">
                      {[20, 40, 60, 80, 100].map((point, i) => (
                        <div
                          key={i}
                          className={`py-2 px-5 text-sm rounded-xl ${
                            p.BrandGivenPoint === point
                              ? "bg-[#4FB755] border-[#4FB755] border text-white"
                              : "bg-transparent border-[#CDCDCD] border text-[#CDCDCD]"
                          }`}
                        >
                          {point}
                        </div>
                      ))}
                    </div>

                    <span className="py-1 px-3 text-sm bg-[#FFD28F] rounded-3xl w-fit">
                      {getRatingWord(p.BrandGivePoints)}
                    </span>

                    <span>Танд өгсөн сэтгэгдэл</span>
                    <span className="bg-[#F5F4F0] p-4 rounded-2xl min-h-[127px] overflow-y-auto">
                      {p.BrandComment}
                    </span>
                  </DialogContent>
                </Dialog>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentProgress;
