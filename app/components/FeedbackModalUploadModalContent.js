"use client";
import React, { useEffect, useState } from "react";
import { DialogContent } from "./ui/dialog";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  useGetImagePresignedUrlMutation,
  useGetVideoPresignedUrlMutation,
  useUploadByPresignUrlMutation,
  useUploadHomeworkMutation,
  useCreatorContentSubmitMutation,
} from "../services/service";
import toast from "react-hot-toast";
import UploadSuccessModal from "./UploadSuccessModal";

function FeedbackModalUploadModalContent({ parsedUserInfo, contentId }) {
  console.log(parsedUserInfo);
  const [contentThumbnail, setContentThumbnail] = useState(null);
  const [contentVideo, setContentVideo] = useState(null);
  const [isHomeworkUploadSuccess, setIsHomeworkUploadSuccess] = useState(false);
  const [isContentSuccess, setIsContentSuccess] = useState(false);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);
  const [isVideoUploadLoading, setIsVideoUploadLoading] = useState(false);
  const [contentVideoId, setContentVideoId] = useState(null);
  const [contentThumbnailId, setContentThumbnailId] = useState(null);
  const [caption, setCaption] = useState("");

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
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
    },
  ] = useUploadByPresignUrlMutation();

  const [
    uploadHomework,
    {
      data: uploadHomeworkData,
      error: uploadHomeworkError,
      isLoading: uploadHomeworkLoading,
      isSuccess,
    },
  ] = useUploadHomeworkMutation();

  const [
    creatorContentSubmit,
    {
      data: creatorContentSubmitData,
      error: creatorContentSubmitError,
      isLoading: creatorContentSubmitLoading,
      isSuccess: creatorContentSubmitSuccess,
    },
  ] = useCreatorContentSubmitMutation();

  useEffect(() => {
    if (getImagePresignedUrlError) {
      toast.error(getImagePresignedUrlError?.data?.error);
      setIsImageUploadLoading(false);
    }
    if (getImagePresignedUrlData) {
      setIsImageUploadLoading(false);

      setContentThumbnail(getImagePresignedUrlData.url);
      console.log(getImagePresignedUrlData.url);
    }
  }, [getImagePresignedUrlData, getVideoPresignedUrlError]);

  useEffect(() => {
    if (getVideoPresignedUrlError) {
      toast.error(getVideoPresignedUrlError?.data?.error);
      setIsVideoUploadLoading(false);
    }
    if (getVideoPresignedUrlData) {
      console.log(getVideoPresignedUrlData.url);
      setIsVideoUploadLoading(false);
      setContentVideo(getVideoPresignedUrlData.url);
    }
  }, [getVideoPresignedUrlData, getVideoPresignedUrlError]);

  useEffect(() => {
    if (uploadHomeworkError) {
      toast.error(uploadHomeworkError?.data.error);
    }
    if (isSuccess) {
      setIsHomeworkUploadSuccess(true);
    }
  }, [uploadHomeworkData, uploadHomeworkError]);

  useEffect(() => {
    if (creatorContentSubmitError) {
      toast.error(creatorContentSubmitError?.data.error);
    }
    if (creatorContentSubmitSuccess) {
      setIsContentSuccess(true);
    }
  }, [creatorContentSubmitSuccess, creatorContentSubmitError]);

  useEffect(() => {
    if (uploadFileError) {
      toast.error(uploadFileError?.data?.error);
      setIsVideoUploadLoading(false);
      setIsImageUploadLoading(false);
    }
  }, [uploadFileData, uploadFileError]);
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
        setIsImageUploadLoading(true);
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
    accept: {
      "video/mp4": [".mp4"],
      "video/avi": [".avi"],
      "video/mov": [".mov"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setIsVideoUploadLoading(true);
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
  const handleContentSubmit = () => {
    console.log("handling feedback content submit");
    if (parsedUserInfo?.UserType === "Student") {
      uploadHomework({
        Caption: caption,
        ContentThumbnailFileId: contentThumbnailId,
        ContentVideoFileId: contentVideoId,
      });
    }
    if (parsedUserInfo?.UserType === "Creator") {
      creatorContentSubmit({
        ContentId: contentId,
        Caption: caption,
        ContentThumbnailFileId: contentThumbnailId,
        ContentVideoFileId: contentVideoId,
      });
    }
  };

  return (
    <DialogContent className="overflow-y-auto flex flex-col p-6 w-full sm:w-auto lg:w-full max-h-[739px] max-w-[1000px] rounded-3xl">
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
          ) : isVideoUploadLoading ? (
            <div className="bg-[#F5F4F0] aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl flex justify-center items-center">
              <ClipLoader
                loading={isVideoUploadLoading}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                size={50}
              />
            </div>
          ) : (
            <div
              {...getRootPropsForVideo()}
              className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
            >
              <input {...getInputPropsForVideo()} />
              <div className="bg-[#F5F4F0] cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#CA7FFE] flex justify-center items-center">
                  <Image
                    src={"/add-icon.png"}
                    width={20}
                    height={20}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
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
          ) : isImageUploadLoading ? (
            <div className="bg-[#F5F4F0] aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl flex justify-center items-center">
              <ClipLoader
                loading={isImageUploadLoading}
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
                <div className="w-14 h-14 rounded-2xl bg-[#CA7FFE] flex justify-center items-center">
                  <Image
                    src={"/add-icon.png"}
                    width={20}
                    height={20}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col h-auto justify-between">
          <div className="flex flex-col gap-4">
            <span className="text-lg">Тайлбар</span>
            <textarea
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Бүтээгдэхүүн үйлчилгээний талаарх хэрэглэгчийн сэтгэгдэл болон контентоор хуваалцахыг хүссэн зүйлээ тайлбарлан бичээрэй. Таны энэхүү бичвэрийг brand контент оруулахдаа ашиглах боломжтой."
              className="p-3 min-h-[210px] w-full border bg-[#F5F4F0] border-gray-300 rounded-xl"
            />
          </div>
          {contentThumbnail && contentVideo && caption ? (
            <button
              onClick={handleContentSubmit}
              className={`mt-6 ${
                parsedUserInfo?.UserType === "Student"
                  ? "bg-[#4FB755]"
                  : "bg-[#CA7FFE]"
              } border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold`}
            >
              Илгээх
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <UploadSuccessModal
        isContentSubmitSuccess={
          parsedUserInfo?.UserType === "Student"
            ? isHomeworkUploadSuccess
            : isContentSuccess
        }
        parsedUserInfo={parsedUserInfo}
        setIsContentSubmitSuccess={
          parsedUserInfo?.UserType === "Student"
            ? setIsHomeworkUploadSuccess
            : setIsContentSuccess
        }
      />
    </DialogContent>
  );
}

export default FeedbackModalUploadModalContent;
