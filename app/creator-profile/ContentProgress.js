import React, { useEffect } from "react";
import Image from "next/image";
import { useUpdateContentStatusMutation } from "../services/service";
import toast from "react-hot-toast";

import Cookies from "js-cookie";
import ContentUploadModal from "../components/ContentUploadModal";
import FeedbackModal from "../components/FeedbackModal";
import ContentReviewModal from "../components/ContentReviewModal";
import StatusIndicator from "../components/StatusIndicator";

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
      toast.error(updateContentStatusError?.data?.error);
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

  const formatDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    return deadlineDate.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDeadlineBgClass = (deadline) => {
    const now = new Date();
    const timeRemaining = new Date(deadline) - now;
    const halfway = 1000 * 60 * 60 * 12; // 12 hours in ms
    const almostDue = 1000 * 60 * 60 * 3; // 3 hours in ms

    if (timeRemaining <= almostDue) return "bg-[#FFE0E0]"; // almost due
    if (timeRemaining <= halfway) return "bg-[#FFF8E0]"; // halfway
    return "bg-[#E0F4FF]"; // enough time
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] sm:min-w-[1200px] mt-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[3fr,2fr,1fr,3fr,2fr,2fr] gap-6 w-full items-center text-[#6F6F6F]">
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
          <span className="col-span-1">Хугацаа</span>
          <span className="col-span-1">Үйлдэл</span>
        </div>
        {currentContents.map((p, i) => (
          <div
            key={i}
            className="text-[10px] sm:text-base w-full grid grid-cols-[3fr,2fr,1fr,3fr,2fr,2fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
          >
            <span className="col-span-1">{p.ProductName}</span>
            <span className="col-span-1">{p.BrandName}</span>
            <span className="col-span-1">{p.ContentPhase}</span>
            <StatusIndicator status={p.Status} />
            <span
              className={`
                col-span-1 px-1 py-1 rounded-md text-center
                ${getDeadlineBgClass(p.Deadline)}
              `}
            >
              {formatDeadline(p.Deadline)}
            </span>
            <div className="col-span-1">
              {p.Status === "ProdDelivering" ? (
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
                  feedbacks={p?.FeedBacks}
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
