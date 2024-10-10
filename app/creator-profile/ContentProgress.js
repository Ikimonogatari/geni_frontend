import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUpdateContentStatusMutation } from "../services/service";
import toast from "react-hot-toast";

import Cookies from "js-cookie";
import ContentUploadModal from "../components/ContentUploadModal";
import FeedbackModal from "../components/FeedbackModal";
import ContentReviewModal from "../components/ContentReviewModal";

function ContentProgress({ currentContents }) {
  console.log(currentContents);
  const userInfo = Cookies.get("user-info");
  console.log(userInfo ? userInfo : "");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  console.log(parsedUserInfo);

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

  const handleUpdateContentStatus = (contentId, status) => {
    updateContentStatus({
      ContentId: contentId,
      Status: status,
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
                <FeedbackModal
                  parsedUserInfo={parsedUserInfo}
                  contentId={p?.ContentId}
                  feedbacks={p?.Feedbacks}
                />
              ) : (
                <></>
              )}
              {p.Status === "ContentInProgress" ? (
                <ContentUploadModal
                  parsedUserInfo={parsedUserInfo}
                  contentId={p.ContentId}
                />
              ) : null}

              {p.Status === "ContentReceived" ? (
                <ContentReviewModal p={p} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentProgress;
