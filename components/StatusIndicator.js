import React from "react";
import Image from "next/image";

const getColorClass = (status) => {
  switch (status) {
    case "Request":
      return "bg-[#4D55F5] text-white";
    case "ProdApproved":
      return "bg-[#4FB755] text-white";
    case "ProdRejected":
      return "bg-[#F41919] text-white";
    case "ProdDelivering":
      return "bg-[#F49D19] text-white";
    case "ContentInProgress":
      return "bg-[#F49D19] text-white";
    case "ContentInReview":
      return "bg-[#4D55F5] text-white";
    case "ContentSent":
      return "bg-[#4FB755] text-white";
    case "ContentRejected":
      return "bg-[#F41919] text-white";
    case "ContentReceived":
      return "bg-[#4FB755] text-white";
    default:
      return "bg-[#4D55F5] text-white";
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
      return "/stage-icon1.png";
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

const StatusIndicator = ({ status }) => {
  return (
    <div className="col-span-1 flex flex-row items-center gap-3">
      <div className={`${getColorClass(status)} inline-flex items-center gap-3 px-3 py-1 rounded-full`}>
        <Image
          src={getStatusImage(status)}
          width={24}
          height={24}
          alt=""
          className="w-4 h-4 sm:w-5 sm:h-5 brightness-0 invert"
        />
        <span className="text-xs sm:text-sm whitespace-nowrap">
          {getStatusName(status)}
        </span>
      </div>
    </div>
  );
};

export default StatusIndicator;
