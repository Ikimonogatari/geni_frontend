import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useBrandReceiveContentMutation,
  useUpdateContentStatusMutation,
  useGetImagePresignedUrlMutation,
  useGetVideoPresignedUrlMutation,
} from "../services/service";
import toast from "react-hot-toast";

function ContentProgress({ currentContents }) {
  console.log(currentContents);

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
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[3fr,2fr,2fr] gap-6 w-full items-center text-[#6F6F6F]">
          <span className="col-span-1">Үзэх хичээл</span>
          <span className="col-span-1">Багш</span>
          <span className="col-span-1">Үзэх линк</span>
        </div>
        <div className="text-[10px] sm:text-base w-full grid grid-cols-[3fr,2fr,2fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl">
          <span className="col-span-1">Geni creator online course</span>
          <span className="col-span-1">Geni</span>
          <a
            className="underline"
            href="https://meirapage.gumroad.com/l/hxwkma"
          >
            Үзэх
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContentProgress;
