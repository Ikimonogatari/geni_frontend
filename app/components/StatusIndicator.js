import React from "react";
import Image from "next/image";

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
    <div
      className={`${getColorClass(
        status
      )} col-span-1 flex flex-row items-center gap-3`}
    >
      <Image
        src={getStatusImage(status)}
        width={24}
        height={24}
        alt=""
        className="w-4 h-4 sm:w-6 sm:h-6"
      />
      <span>{getStatusName(status)}</span>
    </div>
  );
};

export default StatusIndicator;
