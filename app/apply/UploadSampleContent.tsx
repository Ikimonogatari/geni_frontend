import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  useGetPublicVideoPresignedUrlMutation,
  usePublicUploadByPresignUrlMutation,
} from "../services/service";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Button from "@/components/ui/button";
import useS3Upload from "@/components/hooks/useUploadToS3";
import ContentUploadProgress from "@/components/common/ContentUploadProgress";
import VideoPlayer from "@/components/common/VideoPlayer";

function UploadSampleContent({ formik }) {
  const [contentVideo, setContentVideo] = useState(null);
  const { uploadToS3, progress, isUploading } = useS3Upload();

  const [
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
    },
  ] = usePublicUploadByPresignUrlMutation();

  const [
    getVideoPresignedUrl,
    {
      data: getVideoPresignedUrlData,
      error: getVideoPresignedUrlError,
      isLoading: getVideoPresignedUrlLoading,
    },
  ] = useGetPublicVideoPresignedUrlMutation();

  useEffect(() => {
    if (getVideoPresignedUrlError) {
      // @ts-ignore
      toast.error(getVideoPresignedUrlError?.data?.error);
    }
    if (getVideoPresignedUrlData) {
      setContentVideo(getVideoPresignedUrlData.url);
    }
  }, [getVideoPresignedUrlData, getVideoPresignedUrlError]);
  useEffect(() => {
    if (uploadFileError) {
      // @ts-ignore
      toast.error(uploadFileError?.data?.error);
    }
  }, [uploadFileData, uploadFileError]);

  useEffect(() => {
    console.log("ContentLink:", formik.values.ContentLink);
    console.log("ContentFileId:", formik.values.ContentFileId);
    console.log("Form valid:", formik.isValid);
    console.log("Form errors:", formik.errors);
  }, [
    formik.values.ContentLink,
    formik.values.ContentFileId,
    formik.isValid,
    formik.errors,
  ]);

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
              formik.setFieldValue("ContentFileId", fileId);
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

  // Function to check if content submission is valid
  const isContentValid = () => {
    return (
      Boolean(formik.values.ContentLink) || Boolean(formik.values.ContentFileId)
    );
  };

  return (
    <div onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-3 text-lg">
        <span className="font-bold">Бүтээгчийн чадварын сорилт</span>
        <span>
          Өөрийн өдөр тутамдаа хэрэглэдэг хамгийн дуртай, бусдад санал болгохыг
          хүсдэг бүтээгдэхүүнээ сонгон 1 минутын урттай UGC content бүтээж
          илгээгээрэй. UGC content нь хэрэглэгчийн сэтгэгдэл, хувийн үр дүн дээр
          суурилсан тухайн бүтээгдэхүүнийг таниулах маркетингийн зорилготой
          контент бөгөөд суртaчилaгааны контентоос илүү органик, бүтээлч,
          хэрэглэгчдэд илүү ойр байдгаараа онцлогтой.
        </span>
      </div>
      <Input
        id="ContentLink"
        name="ContentLink"
        type="mail"
        className="text-sm sm:text-xl bg-primary-bg"
        wrapperClassName="col-span-1"
        labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
        layoutClassName="h-full p-4 sm:p-5 w-full bg-primary-bg"
        label="Контент линк оруулах"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ContentLink}
        errorText={formik.errors.ContentLink}
        errorVisible={formik.touched.ContentLink && formik.errors.ContentLink}
      />
      {contentVideo ? (
        <VideoPlayer
          src={contentVideo}
          controls={true}
          className="aspect-[9/16] w-full h-full rounded-2xl border border-primary"
        />
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

          <div className="bg-primary-bg cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
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
      <Button
        type="submit"
        className="w-full bg-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={formik.isSubmitting || !isContentValid()}
      >
        Өргөдөл илгээх
      </Button>
    </div>
  );
}

export default UploadSampleContent;
