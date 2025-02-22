import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  useGetVideoPresignedUrlMutation,
  useUploadByPresignUrlMutation,
} from "../services/service";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/ui/button";
import SuccessModal from "@/components/common/SuccessModal";

function UploadSampleContent({ formik }) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isVideoUploadLoading, setIsVideoUploadLoading] = useState(false);
  const [contentVideo, setContentVideo] = useState(null);
  const [contentVideoId, setContentVideoId] = useState(null);

  const [
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
    },
  ] = useUploadByPresignUrlMutation();

  const [
    getVideoPresignedUrl,
    {
      data: getVideoPresignedUrlData,
      error: getVideoPresignedUrlError,
      isLoading: getVideoPresignedUrlLoading,
    },
  ] = useGetVideoPresignedUrlMutation();

  useEffect(() => {
    if (getVideoPresignedUrlError) {
      // @ts-ignore
      toast.error(getVideoPresignedUrlError?.data?.error);
      setIsVideoUploadLoading(false);
    }
    if (getVideoPresignedUrlData) {
      setIsVideoUploadLoading(false);
      setContentVideo(getVideoPresignedUrlData.url);
    }
  }, [getVideoPresignedUrlData, getVideoPresignedUrlError]);
  useEffect(() => {
    if (uploadFileError) {
      // @ts-ignore
      toast.error(uploadFileError?.data?.error);
      setIsVideoUploadLoading(false);
    }
  }, [uploadFileData, uploadFileError]);

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
    try {
      const response = await axios.put(url, file, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (response.status == 200) {
      } else {
        throw new Error(`HTTP error! status: ${response}`);
      }
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
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
        errorVisible={formik.touched.v && formik.errors.ContentLink}
      />
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
        onClick={() => setIsSuccessModalOpen(true)}
        type="button"
        className="w-full bg-secondary text-white"
      >
        Өргөдөл илгээх
      </Button>
      <SuccessModal
        isMainDialogOpen={isSuccessModalOpen}
        setIsMainDialogOpen={setIsSuccessModalOpen}
        modalImage="/creator-image.png"
        modalTitle="ӨРГӨДӨЛ АМЖИЛТТАЙ ИЛГЭЭГДЛЭЭ"
        context={
          <span className="bg-primary-bg text-base sm:text-xl rounded-2xl p-3 sm:p-4">
            Өргөдөлийн хариу 24-48 цагын хугацаанд таны бүртгүүлсэн имэйл
            хаягаар очих тул түр хүлээгээрэй. Амжилт хүсье!
          </span>
        }
        imageClassName="w-[207px] h-[216px]"
      />
    </form>
  );
}

export default UploadSampleContent;
