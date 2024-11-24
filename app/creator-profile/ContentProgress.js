import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUpdateContentStatusMutation } from "../services/service";
import toast from "react-hot-toast";

import Cookies from "js-cookie";
import ContentUploadModal from "../components/ContentUploadModal";
import FeedbackModal from "../components/FeedbackModal";
import ContentReviewModal from "../components/ContentReviewModal";
import StatusIndicator from "../components/StatusIndicator";
import DeadlineModal from "../components/DeadlineModal";

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

  const handleUpdateContentStatus = async (contentId, status) => {
    await updateContentStatus({
      ContentId: contentId,
      Status: status,
    });
  };

  const getDeadlineInfo = (deadline) => {
    const now = new Date();
    const timeRemaining = new Date(deadline) - now;
    const oneDay = 1000 * 60 * 60 * 24; // 1 day in milliseconds
    const daysLeft = Math.ceil(timeRemaining / oneDay);

    if (timeRemaining < 0) {
      return { bgClass: "bg-[#FF0000] text-white", text: "Хоцорсон" }; // deep red for overdue
    }
    if (daysLeft <= 1) {
      return { bgClass: "bg-[#FFE0E0]", text: `${daysLeft} хоног үлдсэн` };
    }
    if (daysLeft <= 3) {
      return { bgClass: "bg-[#FFF8E0]", text: `${daysLeft} хоног үлдсэн` };
    }
    if (daysLeft <= 7) {
      return { bgClass: "bg-[#E0F4FF]", text: `${daysLeft} хоног үлдсэн` };
    }

    return { bgClass: "bg-[#E0F4FF]", text: `${daysLeft} хоног үлдсэн` };
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
              className={`px-2 py-[6px] rounded-md text-center ${
                getDeadlineInfo(p.Deadline).bgClass
              }
  `}
            >
              {getDeadlineInfo(p.Deadline).text}
            </span>

            <div className="col-span-1">
              {p.Status === "ProdDelivering" ? (
                <DeadlineModal
                  p={p}
                  handleUpdateContentStatus={handleUpdateContentStatus}
                />
              ) : (
                <></>
              )}
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
