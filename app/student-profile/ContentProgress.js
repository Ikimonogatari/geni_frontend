"use client";
import React, { useState } from "react";
import Image from "next/image";

import Cookies from "js-cookie";
import UploadSuccessModal from "../components/UploadSuccessModal";
import FeedbackModal from "../components/FeedbackModal";

function ContentProgress({ currentContents }) {
  console.log(currentContents);

  const [isHomeworkUploadSuccess, setIsHomeworkUploadSuccess] = useState(false);
  const userInfo = Cookies.get("user-info");
  console.log(userInfo ? userInfo : "");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

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
      <div className="min-w-[450px] sm:min-w-[600px] mt-7 pt-3 px-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[2fr,1fr,1fr,2fr,1fr] gap-6 w-full items-center text-[#6F6F6F]">
          <span className="col-span-1">Үзэх хичээл</span>
          <span className="col-span-1">Багш</span>
          <span className="col-span-1">Хичээл</span>
          <span className="col-span-1">Статус</span>
          <span className="col-span-1">Үйлдэл</span>
        </div>
        {currentContents.map((c, i) => (
          <div className="text-[10px] sm:text-base w-full grid grid-cols-[2fr,1fr,1fr,2fr,1fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl">
            <span className="col-span-1">Geni creator online course</span>
            <span className="col-span-1">Geni</span>
            <a
              className="underline"
              target="_blank"
              href="https://meirapage.gumroad.com/l/hxwkma/hic5m2k"
            >
              Үзэх
            </a>
            <div
              className={`${getColorClass(
                c.Status
              )} col-span-1 flex flex-row items-center gap-[6px]`}
            >
              <Image
                src={getStatusImage(c.Status)}
                width={24}
                height={24}
                alt=""
                className="w-4 h-4 sm:w-6 sm:h-6"
              />
              <span className="">{getStatusName(c.Status)}</span>
            </div>
            <div className="col-span-1">
              {c.Status === "ContentSent" ? (
                <FeedbackModal parsedUserInfo={parsedUserInfo} />
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
