"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  useGetImagePresignedUrlMutation,
  useGetVideoPresignedUrlMutation,
  useUploadByPresignUrlMutation,
  useCreatorContentSubmitMutation,
  useContentResendMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";
import useS3Upload from "@/components/hooks/useUploadToS3";
import ContentUploadProgress from "@/components/common/ContentUploadProgress";
import { useFormikContext } from "formik";
import HLSPlayer from "@/components/common/HLSPlayer";

function ContentUploadModalContent({
  parsedUserInfo,
  contentId,
  setDialogOpen,
  refetch,
  isResend = false,
}) {
  const formik = useFormikContext();
  const [contentThumbnail, setContentThumbnail] = useState(null);
  const [contentVideo, setContentVideo] = useState(null);
  const [contentVideoId, setContentVideoId] = useState(null);
  const [contentThumbnailId, setContentThumbnailId] = useState(null);
  const [caption, setCaption] = useState("");
  const { uploadToS3, progress, isUploading } = useS3Upload();
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
    creatorContentSubmit,
    {
      data: creatorContentSubmitData,
      error: creatorContentSubmitError,
      isLoading: creatorContentSubmitLoading,
      isSuccess: creatorContentSubmitSuccess,
    },
  ] = useCreatorContentSubmitMutation();
  const [
    contentResend,
    {
      data: contentResendData,
      error: contentResendError,
      isLoading: contentResendLoading,
      isSuccess: contentResendSuccess,
    },
  ] = useContentResendMutation();

  useEffect(() => {
    if (getImagePresignedUrlError) {
      toast.error(getImagePresignedUrlError?.data?.error);
    }
    if (getImagePresignedUrlData) {
      setContentThumbnail(getImagePresignedUrlData.url);
    }
  }, [getImagePresignedUrlData, getVideoPresignedUrlError]);

  useEffect(() => {
    if (getVideoPresignedUrlError) {
      toast.error(getVideoPresignedUrlError?.data?.error);
    }
    if (getVideoPresignedUrlData) {
      setContentVideo(getVideoPresignedUrlData.url);
    }
  }, [getVideoPresignedUrlData, getVideoPresignedUrlError]);

  useEffect(() => {
    if (creatorContentSubmitError || contentResendError) {
      toast.error(
        creatorContentSubmitError?.data.error || contentResendError?.data.error
      );
    }
    if (creatorContentSubmitSuccess || contentResendSuccess) {
      toast.success("Контент илгээгдлээ");
      setDialogOpen(false);
      refetch();
    }
  }, [
    creatorContentSubmitSuccess,
    creatorContentSubmitError,
    contentResendSuccess,
    contentResendError,
  ]);

  useEffect(() => {
    if (uploadFileError) {
      toast.error(uploadFileError?.data?.error);
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
        uploadFile({ FolderName: "content-thumbnail" })
          .then((response) => {
            if (response.data) {
              const { fileId, uploadURL } = response.data;
              setContentThumbnailId(fileId);
              uploadToS3(uploadURL, file, "image").then(() => {
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
        uploadFile({ FolderName: "content-video" })
          .then((response) => {
            if (response.data) {
              const { fileId, uploadURL } = response.data;
              setContentVideoId(fileId);
              uploadToS3(uploadURL, file, "video").then(() => {
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

  const handleContentSubmit = () => {
    if (isResend) {
      contentResend({
        ContentId: contentId,
        Caption: caption,
        ContentThumbnailFileId: contentThumbnailId,
        ContentVideoFileId: contentVideoId,
        BrandReviewId: formik.values.BrandReviewResendFeedback,
      });
    } else {
      creatorContentSubmit({
        ContentId: contentId,
        Caption: caption,
        ContentThumbnailFileId: contentThumbnailId,
        ContentVideoFileId: contentVideoId,
      });
    }
  };

  return (
    <>
      <span className="text-3xl font-bold">Контент илгээх</span>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="w-full flex flex-col gap-4">
          <span className="text-lg">Контент</span>

          {contentVideo ? (
            <div className="aspect-[9/16] w-full h-full rounded-2xl overflow-hidden">
              <HLSPlayer src={contentVideo} />
            </div>
          ) : isUploading.video ? (
            <ContentUploadProgress
              isLoading={isUploading.video}
              progress={progress.video}
            />
          ) : (
            <div
              {...getRootPropsForVideo()}
              className="aspect-[9/16] w-full h-full rounded-2xl"
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
              className="aspect-[9/16] w-full h-full rounded-2xl"
            />
          ) : isUploading.image ? (
            <ContentUploadProgress
              isLoading={isUploading.image}
              progress={progress.image}
            />
          ) : (
            <div
              {...getRootPropsForImage()}
              className="aspect-[9/16] w-full h-full rounded-2xl"
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

        <div className="w-full flex flex-col h-full justify-between">
          <div className="flex flex-col gap-4">
            <span className="text-lg">
              Бүтээгдэхүүн хэрэглэсэн өөрийн сэтгэгдэлээ хуваалцаарай.
            </span>
            <textarea
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Бүтээгдэхүүн үйлчилгээний талаарх хэрэглэгчийн сэтгэгдэл болон контентоор хуваалцахыг хүссэн зүйлээ тайлбарлан бичээрэй. Таны энэхүү бичвэрийг brand контент оруулахдаа ашиглах боломжтой."
              className="p-3 bg-[#F5F4F0] min-h-[300px] w-full border border-gray-300 rounded-xl"
            />
          </div>
          <button
            type="button"
            onClick={handleContentSubmit}
            disabled={
              !(contentThumbnail && contentVideo && caption) ||
              creatorContentSubmitLoading ||
              contentResendLoading
            }
            className={`bg-[#4FB755] border-[1px] border-[#2D262D] mt-6 px-5 py-2 rounded-lg font-bold text-white ${
              contentThumbnail && contentVideo && caption
                ? "opacity-100"
                : "opacity-55 cursor-not-allowed"
            }`}
          >
            {isResend ? "Дахин илгээх" : "Илгээх"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ContentUploadModalContent;
