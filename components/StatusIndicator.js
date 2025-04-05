import React from "react";
import Image from "next/image";
import {
  getCurrentStepColor,
  STATUS_LIST_VALUE,
} from "./content-progress/content.services";

const getColorClass = (status) => {
  switch (status) {
    case "Request":
      return "bg-[#4D55F5]";
    case "ProdApproved":
      return "bg-[#4FB755]";
    case "ProdRejected":
      return "bg-[#F41919]";
    case "ProdDelivering":
      return "bg-[#F49D19]";
    case "ContentInProgress":
      return "bg-[#F49D19]";
    case "ContentInReview":
      return "bg-[#4D55F5]";
    case "ContentSent":
      return "bg-[#4FB755]";
    case "ContentRejected":
      return "bg-[#F41919]";
    case "ContentReceived":
      return "bg-[#4FB755]";
    case "ContentApproved":
      return "bg-[#4FB755]";
    case "ContentHold":
      return "bg-[#F49D19]";
    default:
      return "bg-[#4D55F5]";
  }
};

const getStatusImage = (status) => {
  switch (status) {
    case "Request":
      return "/content-status-icon1.png";
    case "ProdApproved":
      return "/content-status-icon6.png";
    case "ProdRejected":
      return "/content-status-icon3.png";
    case "ProdDelivering":
      return "/content-status-icon2.png";
    case "ContentInProgress":
      return "/content-status-icon3.png";
    case "ContentInReview":
      return "/content-status-icon4.png";
    case "ContentSent":
      return "/content-status-icon6.png";
    case "ContentReceived":
      return "/content-status-icon7.png";
    case "ContentRejected":
      return "/content-status-icon5.png";
    case "ContentApproved":
      return "/content-status-icon6.png";
    case "ContentHold":
      return "/content-status-icon5.png";
    default:
      return "/content-status-icon1.png";
  }
};

// const getStatusName = (status) => {
//   switch (status) {
//     case "Request":
//       return "Хүсэлт илгээгдсэн";
//     case "ProdApproved":
//       return "Geni-гээс зөвшөөрсөн";
//     case "ProdRejected":
//       return "Geni-гээс зөвшөөрөгдөөгүй";
//     case "ProdDelivering":
//       return "Бүтээгдэхүүн хүргэж байна";
//     case "ContentInProgress":
//       return "Контент хүлээгдэж байна";
//     case "ContentInReview":
//       return "Geni шалгаж байна";
//     case "ContentSent":
//       return "Контент илгээсэн";
//     case "ContentRejected":
//       return "Контент буцаагдсан";
//     case "ContentApproved":
//       return "Контент зөвшөөрөгдсөн";
//     case "ContentReceived":
//       return "Контент хүлээн авсан";
//     case "ContentHold":
//       return "Түр зогссон";
//     default:
//       return status;
//   }
// };

const StatusIndicator = ({ status }) => {
  return (
    <div
      className={`bg-${getCurrentStepColor(
        status
      )}-500 col-span-1 flex flex-row items-center justify-center max-w-max rounded-full px-2 py-1 gap-1 text-white`}
      // className={`${getColorClass(status)} col-span-1 flex flex-row items-center justify-center max-w-max rounded-full px-2 py-1 gap-1 text-white`}
    >
      <Image
        src={getStatusImage(status)}
        width={24}
        height={24}
        alt=""
        className="w-4 h-4 sm:w-6 sm:h-6"
      />
      <span>{STATUS_LIST_VALUE?.[status] || status}</span>
    </div>
  );
};

export default StatusIndicator;
