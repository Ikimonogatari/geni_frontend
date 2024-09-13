"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContentProgress from "./ContentProgress";
import ContentGallery from "../components/ContentGallery";
import {
  useBrandReceiveContentMutation,
  useCreatorContentSubmitMutation,
  useGetImagePresignedUrlMutation,
  useGetVideoPresignedUrlMutation,
  useListCreatorContentsQuery,
  useUpdateContentStatusMutation,
  useUploadByPresignUrlMutation,
} from "@/app/services/service";
import Cookies from "js-cookie";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function page() {
  const userInfo = Cookies.get("user-info");
  console.log(userInfo);
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  console.log(parsedUserInfo);

  const [creatorData, setCreatorData] = useState(
    parsedUserInfo ? parsedUserInfo : null
  );
  const {
    data: listCreatorContentsData,
    error: listCreatorContentsError,
    isLoading: listCreatorContentsLoading,
  } = useListCreatorContentsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 8;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, getTotalPages()));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getCurrentContents = () => {
    const contents = listCreatorContentsData
      ? listCreatorContentsData.Data != null
        ? listCreatorContentsData.Data
        : []
      : [];

    const indexOfLastContent = currentPage * contentsPerPage;
    const indexOfFirstContent = indexOfLastContent - contentsPerPage;
    return contents.slice(indexOfFirstContent, indexOfLastContent);
  };

  const getTotalPages = () => {
    const contents = listCreatorContentsData
      ? listCreatorContentsData.Data != null
        ? listCreatorContentsData.Data
        : []
      : [];
    return Math.ceil(contents.length / contentsPerPage);
  };

  const renderBrandProfile = () => {
    const currentContents = getCurrentContents();
    return <ContentProgress currentContents={currentContents} />;
  };

  const totalPages = getTotalPages();

  const getPageNumbers = () => {
    const totalNumbers = 5; // Number of page numbers to show
    const totalBlocks = totalNumbers + 2; // Including first and last page

    if (totalPages > totalBlocks) {
      let pages = [];
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(totalPages, currentPage + 2);
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 1;
      const endPage = rightBound < beforeLastPage ? rightBound : totalPages;

      pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      );

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = endPage < beforeLastPage;

      if (hasLeftSpill) {
        pages = ["...", ...pages];
      }
      if (hasRightSpill) {
        pages = [...pages, "..."];
      }

      if (pages[0] !== 1) {
        pages = [1, ...pages];
      }
      if (pages[pages.length - 1] !== totalPages) {
        pages = [...pages, totalPages];
      }

      return pages;
    }

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

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
  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start justify-between w-full">
            <div className="flex flex-row items-center gap-7">
              <Image
                src={
                  creatorData?.image ? creatorData?.image : "/dummy-profile.jpg"
                }
                // loader={GraphCMSImageLoader}
                width={194}
                height={194}
                loading="lazy"
                className="rounded-full sm:rounded-xl w-[90px] h-[90px] sm:w-[194px] sm:h-[194px] aspect-square border border-[#2D262D]"
                alt=""
              />
              <div className="flex flex-col gap-1 sm:gap-2">
                <div className="flex flex-row items-center gap-3">
                  <span className="text-[#2D262D] text-base sm:text-2xl font-bold">
                    {creatorData?.FirstName} {creatorData?.LastName}
                  </span>

                  <Image
                    src={"/verified-icon.png"}
                    width={24}
                    height={24}
                    alt="verified-icon"
                    className="w-4 h-4 sm:w-6 sm:h-6"
                  />
                </div>
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  <span className="text-sm sm:text-lg">
                    {creatorData ? creatorData.Point : 0} xp
                  </span>
                  <a>
                    <Image
                      src={"/Info.png"}
                      width={24}
                      height={24}
                      alt="info"
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </a>
                  <a
                    target="_blank"
                    href={`https://www.instagram.com/${creatorData?.SocialChannels?.[1]?.SocialAddress}`}
                  >
                    <Image
                      src={"/Instagram.png"}
                      width={24}
                      height={24}
                      alt="ig"
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </a>
                  <a
                    target="_blank"
                    href={`https://www.facebook.com/${creatorData?.SocialChannels?.[0]?.SocialAddress}`}
                  >
                    <Image
                      src={"/Facebook.png"}
                      width={24}
                      height={24}
                      alt="fb"
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </a>
                </div>
                <span className="text-[#6F6F6F] text-xs sm:text-base">
                  {creatorData ? creatorData.Bio : ""}
                </span>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[#2D262D]">
                  {creatorData?.Category?.map((c, i) => (
                    <button
                      key={i}
                      className="bg-[#CA7FFE] font-semibold rounded-full px-4 py-2"
                    >
                      {c.Category_id.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-5">
              <Link
                href={"/notifications"}
                className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
              >
                <Image
                  src={"/brand-profile-icon2.png"}
                  width={24}
                  height={24}
                  alt="icon"
                  className="w-5 sm:w-6 h-5 sm:h-6"
                />
              </Link>
              <Link
                href={"/edit-profile-creator"}
                className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
              >
                <Image
                  src={"/brand-profile-icon3.png"}
                  width={24}
                  height={24}
                  alt="icon"
                  className="w-5 sm:w-6 h-5 sm:h-6"
                />
              </Link>
              <Link
                href="/products"
                className="flex sm:hidden flex-row items-center gap-2 text-xs sm:text-base bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold"
              >
                Бүтээгдэхүүн үзэх
                <Image
                  src={"/arrow-right-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                  className="w-[9px] h-[9px] sm:w-[14px] sm:h-[14px]"
                />
              </Link>
            </div>
          </div>

          <div className="mt-4 sm:mt-16 w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              {brandProfileButtons.map((b, i) => (
                <div
                  key={i}
                  className={`border-[1px] border-[#CDCDCD] text-[#6F6F6F] px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-base`}
                >
                  {b.title}
                </div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger
                type="submit"
                className="flex flex-row items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-5 py-3 rounded-lg text-white font-bold"
              >
                Гэрийн даалгавар илгээх{" "}
                <Image src={"/plus.png"} width={14} height={14} alt="arrow" />
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
                      {contentVideo ? (
                        <video controls className="w-full h-full lg:h-auto">
                          <source src={contentVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="bg-[#F5F4F0] cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
                          <input {...getInputPropsForVideo()} />
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
                      {contentThumbnail ? (
                        <img
                          src={contentThumbnail}
                          alt="Thumbnail Preview"
                          className="w-full h-auto"
                        />
                      ) : (
                        <div className="bg-[#F5F4F0] cursor-pointer w-full h-full rounded-2xl flex justify-center items-center">
                          <input {...getInputPropsForImage()} />
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
          </div>
          {renderBrandProfile()}
        </div>
        {listCreatorContentsData && totalPages > 1 ? (
          <div className="container px-7 mx-auto text-[#2D262D] flex flex-row gap-3 items-end justify-end mt-5">
            {currentPage > 1 && (
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex flex-row items-center gap-2 border-[1px] border-[#2D262D] bg-[#CA7FFE] px-5 py-2 rounded-lg text-white font-bold"
              >
                <Image
                  src={"/arrow-right-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                  className="rotate-180"
                />
                Prev
              </button>
            )}

            <div className="flex flex-row items-center gap-3">
              {getPageNumbers().map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() => pageNumber !== "..." && paginate(pageNumber)}
                  className={`w-10 h-10 transition-all duration-150 flex justify-center items-center border-[1px] rounded-full bg-[#F5F4F0] ${
                    pageNumber === currentPage
                      ? "border-[#CA7FFE]"
                      : "border-none"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            {currentPage != totalPages && (
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex flex-row items-center gap-2 border-[1px] border-[#2D262D] bg-[#CA7FFE] px-5 py-2 rounded-lg text-white font-bold"
              >
                Next
                <Image
                  src={"/arrow-right-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                />
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default page;

const brandProfileButtons = [
  {
    title: "Онлайн хичээл",
    value: "content-progress",
  },
];

const scores = ["20", "40", "60", "80", "100"];
