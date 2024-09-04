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
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import axios from "axios";

function ContentProgress({ currentContents }) {
  const [contentThumbnail, setContentThumbnail] = useState(null);
  const [contentVideo, setContentVideo] = useState(null);
  const [contentVideoId, setContentVideoId] = useState(null);
  const [contentThumbnailId, setContentThumbnailId] = useState(null);
  const [caption, setCaption] = useState("");

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
      isLoading: creatorContentLoading,
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
    if (creatorContentSubmitData) {
      toast.success("Амжилттай");
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
    accept: "image/*",
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
    accept: "video/mp4",
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

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1068px] mt-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
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
            className="text-[10px] sm:text-base w-full grid grid-cols-[3fr,2fr,2fr,4fr,2fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-[1px] rounded-3xl"
          >
            <span className="col-span-1">{p.ProductName}</span>
            <span className="col-span-1">{p.BrandName}</span>
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
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex flex-col gap-4">
                        <span className="text-lg">Контент</span>
                        <div
                          {...getRootPropsForVideo()}
                          className="w-full min-w-[300px] h-[200px] lg:h-[484px] lg:w-[272px]"
                        >
                          <input {...getInputPropsForVideo()} />

                          {contentVideo ? (
                            <video controls className="w-full h-full lg:h-auto">
                              <source src={contentVideo} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <div className="bg-[#F5F4F0] cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
                              <Image
                                src={"/add-product-button.png"}
                                width={54}
                                height={54}
                                alt=""
                                className="w-[54px] h-[54px]"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <span className="text-lg">Thumbnail зураг</span>
                        <div
                          {...getRootPropsForImage()}
                          className="w-full min-w-[300px] h-[200px] lg:h-[484px] lg:w-[272px]"
                        >
                          <input {...getInputPropsForImage()} />
                          {contentThumbnail ? (
                            <img
                              src={contentThumbnail}
                              alt="Thumbnail Preview"
                              className="w-full h-auto"
                            />
                          ) : (
                            <div className="bg-[#F5F4F0] cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
                              <Image
                                src={"/add-product-button.png"}
                                width={54}
                                height={54}
                                alt=""
                                className="w-[54px] h-[54px]"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-4">
                          <span className="text-lg">Тайлбар</span>
                          <textarea
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Бүтээгдэхүүн үйлчилгээний талаарх хэрэглэгчийн сэтгэгдэл болон контентоор хуваалцахыг хүссэн зүйлээ тайлбарлан бичээрэй. Таны энэхүү бичвэрийг brand контент оруулахдаа ашиглах боломжтой."
                            className="p-2 h-[112px] w-full lg:w-[272px] border border-gray-300 rounded-md"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentProgress;
