import Image from "next/image";
import {
  getCurrentStepColor,
  getStatusName,
  STATUS_LIST_VALUE,
} from "./content-progress/content.services";
import Cookies from "js-cookie";

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

const StatusIndicator = ({ status }) => {
  const userType = Cookies.get("userType");
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
      <span>{getStatusName(status, userType)}</span>
    </div>
  );
};

export default StatusIndicator;
