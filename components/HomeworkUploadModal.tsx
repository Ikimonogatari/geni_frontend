"use client";
import React, { useEffect, useState } from "react";
import { DialogContent, Dialog, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  useGetImagePresignedUrlMutation,
  useGetVideoPresignedUrlMutation,
  useUploadByPresignUrlMutation,
  useUploadHomeworkMutation,
} from "../app/services/service";
import toast from "react-hot-toast";
import useS3Upload from "./hooks/useUploadToS3";
import ContentUploadProgress from "./common/ContentUploadProgress";
import UploadSuccessModal from "./UploadSuccessModal";
import HLSPlayer from "./common/HLSPlayer";

function HomeworkUploadModal({ parsedUserInfo, courseId }) {
  const [contentThumbnail, setContentThumbnail] = useState(null);
  const [contentVideo, setContentVideo] = useState(null);
  const [isHomeworkUploadSuccess, setIsHomeworkUploadSuccess] = useState(false);
  const [contentVideoId, setContentVideoId] = useState(null);
  const [contentThumbnailId, setContentThumbnailId] = useState(null);
  const [caption, setCaption] = useState("");
  const [isMainDialogOpen, setMainDialogOpen] = useState(false);
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
    uploadHomework,
    {
      data: uploadHomeworkData,
      error: uploadHomeworkError,
      isLoading: uploadHomeworkLoading,
      isSuccess,
    },
  ] = useUploadHomeworkMutation();

  useEffect(() => {
    if (getImagePresignedUrlError) {
      //@ts-ignore
      toast.error(getImagePresignedUrlError?.data?.error);
    }
    if (getImagePresignedUrlData) {
      setContentThumbnail(getImagePresignedUrlData.url);
    }
  }, [getImagePresignedUrlData, getVideoPresignedUrlError]);

  useEffect(() => {
    if (getVideoPresignedUrlError) {
      //@ts-ignore
      toast.error(getVideoPresignedUrlError?.data?.error);
    }
    if (getVideoPresignedUrlData) {
      setContentVideo(getVideoPresignedUrlData.url);
    }
  }, [getVideoPresignedUrlData, getVideoPresignedUrlError]);

  useEffect(() => {
    if (uploadHomeworkError) {
      //@ts-ignore
      toast.error(uploadHomeworkError?.data.error);
    }
    if (isSuccess) {
      setIsHomeworkUploadSuccess(true);
    }
  }, [uploadHomeworkData, uploadHomeworkError]);

  useEffect(() => {
    if (uploadFileError) {
      //@ts-ignore
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
    uploadHomework({
      CourseId: courseId,
      Caption: caption,
      ContentThumbnailFileId: contentThumbnailId,
      ContentVideoFileId: contentVideoId,
    });
  };

  return (
    <>
      <Dialog open={isMainDialogOpen} onOpenChange={setMainDialogOpen}>
        <DialogTrigger
          type="submit"
          className="whitespace-nowrap text-start text-xs sm:text-base bg-[#4FB755] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold"
        >
          Гэрийн даалгавар илгээх
        </DialogTrigger>
        {/* @ts-ignore */}
        <DialogContent className="overflow-y-auto flex flex-col p-6 w-full sm:w-auto lg:w-full max-h-[739px] max-w-[1000px] rounded-3xl">
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
                  className="aspect-[9/16] w-full h-full rounded-2xl bg-[#F5F4F0]"
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
                <span className="text-lg">Тайлбар</span>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Бүтээгдэхүүн үйлчилгээний талаарх хэрэглэгчийн сэтгэгдэл болон контентоор хуваалцахыг хүссэн зүйлээ тайлбарлан бичээрэй. Таны энэхүү бичвэрийг brand контент оруулахдаа ашиглах боломжтой."
                  className="p-3 bg-[#F5F4F0] min-h-[200px] w-full border border-gray-300 rounded-xl"
                />
              </div>
              {contentThumbnail && contentVideo && caption ? (
                <button
                  onClick={handleContentSubmit}
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
      <UploadSuccessModal
        isContentSubmitSuccess={isHomeworkUploadSuccess}
        setIsContentSubmitSuccess={setIsHomeworkUploadSuccess}
        setIsMainDialogOpen={setMainDialogOpen}
      />
    </>
  );
}

export default HomeworkUploadModal;
